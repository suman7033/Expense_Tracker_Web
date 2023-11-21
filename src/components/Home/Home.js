import React from 'react'
import {Link} from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import ExpenseDetails from '../ExpenseDetails/ExpenseDetails';


const Home = () => {
   
  return (
    <div>
      <Welcome/>
      <ExpenseDetails/>
    </div>
  )
}

export default Home;
