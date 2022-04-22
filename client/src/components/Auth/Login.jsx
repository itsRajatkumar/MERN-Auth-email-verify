import React from "react";
import { useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = (props) => {
    const API = axios.create({ baseURL: 'http://localhost:8000' });
    
    API.interceptors.request.use((req) => {
      if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
      }
    
      return req;
    });
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [PasswordVisible, setPasswordVisible] = useState(false);
    const togglepassword = () => {
        setPasswordVisible(!PasswordVisible);
    };

    const loginuser = async (e) =>{
        e.preventDefault();
        if(!password || !email){
            window.alert("please enter details")
        }
        else{
            API.post('/login', {email:email,password:password})
            .then(resp => resp.data)
            .then(res =>{
                console.log(res)
                localStorage.setItem('user', JSON.stringify(res))
                setTimeout(() => {
                    navigate('/')
                    
                }, 2000);
            })
            .catch(e=>{
                console.log(e)
            })

        }
    }
    


    return  (
        <div className="login">
            <div className="main__container">
                <div className="container__right">
                    <Link className="auth__link"  style={{ textDecoration: 'none' }} to="/signup">Create an Account</Link>    
                </div>
                <div className="container__left">
                    <h2>Login</h2>
                    <form className="form">
                        <div className="input__block">
                            <span className="fa fa-user"></span>
                            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} value={email} required placeholder="Email" />
                        </div>
                        <div className="input__block password">
                            <span className="fa fa-lock"></span>
                            <input type={PasswordVisible ? "text" : "password"} onChange={(e)=>{setPassword(e.target.value)}} value={password} className="pass-key" required placeholder="Password" />
                            <p onClick={togglepassword} className="show">SHOW</p>
                        </div>
                        <div className="auth__link">
                        </div>
                        <div className="input__submit">
                            <input className="submit__btn btn" onClick={loginuser} type="submit" value="LOGIN" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
