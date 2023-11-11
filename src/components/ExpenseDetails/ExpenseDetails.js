// ExpenseDetails.jsx
import React, { useState } from 'react';
import './expenseDetails.css';

const ExpenseDetails = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [expenses, setExpenses] = useState([]);

  const addExpenseHandler = () => {
    // Check if all fields are filled
    if (title.trim() === '' || category.trim() === '' || price.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }

    // Create a new expense object
    const newExpense = {
      title,
      category,
      price,
    };

    // Update the expenses list
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

    // Clear the input fields
    setTitle('');
    setCategory('');
    setPrice('');
  };

    const deleteExpenseHandler = (index) => {
        const updatedExpenses = [...expenses];
        updatedExpenses.splice(index, 1);
        setExpenses(updatedExpenses);
      };
      const [editedExpense, setEditedExpense] = useState(null);

      const editExpenseHandler = (index) => {
        // Set the selected expense for editing
        setEditedExpense(expenses[index]);
      };
      const cancelHandler=(index)=>{
        setEditedExpense(expenses[index]);
      }
    
      const handleEditSubmit = (updatedExpense) => {
        // Update the expenses array with the edited expense
        const updatedExpenses = expenses.map((expense) =>
          expense.id === updatedExpense.id ? updatedExpense : expense
        );
        setExpenses(updatedExpenses);
    
        // Clear the edited expense state to exit the edit mode
        setEditedExpense(null);
      };
    
       
      

  return (
    <div className='container'>
      <div className='auth'>
        <h2>Add Daily Expenses</h2>
        <hr />
        <div className='form-group'>
          <label htmlFor='title'>Expense Title</label><br/>
          <input type='text' id='title' className='input' value={title} placeholder='Expense Title' onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div className='form-group'>
          <label htmlFor='category'>Category</label><br/>
          <input type='text' className='input'id='category' value={category} placeholder='Enter Category' onChange={(event) => setCategory(event.target.value)} />
        </div>
        <div className='form-group'>
          <label htmlFor='price'>Price</label><br/>
          <input type='text' id='price' className='input' value={price} placeholder='Enter Price' onChange={(event) => setPrice(event.target.value)} />
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
                <td>{expense.price}</td>
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

            <button type="submit">Save</button>
            <button onClick={cancelHandler}>cancel</button>
          </form>
        </div>
      )}
    </div>
      </div>
  );
};

export default ExpenseDetails;
