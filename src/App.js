import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Login from './components/Login/Login'
import Home from './components/Home/Home';
import Profile from "./components/Profile/Profile";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
//import ExpenseContextProvider from './store/ExpenseContextProvider';

const App = () => {
  return (
    <>
      <BrowserRouter>
      {/* <ExpenseContextProvider> */}
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword/>}></Route>
      </Routes>
      {/* </ExpenseContextProvider> */}
      </BrowserRouter> 
    </>
  )
}

export default App

