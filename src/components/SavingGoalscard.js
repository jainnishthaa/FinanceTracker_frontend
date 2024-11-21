import React, { useState } from "react";
import Styles from "./Card.module.css";
import axios from "../utils/axios";
import { useDispatch } from "react-redux";
import GoalSavingInfo from "./GoalSavingInfo";

const SavingGoalscard = ({ savingGoal }) => {
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showSavings, setShowSavings] = useState(false);
  const [savingId] = useState(savingGoal.savingId);
  const [key, setKey] = useState("category");
  const [updatedValue, setUpdatedValue] = useState("");
  const headers = ["Date", "Amount", "Description"];

  const handleDelete = async () => {
    try {
      const { data } = await axios.get(
        `/saving-goals/delete/${savingGoal.goalId}`
      );
      console.log(data);
      dispatch({ type: "UPDATE_SAVING_GOALS", payload: data.savingGoals });
      setShowOptions(!showOptions);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleComplete = async () => {
    try {
      const { data } = await axios.get(
        `/saving-goals/completed/${savingGoal.goalId}`
      );
      console.log(data);
      dispatch({ type: "UPDATE_SAVING_GOALS", payload: data.savingGoals });
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
      `/saving-goals/update/${savingGoal.goalId}`,
      payload
    );
    console.log(data);
    dispatch({ type: "UPDATE_SAVING_GOALS", payload: data.savingGoals });
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
          {!showSavings && (
            <button
              onClick={(ev) => {
                setShowOptions(!showOptions);
                setShowSavings(true);
              }}
            >
              Show Savings
            </button>
          )}
          {showSavings && (
            <button
              onClick={(ev) => {
                setShowOptions(!showOptions);
                setShowSavings(false);
              }}
            >
              Hide Savings
            </button>
          )}
          <button onClick={handleDelete}>Delete</button>
          {savingGoal.active && (
            <button onClick={handleComplete}>Mark as Achived</button>
          )}
        </div>
      )}
      <div>Category : {savingGoal.category}</div>
      <div>Goal Amount : {savingGoal.goalAmt}</div>
      <div>Amount Saved : {savingGoal.amountSaved}</div>
      <div>Target Date : {savingGoal.targetDate}</div>
      <div>{savingGoal.description}</div>
      {showEdit && (
        <div className={Styles["edit-div"]}>
          <select value={key} onChange={(ev) => setKey(ev.target.value)}>
            <option value="category">Category</option>
            <option value="goalAmt">Goal Amount</option>
            <option value="targetDate">Target Date</option>
            <option value="description">Description</option>
            <option value="amountSaved">Amount Saved</option>
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
          {key === "goalAmt" && (
            <input
              type="number"
              value={updatedValue}
              onChange={(ev) => {
                setUpdatedValue(ev.target.value);
              }}
            ></input>
          )}
          {key === "amountSaved" && (
            <input
              type="number"
              value={updatedValue}
              onChange={(ev) => {
                setUpdatedValue(ev.target.value);
              }}
            ></input>
          )}
          {key === "targetDate" && (
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

      {showSavings && (
        <table border="1">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {savingId.map((savId, idx) => (
              <GoalSavingInfo key={idx} savId={savId} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavingGoalscard;
