import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AllInfo from "./components/AllInfo";
import Budget from "./components/Budget";
import Expense from "./components/Expense";
import SavingGoal from "./components/SavingGoal";
import Savings from "./components/Savings";
import Profile from "./components/Profile";
import Logout from "./pages/Logout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  // const dispatch=useDispatch();
  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   if (user) {
  //     dispatch({ type: "SET_USER", payload: user });
  //   }
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="all" element={<AllInfo />}></Route>
        <Route path="budgets" element={<Budget />}></Route>
        <Route path="expenses" element={<Expense />}></Route>
        <Route path="saving-goals" element={<SavingGoal />}></Route>
        <Route path="savings" element={<Savings />}></Route>
        <Route path="profile" element={<Profile />}></Route>
      </Route>
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}

export default App;
