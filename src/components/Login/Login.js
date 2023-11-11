import React, { useRef, useState } from 'react'
import './login.css';
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {
    const [isLogin,setIsLogin]=useState(true);
    const Navigate=useNavigate();

    const emailInputRef=useRef();
    const passwordInputRef=useRef();
    const switchHandler=()=>{
        setIsLogin((prevState)=> !prevState)
    }    
    const ForgotHandler=()=>{
        alert("sure' you want to change?");
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        const enteredEmail=emailInputRef.current.value;
        const enteredPassword=passwordInputRef.current.value;
        let url;
     if(isLogin){
       url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAVZp_jrP3dadhs6I5prUzEgx_9XQz3HYw'
     }else{
      url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAVZp_jrP3dadhs6I5prUzEgx_9XQz3HYw'
     }
     fetch(url,{
       method: 'POST',
       body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
       }),
       headers: {
         'Content-Type': 'application/json'
       }
     })
     .then((res)=>{
      if(res.ok){
        console.log("sucessful");
        return res.json();
      }else{
        return res.json()
        .then((data)=>{
          let errorMessage='Authentication Failed'
          throw new Error(errorMessage);
        })
      }
     })
     .then((data)=>{
       
      alert("sucessfully Login");
      console.log("idToken",data.idToken);
      Navigate('/home');
      localStorage.setItem("tokenId",data.idToken);
      localStorage.setItem("idToken",data.idToken);
      localStorage.setItem("email", data.email);
      emailInputRef.current.value = '';
      passwordInputRef.current.value = '';
     })
     .catch(err =>{
       alert(err.message);
     })
  }

  return (
    <section className='auth'>
    <h1>{ isLogin ? 'Login' : 'Sign Up'}</h1>
    <form onSubmit={submitHandler}>
      <div className='control'>
        <label htmlFor='email'><b>Your Email</b></label>
        <input type='email' id='email' required ref={emailInputRef}></input>
      </div>
      <div className='control'>
         <label htmlFor='password'><b>Your Password</b></label>
         <input type='password' id='password' required ref={passwordInputRef}></input>
      </div><br/>
      <b className='forgot'><Link to='/forgotPassword'>Forgot Password?</Link></b>
      <div className='actions'>
        <button>{isLogin ? 'login' : 'create new login'}</button>
        {/* <button type='button' className='toggle' onClick={switchHandler}>{isLogin ? 'create new login' : 'login'}</button> */}
      </div>
      {isLogin && (
          <p>
            don't have an account ?{" "}
            <button className="" onClick={switchHandler}>
              Sign Up
            </button>
          </p>
        )}
        {!isLogin && (
          <p>
            have an account ?
            <button className="" onClick={switchHandler}>
              Sign In
            </button>
          </p>
        )}
    </form>
  </section>
  )
}

export default Login
