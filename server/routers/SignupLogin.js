const userModel = require("../schemas/Schema");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var cookieParser = require('cookie-parser');
const {sendvarifyEmail} = require("./confirmEmail")


// New user registration
async function registerUser(req, res) {
    try {
        const { password, email, name, mobile } = req.body;
        // console.log(req.body)
        // validating input details for signup
        if (!email || typeof email !== "string") {
            return res.status(404).json({ status: "error", error: "Invalid Email" });
        }
        if (!name || typeof name !== "string") {
            return res.json({ status: "error", error: "Invalid Namename" });
        }
        if (!mobile || typeof mobile !== "string") {
            return res.json({ status: "error", error: "Invalid mobile" });
        }
        if (!password || typeof password !== "string") {
            return res.json({ status: "error", error: "Invalid Password" });
        }
        if (password.length < 6) {
            return res.json({ status: "error", error: "Password to small" });
        }

        // creating record in databse with recived input
        const user = new userModel({
            password,
            email, 
            name,
            mobile,
        });


        // generating incrypted password
        var salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND))
        // , async function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                // updating hashed password to the database
                console.log(hash + "hash")
                user.password = hash;
                const newUser = await user.save().then((data) => {
                    // console.log("here")
                        console.log(data);
                        // geerating jwt token for client
                        var jwtoken = jwt.sign({ email }, process.env.JWT_KEY) 
                        console.log(jwtoken);
                        // res.cookie("jwt",jwtoken,{
                        //     expires: new Date(Date.now() + 2592000000),
                        //     httpOnly:true
                        // })
                        res.status(200).send("ok");
                        console.log(jwtoken);
                    })
                    sendvarifyEmail(email)
                    // generatekey(email,invite_code,event_code)
                    .catch((e) => {
                        // console.log("User Already Registered" + e);
                        res.status(400).send('User Already Registered');
                    }); // res.send(newUser);
                });
                // });
                
            } catch (error) {
                console.log(error);
                res.status(400).send('User Already Registered');
        // if(erro.code === 11000){
        //     return res.json({status:'error',error:'Email Allready Exists'})
        // }
        // throw error
    }
}

// function for logging in user
async function loginUser(req, res){
    // login
    try {
        const { email, password } = req.body;
        // validating input details
        if (!email || typeof email !== "string") {
            return res.json({ status: "error", error: "Invalid Credentials" });
        }
        if (!password || typeof password !== "string") {
            return res.json({ status: "error", error: "Invalid Credentials" });
        }
        if (password.length < 6) {
            return res.json({ status: "error", error: "Invalid Credentials" });
        }

        console.log( email, password );
        // finding user details in database
        userModel.findOne(
            {email:email},
            (err, posts) => {
                console.log(posts)
                console.log(posts);
                // comparing user password with hashed password
                bcrypt.compare(password, posts.password, (err, ress) => {
                    console.log(ress);

                    // if password matched then we generate JWT token
                    if (ress) {
                        console.log(posts.varified)
                        var jwtoken = jwt.sign({ email }, process.env.JWT_KEY) 
                        console.log(jwtoken);
                        res.status(200).send({
                            jwtoken:jwtoken,
                            email:email,
                            name:posts.name,
                            mobile:posts.mobile,
                            varified:posts.varified
                        });
                    } else {
                        res.send("Email Or Password Incorrect");
                    }
                });
            }
        );
    } catch (err) {
        console.log(err);
    }
}



module.exports = { registerUser, loginUser };
