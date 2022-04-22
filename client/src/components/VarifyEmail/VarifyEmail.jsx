import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import './VarifyEmail.css'
import axios from 'axios';

const VarifyEmail = () => {
    const API = axios.create({ baseURL: 'http://localhost:8000' });
    
    API.interceptors.request.use((req) => {
      if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
      }
    
      return req;
    });
    const { userid, token } = useParams()
    const [Varified, setVarified] = useState(false)

    useEffect(() => {
        API.post('/varifyaccount', {userId:userid,token:token})
            .then(res =>{
                (res.status(200))
                setVarified(true)
            })
            .catch(e=>{
                console.log(e)
            })
    },[])
    
    
  return (
    <>
    {Varified? 
        <div className="error__block">
            <div className="error__block--title">
                <h1>Varified</h1>
            </div>
            <div className="error__block--disc">
                <h2>Your Account Is Varified Please Login</h2>
            </div>
            <div className="error__block--button">
            <Link className='btn-large' to="/login" >Go to login Page</Link>
            </div>
        </div>
        : 
        <div className="error__block">
            <div className="error__block--title">
                <h1>Please Wait</h1>
            </div>
            <div className="error__block--disc">
                <h2>We Are Varifying</h2>
            </div>
        </div>
    }
    </>
  )
}

export default VarifyEmail