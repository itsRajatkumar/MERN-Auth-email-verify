import React from 'react'
import './home.css'
import { useState } from 'react'
import {Link} from 'react-router-dom'
const Home = () => {
    const user = JSON.parse(localStorage.getItem('user'));
  return (<>
    {user ? (user.varified ?(<div className='Homefile'>
    <div className="card">
    <div className="card-header">
      User 
    </div>
    <ul className="list-group ">
      <li className="list-group-item">Name</li>
      <li className="list-group-item">Email</li>
      <li className="list-group-item">Mobile</li>
      <li className="list-group-item">Varified</li>
    </ul>
  </div>
    <div className="card">
    <div className="card-header">
       Details
    </div>
    <ul className="list-group ">
      <li className="list-group-item">{user.name}</li>
      <li className="list-group-item">{user.email}</li>
      <li className="list-group-item">{user.mobile}</li>
      <li className="list-group-item">{user.varified?"True":"False"}</li>
    </ul>
  </div>
    
    </div>):(
             <div className="error__block">
             <div className="error__block--title">
                 <h1>Not Varified</h1>
             </div>
             <div className="error__block--disc">
                 <h2>Please Varify Your Account</h2>
             </div>
         </div>
    )):(
      <div className="error__block">
      <div className="error__block--title">
          <h1>Not Login</h1>
      </div>
      <div className="error__block--disc">
          <h2>Please Login</h2>
      </div>
      
      <Link className='btn-large' to="/login" >Go to login Page</Link>
  </div>
     )}
    </>)
}

export default Home