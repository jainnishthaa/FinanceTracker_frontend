import axios from "../utils/axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BudgetCard from "./BudgetCard";

const Budget = () => {
  const dispatch = useDispatch();
  const initial = useSelector((state) => state.userReducer);
  const [budgets, setBudgets] = useState(initial.budgets);
  const [showAdd, setShowAdd] = useState(false);
  const categoryRef = useRef('');
  const totalAmountRef = useRef('');
  const amountSpentRef=useRef('');
  const dateRef = useRef('');
  const descriptionRef = useRef('');

  useEffect(() => {
    async function getBudgets() {
      let { data } = await axios.get("/budgets/all");
      console.log(data.budgets);
      setBudgets(data.budgets);
    }
    getBudgets();
  }, [initial.budgets]);

  const handleAdd=async()=>{
    const category = categoryRef.current.value;
    const totalAmount = totalAmountRef.current.value;
    const amountSpent = amountSpentRef.current.value;
    const date=dateRef.current.value;
    const description = descriptionRef.current.value;
    try{
      const {data}=await axios.post("/budgets/add",{category,totalAmount,date,description,amountSpent})
      console.log(data);
      setBudgets(data.budgets);
      dispatch({type:"UPDATE_BUDGETS",payload:data.budgets});
      dispatch({type:"SET_BUDGET",payload:data.budgets[0]});
      setShowAdd(!showAdd);
    }
    catch(error){
      alert(error.response.data.message);
    }
  }

  return (
    <>
      <h1 className="header">
        Budgets
      <button onClick={(ev)=>setShowAdd(!showAdd)}>Add Budget</button>
      </h1>
      {showAdd && (
        <div className="add-div">
          <input ref={categoryRef} type="text" placeholder="Budget Category" />
          <input ref={totalAmountRef} type="number" placeholder="Total Amount" />
          <input ref={amountSpentRef} type="number" placeholder="Amount Spent"/>
          <input ref={descriptionRef} type="text" placeholder="Budget Description"/>
          <input ref={dateRef} type="date" placeholder="Budget Date"/>
          <button onClick={handleAdd}>Add Budget</button>
        </div>
      )}
      {budgets.map((budget, idx) => (
        <BudgetCard key={idx} budget={budget} />
      ))}
    </>
  );
};

export default Budget;
