import React from 'react'

const ExpenseContext = React.createContext({
    expense: [],
    totalAmount: 0,
    addExpense: (expense) =>{},
});

export default ExpenseContext
