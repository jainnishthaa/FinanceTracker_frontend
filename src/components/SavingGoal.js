import axios from "../utils/axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SavingGoalscard from "./SavingGoalscard";

const SavingGoal = () => {
  const dispatch = useDispatch();
  const initial = useSelector((state) => state.userReducer);
  const [savingGoals, setSavingGoals] = useState(initial.savingGoals);
  const [showAdd, setShowAdd] = useState(false);
  const categoryRef = useRef("");
  const goalAmtRef = useRef("");
  const targetDateRef = useRef("");
  const descriptionRef = useRef("");
  const amountSavedRef = useRef("");

  useEffect(() => {
    async function getSavingGoals() {
      let { data } = await axios.get("/saving-goals/all");
      console.log(data.savingGoals);
      setSavingGoals(data.savingGoals);
    }
    getSavingGoals();
  }, [initial.savingGoals]);

  const handleAdd = async () => {
    const category = categoryRef.current.value;
    const goalAmt = goalAmtRef.current.value;
    const targetDate = targetDateRef.current.value;
    const description = descriptionRef.current.value;
    const amountSaved = amountSavedRef.current.value;
    try {
      const { data } = await axios.post("/saving-goals/add", {
        category,
        goalAmt,
        targetDate,
        description,
        amountSaved,
      });
      console.log(data);
      setSavingGoals(data.savingGoals);
      dispatch({ type: "UPDATE_SAVING_GOALS", payload: data.savingGoals });
      dispatch({ type: "SET_SAVING_GOAL", payload: data.savingGoals[0] });
      setShowAdd(!showAdd);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <h1 className="header">
        Saving Goals
        <button onClick={(ev) => setShowAdd(!showAdd)}>Add Saving Goal</button>
      </h1>
      {showAdd && (
        <div className="add-div">
          <input
            ref={categoryRef}
            type="text"
            placeholder="Saving Goal category"
          />
          <input
            ref={goalAmtRef}
            type="number"
            placeholder="Goal amount"
          />
          <input
            ref={amountSavedRef}
            type="number"
            placeholder="Amount saved"
          />
          <input
            ref={descriptionRef}
            type="text"
            placeholder="Saving Goal description"
          />
          <input
            ref={targetDateRef}
            type="date"
            placeholder="Saving Goal Target date"
          />
          <button onClick={handleAdd}>Add Saving Goal</button>
        </div>
      )}
      {savingGoals.map((savingGoal, idx) => (
        <SavingGoalscard key={idx} savingGoal={savingGoal} />
      ))}
    </>
  );
};

export default SavingGoal;
