import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import './welcome.css';
import { useSelector,useDispatch } from 'react-redux';
import { expenseAction } from '../../store/expenseSlice';
import DarkIcon from '../Img/DarkIcon.gif'
import DwnIcon from '../Img/Dwn.gif'
import Dwnicon from '../Img/Dwnicon.png'
import Darkicon from '../Img/Darkicon.png'

const Welcome = () => {
  const [showVerify, setShowVerify]=useState(false);
  const [showIcon, setShowIcon]=useState(true);
  const dispatch=useDispatch();
  const expenseData=useSelector((state)=>state.expense.expenses)
  const toggleColor=useSelector((state)=>state.expense.darkTheme)
  const totalAmount=useSelector((state)=>state.expense.totalAmount)
   const LogoutHandler=()=>{
      dispatch(expenseAction.setExpense([],0));
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
             alert('data')
             console.log("Verify Data",data);
             setShowVerify(true);
           } catch (err){
            console.log(err.response);
           }
       }
       const toggleTheme=()=>{
        setShowIcon(false);
          dispatch(expenseAction.toggleTheme())
       }
   const DwnHandler=()=>{
      alert("sure Download")
      setShowIcon(false);
      const csvData=convertToCSV(expenseData);
      downloadCSV(csvData);
   }
   const convertToCSV = (data) => {
    const csvRows = [];
    const headers = ["Title", "Category", "Amount"];
    csvRows.push(headers.join(","));

    for (const row of data) {
      const values = headers.map((header) => {
        const escaped = String(row[header.toLowerCase()]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
  };
    
   const downloadCSV=(csvData)=>{
      const blob=new Blob([csvData],{type: 'text/csv'});
      const url=window.URL.createObjectURL(blob);
      const a=document.createElement("a");
      a.setAttribute('hidden','');
      a.setAttribute('href',url);
      a.setAttribute('download','expenses.csv');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
   }
   
  return (
    <>
    <div>
    <div className={`container ${toggleColor ? 'dark': 'light'}`}>
    <h5 className='mt-2 left'><b>Welcome to Expense Tracker</b></h5>
    {totalAmount > 10000 && (
          <div>
            { showIcon ? <img className='DwnIcon' onClick={DwnHandler} src={DwnIcon}></img> : <img src={Dwnicon}></img>}
            { showIcon ? <button className='activeBtn' onClick={toggleTheme}><img className='DarkIcon' src={DarkIcon}></img></button> : <button className='activeBtn' onClick={toggleTheme}><img className='DarkIcon' src={Darkicon}></img></button>}
          </div>
        )}
    <div>
       <h5 className=' mt-2 right'>Your profile is incomplete.<Link className='button' to='/profile'><b>Complete Now</b></Link>
       </h5>  
    </div> &nbsp; &nbsp; &nbsp;
    <button  className='verifyBtn' onClick={verifyEmailHandler}>{showVerify? 'Verified': 'Verify Email'}</button>
    <button className='logoutBtn' onClick={LogoutHandler}><Link to='/'>Logout</Link></button>
  </div>
  </div>
  <hr/>
  </>
  )
}

export default Welcome
