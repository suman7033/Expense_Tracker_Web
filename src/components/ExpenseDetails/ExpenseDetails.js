import React, { useRef, useEffect} from 'react';
import './expenseDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { expenseAction } from '../../store/expenseSlice';

const ExpenseDetails = () => {
  const expensesData=useSelector((state)=> state.expense.expenses)
  const totalAmount=useSelector((state)=> state.expense.totalAmount)
  //const email=useSelector((state)=> state.login.email);
  const email=localStorage.getItem("email");
  console.log("mainEmail",email);
  const editedExpense=useSelector((state)=>state.expense.editedExpense)
  const loading=useSelector((state)=>state.expense.loading)
  const toggleColor=useSelector((state)=>state.expense.darkTheme)

  const dispatch=useDispatch()
  console.log("totalAmount111",totalAmount);

  //const ChangeEmail=email.replace('@').replace('.')
  const ChangeEmail=email.replace(/[@.]/g,'')

  const titleInputRef = useRef('');
  const amountInputRef = useRef('');
  const categoryInputRef = useRef('');

  const EditTitleInputRef = useRef('');
  const EditCategoryInputRef = useRef('');
  const EditAmountInputRef = useRef('');

     const fetchExpenses = async () => {
      //console.log("useEffect expe",expensesData);
      dispatch(expenseAction.setLoading(true));
      try {
        console.log("ddd",ChangeEmail);
        const response = await fetch(`https://expense-tracker-a55b0-default-rtdb.firebaseio.com/userDetails/${ChangeEmail}.json`)
        console.log("e",ChangeEmail);

        if (!response.ok) {
          throw new Error('Failed to fetch expenses.');
        }
        const data = await response.json();
        const loadedExpenses = [];
        console.log("data",data);
        let total=0;
        for (const key in data) {
          const currentExpense={
            id: key,
            title: data[key].title,
            category: data[key].category,
            amount: data[key].amount,
          }
           
          loadedExpenses.push(currentExpense);
          console.log("total",currentExpense.amount);
        }
        console.log("setExpense",loadedExpenses);
        console.log("totalAmount",total);
        console.log("useEffect expe",expensesData);
        
        dispatch(expenseAction.setExpense(loadedExpenses,total))
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(()=>{
      console.log("email in useEffect",ChangeEmail);
       fetchExpenses();
    },[ChangeEmail])

  const addExpenseHandler = async (event) => {
    event.preventDefault();

    const expense = {
      title: titleInputRef.current.value,
      category: categoryInputRef.current.value,
      amount: amountInputRef.current.value,
    };

    try {
      console.log("addEmail",ChangeEmail);
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
      const updatedExpense = { ...expense, id: data.name}
       console.log("AddExpense",updatedExpense);
      dispatch(expenseAction.addExpense(updatedExpense))
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
        `https://expense-tracker-a55b0-default-rtdb.firebaseio.com/userDetails/${ChangeEmail}/${expense.id}.json`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete expense.');
      }
      dispatch(expenseAction.deleteExpense(expense));
      console.log("delete",expense);
      alert('Expense deleted successfully!')
    } catch (error) {
      console.error(error)
      alert('Failed to delete expense. Please try again.')
    }
  };

  const editExpenseHandler = (index) => {
      dispatch(expenseAction.editExpense(index));
    console.log("edit",index);
  };

  const cancelEditHandler = () => {
    dispatch(expenseAction.editExpense());
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(
        `https://expense-tracker-a55b0-default-rtdb.firebaseio.com/userDetails/${ChangeEmail}/${editedExpense.id}.json`,
        {
          method: 'PATCH',
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

      const updatedExpenseData = {
        ...editedExpense,
        title: EditTitleInputRef.current.value,
        category: EditCategoryInputRef.current.value,
        amount: EditAmountInputRef.current.value,
      };
      const updatedExpenses=expensesData.map((item)=>
        item.id===editedExpense.id ? {...updatedExpenseData}:item
      );
      dispatch(expenseAction.updateExpense(updatedExpenses));

      alert('Expense edited successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to edit expense. Please try again.');
    }
  };
  if(loading){
    return <div className='errorImg'><p>Loading...</p>
     <img className='img'src='https://media.tenor.com/JeNT_qdjEYcAAAAj/loading.gif'></img>
    </div>
  }

  return (
    <>
    <div className={`container ${toggleColor ? 'dark': 'light'}`}>
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
                  <button className='EditBtn' onClick={() => editExpenseHandler(expense)}>
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
        {editedExpense && (
          <div>
            <h2>Edit Expense</h2>
            <form>
              <label htmlFor='title'>Title:</label>
              <input type='text' className='Edittitle' defaultValue={editedExpense.title} required ref={EditTitleInputRef} /><br/>

              <label htmlFor='category'>Category:</label>
              <input type='text' className='Editcategory' defaultValue={editedExpense.category} required ref={EditCategoryInputRef} /><br/>

              <label htmlFor='price'>Price:</label>
              <input type='text' className='Editprice' defaultValue={editedExpense.amount} required ref={EditAmountInputRef} /><br/><br/>
              &nbsp;
              <button type='button' className='saveBtn' onClick={handleEditSubmit}>
                Save
              </button>{' '}
              &nbsp;
              <button type='button' className='saveBtn'onClick={cancelEditHandler}>
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default ExpenseDetails;
