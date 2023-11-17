import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState={
    expenses: [],
    totalAmount: 0,
}

const expenseSlice=createSlice({
   name: "expense",
   initialState: initialExpenseState,
   reducers:{
     setExpense(state,action){
        console.log("Action",action)
        state.expenses=action.payload.loadedExpenses;
        state.totalAmount=action.payload.total;
     },
     addExpense(state,action){
        console.log("addExpense",action.payload.amount);
        console.log("addExpense",action);
        //console.log("totalAmount",action.payload.gettotalAmount);
        state.expenses=state.expenses.push(action.payload.updateExpense);
        state.totalAmount+=Number(action.payload.amount);

     },
     deleteExpense(state,action){
        state.expenses=action.payload.updateExpense;
        state.totalAmount=action.payload.updatedTotalAmount;
     }
   } 
})
console.log("intialExpense",initialExpenseState);
export const expenseAction=expenseSlice.actions;

export default expenseSlice.reducer