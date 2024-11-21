import React, { useState } from "react";
import Styles from "./Card.module.css";
import axios from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";

const ExpenseCard = ({ expense }) => {
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [key, setKey] = useState("category");
  const [updatedValue, setUpdatedValue] = useState("");

  const handleDelete = async () => {
    try {
      let { data } = await axios.get(`/expenses/delete/${expense.expenseId}`);
      console.log(data);
      dispatch({ type: "UPDATE_EXPENSES", payload: data.expenses });
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
      `/expenses/update/${expense.expenseId}`,payload);
    console.log(data);
    dispatch({ type: "UPDATE_EXPENSES", payload: data.expenses });
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
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
        <div>Category : {expense.category}</div>
        <div>Amount : {expense.amount}</div>
        <div>Date : {expense.date}</div>
        <div>{expense.description}</div>
      {showEdit && (
        <div className={Styles["edit-div"]}>
          <select value={key} onChange={(ev) => setKey(ev.target.value)}>
            <option value="category">category</option>
            <option value="amount">amount</option>
            <option value="date">date</option>
            <option value="description">description</option>
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
          {key == "amount" && (
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
    </div>
  );
};

export default ExpenseCard;
