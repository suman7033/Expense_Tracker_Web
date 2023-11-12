import React, { useRef, useState } from 'react';
import './expenseDetails.css';

const ExpenseDetails = () => {
  const [expenses, setExpenses]=useState([]);
  const [addExpenses, setAddExpense]=useState(false);
  const [editedExpense, setEditedExpense]=useState(null);

  const titleInputRef=useRef("");
  const amountInputRef=useRef("");
  const categoryInputRef=useRef("");
    
    const addExpenseHandler=async(event)=>{
       event.preventDefault();
       const expense={
         title: titleInputRef.current.value,
         category: categoryInputRef.current.value,
         amount: amountInputRef.current.value,
       }
       try{
         const postExpense = await fetch (
           "https://expense-tracker-a55b0-default-rtdb.firebaseio.com/userDetails.json",
           {
             method: 'POST',
             body: JSON.stringify(expense),
             headers: {
               'Content-Type': 'application/json',
             },
           }
         );
         if(postExpense.ok){
           const data=await postExpense.json();
           const updatedExpense={...expense}
           setExpenses((prevExpense)=> [...prevExpense,updatedExpense])
            //setExpenses(data)
            alert("database",data)
         }
       } catch (error){
         console.log(error);
       }
       titleInputRef.current.value="";
       categoryInputRef.current.value="";
       amountInputRef.current.value="";

    }
    

    const deleteExpenseHandler = (index) => {
         

      };

      const editExpenseHandler = (index) => {
         

      };
      const cancelHandler=(index)=>{
         

      }
    
      const handleEditSubmit = (updatedExpense) => {
         



      };
       //alert(expenses);
      

  return (
    <div className='container'>
      <div className='auth'>
        <h2>Add Daily Expenses</h2>
        <hr />
        <div className='form-group'>
          <label htmlFor='title'>Expense Title</label><br/>
          <input type='text' id='title' className='input' placeholder='Expense Title' ref={titleInputRef}/>
        </div>
        <div className='form-group'>
          <label htmlFor='category'>Category</label><br/>
          <input type='text' className='input'id='category' placeholder='Enter Category' ref={categoryInputRef} />
        </div>
        <div className='form-group'>
          <label htmlFor='price'>Price</label><br/>
          <input type='text' id='price' className='input' placeholder='Enter Price' ref={amountInputRef} />
        </div>
        <button onClick={addExpenseHandler} className='resetBtn'>
          Add Expense
        </button>
      </div>
      <div className='table'>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.title}</td>
                <td>{expense.category}</td>
                <td>{expense.amount}</td>
                <td>
                    <button onClick={()=>editExpenseHandler(index)}>Edit</button>
                    <button onClick={()=>deleteExpenseHandler(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
           
        </table>
        {/* Edit form */}
      {editedExpense && (
        <div>
          <h2>Edit Expense</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditSubmit({
                ...editedExpense,
                title: e.target.title.value,
                category: e.target.category.value,
                price: e.target.price.value,
              });
            }}
          >
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" defaultValue={editedExpense.title} required />

            <label htmlFor="category">Category:</label>
            <input type="text" id="category" defaultValue={editedExpense.category} required />

            <label htmlFor="price">Price:</label>
            <input type="text" id="price" defaultValue={editedExpense.price} required />
            &nbsp;
            <button type="submit">Save</button> &nbsp;
            <button onClick={cancelHandler}>cancel</button>
          </form>
        </div>
      )}
    </div>
      </div>
  );
};

export default ExpenseDetails;
