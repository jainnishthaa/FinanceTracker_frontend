import React, { useState } from "react";
import Styles from "./Card.module.css";
import axios from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";

const SavingCard = ({ saving }) => {
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [key, setKey] = useState("category");
  const [updatedValue, setUpdatedValue] = useState("");

  const handleDelete = async () => {
    try {
      let { data } = await axios.get(`/savings/delete/${saving.savingId}`);
      console.log(data);
      dispatch({ type: "UPDATE_SAVINGS", payload: data.savings });
      setShowOptions(!showOptions);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  //   const editSavingGoal = async (amount) => {
  //     try {
  //       const { data } = await axios.post(
  //         `/saving-goals/update/${SavingGoal.goalId}`,
  //         amount
  //       );

  //       console.log(data);
  //       dispatch({ type: "UPDATE_SAVING_GOALS", payload: data.savingGoals });
  //       dispatch({ type: "SET_SAVING_GOAL", payload: data.savingGoals[0] });
  //     } catch (error) {
  //       alert(error.response.data.message);
  //     }
  //   };

  const handleUpdate = async () => {
    console.log(key);
    const payload = {
      [key]: updatedValue,
    };
    const { data } = await axios.post(
      `/savings/update/${saving.savingId}`,
      payload
    );
    console.log(data);
    dispatch({ type: "UPDATE_SAVINGS", payload: data.savings });
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
      <div>Category: {saving.category}</div>
      <div>Amount: {saving.amount}</div>
      <div>Date : {saving.date}</div>
      <div>{saving.description}</div>
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

export default SavingCard;
