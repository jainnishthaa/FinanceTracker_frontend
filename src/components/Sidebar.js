import React from 'react'
import { NavLink } from 'react-router-dom'
import Styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={Styles['sidebar']}>
        <div>
        <NavLink to="/dashboard/all">Dashboard</NavLink>
        <NavLink to="/dashboard/budgets">Budgets</NavLink>
        <NavLink to="/dashboard/expenses">Expenses</NavLink>
        <NavLink to="/dashboard/saving-goals">Saving Goals</NavLink>
        <NavLink to="/dashboard/savings">Savings</NavLink>
        </div>
        <div>
            <NavLink to="/dashboard/profile">Profile</NavLink>
            <NavLink to="/logout">Logout</NavLink>
        </div>
    </div>
  )
}

export default Sidebar