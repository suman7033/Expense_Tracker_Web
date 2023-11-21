import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState={
    expenses: [],
    totalAmount: 0,
    editedExpense: false,
    darkTheme: true,
    loading: false,
}

const expenseSlice=createSlice({
   name: "expense",
   initialState: initialExpenseState,
   reducers:{ 
     setExpense(state,action){
        console.log("Action",action.payload)
        //console.log("setAction",action.payload.amount);
        console.log(action.payload.total)
        const getTotal=action.payload.reduce((total,expense)=> total+parseFloat(expense.amount),0)
        console.log("expense",action.total)
        console.log("getTotal",getTotal);
        state.expenses=action.payload
        state.totalAmount=getTotal;
        state.loading=false;
     },
     addExpense(state,action){
        state.expenses.push(action.payload);
        console.log("Action",action.payload)
        console.log("actionAmount",action.payload.amount);
         state.totalAmount+=Number(action.payload.amount);
     },
     deleteExpense(state,action){
       const id=action.payload.id;
       console.log("deleteExpenseData",action.payload)
       const reqindex=state.expenses.findIndex((item)=>item.id===id);
       state.totalAmount=state.totalAmount-action.payload.amount;
       state.expenses.splice(reqindex,1);
     },
     editExpense(state,action){
        state.editedExpense=action.payload;
     },
     updateExpense(state,action){
       state.expenses=action.payload;
       state.totalAmount=action.payload.reduce((total,expense)=>total+Number(expense.amount),0)
       state.editedExpense=null;
     },
     toggleTheme(state){
       //state.darkTheme=!state.darkTheme;
       state.darkTheme=!state.darkTheme;
     },
     setLoading(state,action){
       state.loading=action.payload;
     }
   } 
})
export const expenseAction=expenseSlice.actions;

export default expenseSlice.reducer