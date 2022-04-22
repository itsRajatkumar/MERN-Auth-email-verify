const jwt = require('jsonwebtoken')
const userModel = require("../schemas/Schema");

const Authenticate = async (req,res,next) =>{

    try{
        const token = req.cookie.jwt;
        const varifytoken = jwt.verify(token,process.env.JWT_KEY);
        console.log(varifytoken)
        const rootUser = await userModel.findOne({email:varifytoken.email})
        if(!rootUser){
            throw new Error("User not found")
        }else{
            console.log(rootUser)
            req.token = token;
            req.rootUser = rootUser;
            req.Email = rootUser.email
            console.log("here");
            next();
            console.log("h");

        }
        
    }catch(err){
        console.log(err);
        res.status(401).send("Unauthorized: No token")
    }
}

module.exports = Authenticate