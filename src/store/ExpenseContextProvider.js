import React, { useCallback, useEffect, useState } from 'react'
import ExpenseContext from './ExpenseContext'

const ExpenseContextProvider = (props) => {
   const [expenses, setExpenses]=useState([]);
   const [totalAmount, settotalAmount]=useState(0);

   const fetchExpensesHandler=useCallback(async()=>{
     try{
        const getExpense=await fetch (
            "https://expense-tracker-33e64-default-rtdb.firebaseio.com/expenses.json"
        );
        const data = await getExpense.json();
        let getTotalAmount=0;
        const loadedExpenses=[];
        for(const key in data){
            getTotalAmount=getTotalAmount+Number(data[key].amount);
            loadedExpenses.push({
                id: key,
                title: data[key].title,
                amount: data[key].amount,
                category: data[key].category,
            });
        }
        setExpenses(loadedExpenses);
        settotalAmount(getTotalAmount);
     } catch (error){
        console.log(error);
     }
   },[]);

   useEffect(()=>{
     fetchExpensesHandler();
   },[])

   const addExpensesHandler=(expense,name)=>{
      const updatEexpense={...expense, id: name};
      console.log(expense);
      setExpenses((prevExpense) =>[...prevExpense,updatEexpense]);
      settotalAmount(totalAmount+Number(updatEexpense.amount))
   };
   console.log(expenses);

    const contextValue={
        expenses: expenses,
        totalAmount: totalAmount,
        addExpenses: addExpensesHandler,
    }
  return (
       <ExpenseContext.provider value={contextValue}>
          {props.children}
       </ExpenseContext.provider>
    
  )
}

export default ExpenseContextProvider
