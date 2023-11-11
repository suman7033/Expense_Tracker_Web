import React, { useState } from 'react'
import './expenseDetails.css'

const ExpenseDetails = () => {
    const [title, setTitle]=useState("");
    const [category, setCategory]=useState("");
    const [price, setPrice]=useState("");
    
    const AddExpenseHandler=()=>{

    }

  return (
    <>
    <div className='auth'>
      <h2>Add Daily Expenses</h2><hr/>
      <h4>Expense Title</h4>
      <input type='text' className='input' placeholder='Expense Title' onChange={(event)=>setTitle(event.target.value)}/>
      <h3>Category</h3>
      <input type='text' className='input' placeholder='Enter Category' onChange={(event)=>setCategory(event.target.value)}/>
      <h3>Price</h3>
      <input type='text' className='input' placeholder='Enter Price' onChange={(event)=>setPrice(event.target.value)}/><br/><br/>
      <button onClick={AddExpenseHandler} className='resetBtn'>Add Expense</button>
    </div>
    <div className='table'>
        <hr/>
        <h2>Title</h2>
        <h2>Category</h2> 
    </div>
    </>
  )
}

export default ExpenseDetails
