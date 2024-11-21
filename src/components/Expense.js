import axios from "../utils/axios";
import React, { useEffect, useRef, useState } from "react";
import ExpenseCard from "./ExpenseCard";
import { useDispatch, useSelector } from "react-redux";
import LineChart from "./LineChart";

const Expense = () => {
  const dispatch = useDispatch();
  const initial = useSelector((state) => state.userReducer);
  const [expenses, setExpenses] = useState(initial.expenses);
  const [expgraph,setExpgraph]=useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const categoryRef = useRef("");
  const amountRef = useRef("");
  const dateRef = useRef("");
  const descriptionRef = useRef("");

  useEffect(() => {
    async function getExpenses() {
      let { data } = await axios.get("/expenses/all");
      console.log(data.expenses);
      setExpenses(data.expenses);
      setExpgraph(data.expgraph);
    }
    getExpenses();
  }, [initial.expenses]);

  const handleAdd = async () => {
    const category = categoryRef.current.value;
    const amount = amountRef.current.value;
    const date = dateRef.current.value;
    const description = descriptionRef.current.value;
    try {
      const { data } = await axios.post("/expenses/add", {
        category,
        amount,
        date,
        description,
      });
      console.log(data);
      setExpenses(data.expenses);
      dispatch({ type: "UPDATE_EXPENSES", payload: data.expenses });
      setShowAdd(!showAdd);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <h1 className="header">
        Expenses
        <button onClick={(ev) => setShowAdd(!showAdd)}>Add Expense</button>
      </h1>
      {showAdd && (
        <div className="add-div">
          <input ref={categoryRef} type="text" placeholder="Expense category" />
          <input ref={amountRef} type="number" placeholder="Expense amount" />
          <input ref={descriptionRef} type="text" placeholder="Expense description" />
          <input ref={dateRef} type="date" placeholder="Expense date" />
          <button onClick={handleAdd}>Add Expense</button>
        </div>
      )}
      {expgraph.length!=0 && <LineChart dataSet={expgraph} label={"Expenses"}/>}
      {expenses.map((expense, idx) => (
        <ExpenseCard key={idx} expense={expense} />
      ))}
    </>
  );
};

export default Expense;
