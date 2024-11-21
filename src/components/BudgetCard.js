import React, { useState } from "react";
import Styles from "./Card.module.css";
import axios from "../utils/axios";
import { useDispatch } from "react-redux";
import BudgetExpInfo from "./BudgetExpInfo";
import "../index.css";

const BudgetCard = ({ budget }) => {
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showExpenses, setShowExpenses] = useState(false);
  const [expenseId] = useState(budget.expenseId);
  const [key, setKey] = useState("category");
  const [updatedValue, setUpdatedValue] = useState("");
  const headers = ["Date", "Amount", "Description"];

  const handleDelete = async () => {
    try {
      const { data } = await axios.get(`/budgets/delete/${budget.budgetId}`);
      console.log(data);
      dispatch({ type: "UPDATE_BUDGETS", payload: data.budgets });
      setShowOptions(!showOptions);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleComplete = async () => {
    try {
      const { data } = await axios.get(`/budgets/completed/${budget.budgetId}`);
      console.log(data);
      dispatch({ type: "UPDATE_BUDGETS", payload: data.budgets });
      setShowOptions(!showOptions);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleUpdate = async () => {
    console.log(key);
    const payload = {
      [key]: updatedValue,
    };
    const { data } = await axios.post(
      `/budgets/update/${budget.budgetId}`,
      payload
    );
    console.log(data);

    dispatch({ type: "UPDATE_BUDGETS", payload: data.budgets });
    setShowEdit(!showEdit);
  };

  return (
    <div className={Styles["card"]}>
      <button
        className={Styles["options-button"]}
        onClick={() => setShowOptions(!showOptions)}
      >
        …
      </button>

      {showOptions && (
        <div className={Styles["options-menu"]}>
          <button
            onClick={(ev) => {
              setShowOptions(!showOptions);
              setShowEdit(!showEdit);
            }}
          >
            Edit
          </button>
          {!showExpenses && (
            <button
              onClick={(ev) => {
                setShowOptions(!showOptions);
                setShowExpenses(true);
              }}
            >
              Show Expenses
            </button>
          )}
          {showExpenses && (
            <button
              onClick={(ev) => {
                setShowOptions(!showOptions);
                setShowExpenses(false);
              }}
            >
              Hide Expenses
            </button>
          )}
          <button onClick={handleDelete}>Delete</button>
          {budget.active && (
            <button onClick={handleComplete}>Mark as Achived</button>
          )}
        </div>
      )}

      <div>Category : {budget.category}</div>
      <div>Total Amount : {budget.totalAmount}</div>
      <div>Amount Spent : {budget.amountSpent}</div>
      <div>Date : {budget.date}</div>
      <div>{budget.description}</div>

      {showEdit && (
        <div className={Styles["edit-div"]}>
          <select value={key} onChange={(ev) => setKey(ev.target.value)}>
            <option value="category">Category</option>
            <option value="totalAmount">Total Amount</option>
            <option value="amountSpent">Amount Spent</option>
            <option value="date">Date</option>
            <option value="description">Description</option>
          </select>
          {key === "category" && (
            <input
              type="text"
              value={updatedValue}
              onChange={(ev) => {
                setUpdatedValue(ev.target.value);
              }}
            ></input>
          )}
          {key === "totalAmount" && (
            <input
              type="number"
              value={updatedValue}
              onChange={(ev) => {
                setUpdatedValue(ev.target.value);
              }}
            ></input>
          )}
          {key === "amountSpent" && (
            <input
              type="number"
              value={updatedValue}
              onChange={(ev) => {
                setUpdatedValue(ev.target.value);
              }}
            ></input>
          )}
          {key === "date" && (
            <input
              type="date"
              value={updatedValue}
              onChange={(ev) => {
                setUpdatedValue(ev.target.value);
              }}
            ></input>
          )}
          {key === "description" && (
            <input
              type="text"
              value={updatedValue}
              onChange={(ev) => {
                setUpdatedValue(ev.target.value);
              }}
            ></input>
          )}
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}

      {showExpenses && (
        <table border="1">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expenseId.map((expId, idx) => (
              <BudgetExpInfo key={idx} expId={expId} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BudgetCard;
