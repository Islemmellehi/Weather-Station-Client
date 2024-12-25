import React from 'react';
import './UserLogin.css';
import { Boarder } from '../Boarders/Boarder';
import LoginForm from './LoginForm/LoginForm';


const UserLogin = () => {
    
    return (
        <div className='userlogin'>
            <div className='login-bg'>
                <Boarder/>
           </div>
           <div className="loginform">
                <LoginForm/>
            </div>
        </div>
                
    );
};

export default UserLogin;
