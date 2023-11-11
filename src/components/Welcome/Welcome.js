import {Link} from 'react-router-dom';
import React, { useState } from 'react';
import './welcome.css';

const Welcome = () => {
  const [showVerify, setShowVerify]=useState(false);
   const LogoutHandler=()=>{
      localStorage.removeItem('idToken');
      localStorage.removeItem('tokenId');
      localStorage.removeItem('email')
      localStorage.removeItem('price');
   }
       const verifyEmailHandler=async()=>{
           try{
             const res=await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAVZp_jrP3dadhs6I5prUzEgx_9XQz3HYw',
                {
                  method: 'POST',
                  body: JSON.stringify({
                    idToken: localStorage.getItem("idToken"),
                     requestType:'VERIFY_EMAIL',
                  }),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
             )
             const data=await res.json();
             //console.log(localStorage.getItem())
             console.log("Verify Data",data);
             setShowVerify(true);
           } catch (err){
            console.log(err.response);
           }
       }
   
  return (
    <>
    <div className='container'>
    <h5 className='mt-2 left'><b>Welcome to Expense Tracker</b></h5>
    <div>
       <h5 className=' mt-2 right'>Your profile is incomplete.<Link className='button' to='/profile'><b>Complete Now</b></Link>
       </h5>  
    </div> &nbsp; &nbsp; &nbsp;
    <button  className='verifyBtn' onClick={verifyEmailHandler}>{showVerify? 'Verified': 'Verify Email'}</button>
    <button className='logoutBtn' onClick={LogoutHandler}><Link to='/'>Logout</Link></button>
  </div>
  <hr/>
  </>
  )
}

export default Welcome
