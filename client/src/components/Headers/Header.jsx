import React from 'react';
import { useState } from "react";
import logo from '../../images/logo_header.png';
import './Header.css'
import { Link ,useNavigate } from "react-router-dom";

const Header = (props) => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'));
    let linkstyle = {
        textDecoration: 'none',
    }
    const logoutfunc = ()=>{
        localStorage.removeItem("user")
        navigate("/login")

    }
    const [isActive, setActive] = useState(false);
    const handleToggle = () => {
        setActive(!isActive);
    };



    return <div className="navbar">
        <div className='navbar_inner'>
            <div className={`navbar_right ${ isActive ? "open" : ""}`}>
                    <ul className='navbar_ul'>
                    <li><Link onClick={handleToggle} className='nav__links' to="/" style={linkstyle}>Home</Link></li>
                    <li>{user ? (
                    <button onClick={logoutfunc} className='nav__links login_button' >Logout</button>
                    ):
                    (<Link onClick={handleToggle} className='nav__links login_button' to="/login" style={linkstyle} >Login</Link>
                    )}</li>
                    </ul>
                </div>
        </div>
    </div>
};

export default Header;
