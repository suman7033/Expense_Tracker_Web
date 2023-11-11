import React, { useState } from 'react'
import keyIcon from '../Img/key_icon.png'
import {Link, Navigate, useNavigate} from 'react-router-dom';
import './forgotPassword.css';

const ForgotPassword = () => {
    const Navigate=useNavigate();
    const [modalEmail, setModalEmail]=useState(null);
    //const [open, setOpen]=useState(false);
    const [email, setEmail]=useState("");
    const [loader, setLoader]=useState(false);

    const ResetPasswordHandler=async()=>{
        try{
            const resetPassword=await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAVZp_jrP3dadhs6I5prUzEgx_9XQz3HYw',
                {
                   method: 'POST',
                   body: JSON.stringify({
                    requestType: 'PASSWORD_RESET',
                    email: email,
                   }),
                   headers: {
                     "Content-Type": 'application/json',
                   },
                }
            );
            if(resetPassword.ok){
                alert("check your Mail Box");
                Navigate('/')
                const data=await resetPassword.json();
                console.log("forgotPasswrod",data)
                setLoader(true);
                setTimeout(()=>{
                    setLoader(false);
                    setModalEmail(data.email);
                },2000);
            }else{
                alert("Invalid_Email")
                setEmail("");
            }
        } catch (err){
            console.log(err.message);
        }
    }
  return (
    <div>
      <div className='auth'>
        <img src={keyIcon} alt='key'/>
        <h2>Forgot password ?</h2>
        <p>No worries, we'll send you reset instructions.</p>
        <input className='input' type='text' placeholder='Email address'onChange={(event)=>setEmail(event.target.value)}/><br/><br/><br/>
        <button className='resetBtn' onClick={ResetPasswordHandler}>Reset password</button><br/><br/><br/>
        <Link to='/'>Back to Login</Link>
      </div>
    </div>
  )
}

export default ForgotPassword
