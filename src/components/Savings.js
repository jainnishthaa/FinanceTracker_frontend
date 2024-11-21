import axios from "../utils/axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SavingCard from "./SavingCard";
import LineChart from "./LineChart";


const Savings = () => {
  const dispatch = useDispatch();
  const initial = useSelector((state) => state.userReducer);
  const [savings, setSavings] = useState(initial.savings);
  const [savgraph,setSavgraph]=useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const categoryRef = useRef("");
  const amountRef = useRef("");
  const dateRef = useRef("");
  const descriptionRef = useRef("");

  useEffect(() => {
    async function getSavings() {
      let { data } = await axios.get("/savings/all");
      console.log(data.savings);
      setSavings(data.savings);
      setSavgraph(data.savgraph);
    }
    getSavings();
  }, [initial.savings]);

  const handleAdd = async () => {
    const category = categoryRef.current.value;
    const amount = amountRef.current.value;
    const date = dateRef.current.value;
    const description = descriptionRef.current.value;
    try {
      const { data } = await axios.post("/savings/add", {
        category,
        amount,
        date,
        description,
      });
      console.log(data);
      setSavings(data.savings);
      dispatch({ type: "UPDATE_SAVINGS", payload: data.savings });
      setShowAdd(!showAdd);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <h1 className="header">
        Savings
        <button onClick={(ev) => setShowAdd(!showAdd)}>Add Saving</button>
      </h1>
      {showAdd && (
        <div className="add-div">
          <input ref={categoryRef} type="text" placeholder="Saving category" />
          <input ref={amountRef} type="number" placeholder="Saving amount" />
          <input
            ref={descriptionRef}
            type="text"
            placeholder="Saving description"
          />
          <input ref={dateRef} type="date" placeholder="Saving date" />
          <button onClick={handleAdd}>Add Saving</button>
        </div>
      )}
      {savgraph.length!=0 && <LineChart dataSet={savgraph} label={"Savings"}/>}
      {savings.map((saving, idx) => (
        <SavingCard key={idx} saving={saving} />
      ))}
    </>
  );
};

export default Savings