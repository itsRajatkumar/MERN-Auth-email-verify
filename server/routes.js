var cookieParser = require('cookie-parser');
const express = require('express');
const app = express()
const {registerUser, loginUser} = require('./routers/SignupLogin') 
const Authenticate = require('./middleware/authenticate') 
const {varifyEmail} = require("./routers/confirmEmail")


app.use(cookieParser());

// User Authentication request handling

app.post('/register',(req, res)=>{
  registerUser(req,res)
  
})

app.post('/login', (req, res)=>{
  loginUser(req, res)
  
})
app.post('/varifyaccount', (req, res)=>{
  varifyEmail(req, res)
  
})




module.exports = app;
