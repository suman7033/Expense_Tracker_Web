import React, { useRef, useState, useEffect } from 'react';
import './expenseDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { expenseAction } from '../../store/expenseSlice';

const ExpenseDetails = () => {
  const expensesData=useSelector((state)=> state.expense.expenses)
  const email=useSelector((state)=> state.login.email);
  const dispatch=useDispatch();

  //const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount]=useState(0);
  const [editedExpense, setEditedExpense] = useState(null);
  const ChangeEmail=email.replace('@','').replace('.','')

  console.log("email",email);
  console.log("expensesData",expensesData)

  const titleInputRef = useRef('');
  const amountInputRef = useRef('');
  const categoryInputRef = useRef('');

  const EditTitleInputRef = useRef('');
  const EditCategoryInputRef = useRef('');
  const EditAmountInputRef = useRef('');

  // useEffect(() => {
  //   //alert("useEffect")
  //   // Fetch expenses from Firebase when the component mounts
  //   const fetchExpenses = async () => {
  //     try {
  //       const response = await fetch(`https://expense-tracker-a55b0-default-rtdb.firebaseio.com/userDetails/${ChangeEmail}.json`);
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch expenses.');
  //       }
  //       const data = await response.json();
  //       const loadedExpenses = [];
  //       //
  //       let total=0;
  //       for (const key in data) {
  //         const currentExpense={
  //           id: key,
  //           title: data[key].title,
  //           category: data[key].category,
  //           amount: data[key].amount,
  //         }
  //         loadedExpenses.push(currentExpense);
  //         total+=parseFloat(currentExpense.amount)
  //       }
  //       //setExpenses(loadedExpenses);
  //       dispatch(expenseAction.setExpense(loadedExpenses,total));
  //       //setTotalAmount(total);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchExpenses();
  // }, [ChangeEmail]);

  const addExpenseHandler = async (event) => {
    event.preventDefault();

    const expense = {
      title: titleInputRef.current.value,
      category: categoryInputRef.current.value,
      amount: amountInputRef.current.value,
    };

    try {
      const response = await fetch(`https://expense-tracker-a55b0-default-rtdb.firebaseio.com/userDetails/${ChangeEmail}.json`,{
        method: 'POST',
        body: JSON.stringify(expense),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to add expense.');
      }

      const data = await response.json();
      const updatedExpense = { ...expense, id: data.name, };
      //setExpenses((prevExpenses) => [...prevExpenses, updatedExpense]);
      dispatch(expenseAction.addExpense(updatedExpense))
      //setTotalAmount((prevTotal)=> prevTotal+parseFloat(updatedExpense.amount))
      alert('Expense added successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to add expense. Please try again.');
    }

    titleInputRef.current.value = '';
    categoryInputRef.current.value = '';
    amountInputRef.current.value = '';
  };

  const deleteExpenseHandler = async (expense) => {
    try {
      const response = await fetch(
        `https://expense-tracker-a55b0-default-rtdb.firebaseio.com/userDetails/${ChangeEmail}.json`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete expense.');
      }

      const updatedExpenses = expensesData.filter((prevExpense) => prevExpense.id !== expense.id);
      //setExpenses(updatedExpenses);
      dispatch(expenseAction.deleteExpense(updatedExpenses));
      setTotalAmount((prevTotal)=> prevTotal-parseFloat(expense.amount))
      alert('Expense deleted successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to delete expense. Please try again.');
    }
  };

  const editExpenseHandler = (index) => {
    //setEditedExpense(expenses[index]);
    dispatch(expenseAction.setExpense(expensesData[index]))
  };

  const cancelEditHandler = () => {
    setEditedExpense(null);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(
        `https://expense-tracker-a55b0-default-rtdb.firebaseio.com/userDetails/${ChangeEmail}.json`,
        {
          method: 'PUT',
          body: JSON.stringify({
            title: EditTitleInputRef.current.value,
            category: EditCategoryInputRef.current.value,
            amount: EditAmountInputRef.current.value,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to edit expense.');
      }

      const updatedExpense = {
        ...editedExpense,
        title: EditTitleInputRef.current.value,
        category: EditCategoryInputRef.current.value,
        amount: EditAmountInputRef.current.value,
      };

      const updatedExpenses = expensesData.map((prevExpense) =>
        prevExpense.id === updatedExpense.id ? updatedExpense : prevExpense
      )

      //setExpenses(updatedExpenses);
      dispatch(expenseAction.addExpense(updatedExpense));
      setTotalAmount((prevTotal)=>{
        const oldAmount=parseFloat(editedExpense.amount)
        const newAmount=parseFloat(updatedExpense.amount)
        return prevTotal-oldAmount+newAmount;
      })
      setEditedExpense(null);
      alert('Expense edited successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to edit expense. Please try again.');
    }
  };

  return (
    <div className='container'>
      <div className='auth'>
        <h2>Add Daily Expenses</h2>
        <hr />
        <div className='form-group'>
          <label htmlFor='title'>Expense Title</label>
          <br />
          <input type='text' id='title' className='input' placeholder='Expense Title' ref={titleInputRef} />
        </div>
        <div className='form-group'>
          <label htmlFor='category'>Category</label>
          <br />
          <input type='text' className='input' id='category' placeholder='Enter Category' ref={categoryInputRef} />
        </div>
        <div className='form-group'>
          <label htmlFor='price'>Price</label>
          <br />
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expensesData.map((expense, index) => (
              <tr key={index}>
                <td>{expense.title}</td>
                <td>{expense.category}</td>
                <td>{expense.amount}</td>
                <td>
                  <button className='EditBtn' onClick={() => editExpenseHandler(index)}>
                    Edit
                  </button>{' '}
                  &nbsp; &nbsp; &nbsp;&nbsp;
                  <button className='DeleteBtn' onClick={() => deleteExpenseHandler(expense)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* total */}
        <h2>Total {totalAmount}</h2>
        {/* Edit form */}
        {editedExpense && (
          <div>
            <h2>Edit Expense</h2>
            <form>
              <label htmlFor='title'>Title:</label>
              <input type='text' id='title' defaultValue={editedExpense.title} required ref={EditTitleInputRef} />

              <label htmlFor='category'>Category:</label>
              <input type='text' id='category' defaultValue={editedExpense.category} required ref={EditCategoryInputRef} />

              <label htmlFor='price'>Price:</label>
              <input type='text' id='price' defaultValue={editedExpense.amount} required ref={EditAmountInputRef} />
              &nbsp;
              <button type='button' onClick={handleEditSubmit}>
                Save
              </button>{' '}
              &nbsp;
              <button type='button' onClick={cancelEditHandler}>
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseDetails;
