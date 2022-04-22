import { useState } from "react";
import "./Auth.css"
import { Link , useNavigate} from "react-router-dom";
import axios from 'axios';
// import validator from 'validator'

const SignUp = (props) => {
    const API = axios.create({ baseURL: 'http://localhost:8000' });
    
    API.interceptors.request.use((req) => {
      if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
      }
    
      return req;
    });
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [name, setUsername] = useState('')
    const [Mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [PasswordVisible, setPasswordVisible] = useState(false);
    const togglepassword = () => {
        setPasswordVisible(!PasswordVisible)
    }

    const registeruser = async (e) =>{
        e.preventDefault();
        if(!password || !email || !name || !Mobile){
            window.alert("please enter details")
        }
        else{
            API.post('/register', {email:email,password:password,mobile:Mobile,name:name})
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

    return(
        <div className="login">
            <div className="main__container">
                <div className="container__right">
                    <Link className="auth__link"  style={{ textDecoration: 'none' }} to="/login">Have an Account</Link>    
                </div>
                <div className="container__left">
                    <h2>SignUp</h2>
                    <form method='POST' className="form" autoComplete='false'>
                        <div className="input__block">
                            <span className="fa fa-user"></span>
                            <input type="email" autoComplete="false" onChange={(e)=>{setEmail(e.target.value)}} value={email} required placeholder="Email" />
                        </div>
                        <div className="input__block">
                            <span className="fa fa-user"></span>
                            <input type="text" onChange={(e)=>{setUsername(e.target.value)}} value={name} required placeholder="Name" />
                        </div>
                        <div className="input__block">
                            <span className="fa fa-user"></span>
                            <input type="text" onChange={(e)=>{setMobile(e.target.value)}} value={Mobile} required placeholder="Mobile Number" />
                        </div>
                        <div className="input__block password">
                            <span className="fa fa-lock"></span>
                            <input type={PasswordVisible ? "text" : "password"} onChange={(e)=>{setPassword(e.target.value)}} value={password} className="pass-key" required placeholder="Password" />
                            <p onClick={togglepassword} className="show">SHOW</p>
                        </div>

                        <div className="input__submit">
                            <input className="submit__btn btn" onClick={registeruser} type="submit" value="SIGNUP NOW" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default SignUp;