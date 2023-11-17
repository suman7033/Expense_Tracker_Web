import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './loginSlice';
import expenseReducer from './expenseSlice';
const store=configureStore({
    reducer: {login: loginReducer, expense: expenseReducer}
})

export default store;