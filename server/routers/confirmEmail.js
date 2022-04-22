const userModel= require("../schemas/Schema");
const varifytokenModel = require("../schemas/varifytoken");
const sendEmail = require("../Utils/sendMail");
const crypto = require("crypto");
const VarifyHtml = require("../Emailtemplate/varifytemplate")


const sendvarifyEmail = async (email)=>{
    try{
        const user = await userModel.findOne({ email:email });
        const newData = await new varifytokenModel({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const link = `${process.env.BASE_URL}/varify-email/${user._id}/${newData.token}`;
        const data = VarifyHtml(link)
        await sendEmail(user.email, "Email confirmation link", data);

    }catch(err){
        console.log(err)
    }

}


const varifyEmail = async (req,res)=>{
    try {
        const user = await userModel.findById(req.body.userId);
        if (!user) return res.status(400).send("invalid link or expired");
        console.log("here1");
        
        const token = await varifytokenModel.findOne({
            userId: user._id,
            token: req.body.token,
        });
        console.log("here2");
        if (!token) return res.status(400).send("Invalid link or expired");
        
        console.log("here3");
        user.varified = true;
        await user.save();
        await token.delete();

        console.log("varified sucessfully.");
        res.status(200).send("varified sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
}

module.exports = {sendvarifyEmail,varifyEmail}
