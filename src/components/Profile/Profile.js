import React from 'react'
import {useRef,useEffect} from 'react';
import './profile.css';
import Home from '../Home/Home'
import githubicon from '../Img/github.icon.png'
import urlicon from '../Img/url_icon.png';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
   const Navigate=useNavigate();

   const cancelBtn=()=>{
     Navigate('/home')
   }

  //const navigate=useNavigate();
  console.log("profile");
  const nameHandler=useRef();
  const urlHandler=useRef();

  useEffect(()=>{
     const fetchData=async()=>{
       try{
         const getData=await fetch(
           'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAVZp_jrP3dadhs6I5prUzEgx_9XQz3HYw',
           {
            method: 'POST',
            body: JSON.stringify({
              idToken: localStorage.getItem("tokenId"),
              idToken: localStorage.getItem("idToken"),
            }),
            headers: {
              'Content-Type':'application/json', 
            }
           }
         )
         if(!getData.ok){
           //alert("something wronge");
           throw new Error('Network response was not ok');
         }
         const data=await getData.json();
           nameHandler.current.value=data.users[0].Displayname;
           urlHandler.current.value=data.users[0].photourl;
           console.log("get api Data",data);
       }catch(error){
          console.log(error);
       }
     };
     fetchData();
  },[]);

  const updateHandler=async(e)=>{
      e.preventDefault();
      const enteredName=nameHandler.current.value;
      const enteredurl=urlHandler.current.value;
    try{
      const res=await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAVZp_jrP3dadhs6I5prUzEgx_9XQz3HYw',
          {
              method: 'POST',
              body: JSON.stringify({
                idToken: localStorage.getItem('tokenId'),
                 Displayname: enteredName,
                 photourl: enteredurl,
                 returnSecureToken: true,
              }),
              headers: {
                  'Content-Type': 'application/json'
              }
          }
      )
      const data=await res.json();
      console.log(data);
        }catch(err){
          console.log(err.message);
        }
      }     
  return (
    <div>
        <Home/><br/>
      <div className='maindiv'>
      <h5 className='cancelDiv'><button className='cancelBtn' onClick={cancelBtn}>cancel</button></h5>
      <h3><b>Contact Details</b></h3>
      {/* <li className='bi bi-github'></li> */}
      <img src={githubicon} alt=""/>
      <b> &nbsp;Full Name: &nbsp; &nbsp;</b><input type='text' className='input' required ref={nameHandler}/><br/><br/><br/>
      <img src={urlicon} alt=''/> &nbsp;
      <b>Profile Photo Url </b><input type='text' className='input' required ref={urlHandler}/><br/><br/>
      <button className='updateBtn' onClick={updateHandler}>Update</button>
    </div>
    </div>
  )
}

export default Profile
