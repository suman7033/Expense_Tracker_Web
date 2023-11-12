import React from 'react'
import {Link} from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import ExpenseDetails from '../ExpenseDetails/ExpenseDetails';
import Profile from '../Profile/Profile';

const Home = () => {
  return (
    <div>
      <Welcome/>
      <ExpenseDetails/>
    </div>
  )
}

export default Home
