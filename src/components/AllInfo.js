import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import Spinner from "./Spinner";
import Styles from "./AllInfo.module.css";
import DonutChart from "./DonutChart";

const AllInfo = () => {
  const [fetchedInfo, setFetchedInfo] = useState(false);
  const [budgetChart, setBudgetChart] = useState([]);
  const budgetLabel = ["Amount Spent", "Amount Left"];
  const [goalChart, setGoalChart] = useState([]);
  const goalLabel = ["Amount Saved", "Amount needed"];
  const [info, setInfo] = useState({});
  useEffect(() => {
    async function getInfo() {
      try {
        let { data } = await axios.get("/user/all-info");
        console.log(data.data);
        setInfo(data.data);
        console.log(info);
        setFetchedInfo(true);
        if (data.data.budget) {
          const amountSpent = data.data.budget.amountSpent;
          const amountLeft = data.data.budget.totalAmount - amountSpent;
          setBudgetChart([amountSpent, amountLeft]);
          console.log(budgetChart);
        }
        if (data.data.savingGoal) {
          const amountSaved = data.data.savingGoal.amountSaved;
          const remainingAmount = data.data.savingGoal.goalAmt - amountSaved;
          setGoalChart([amountSaved, remainingAmount]);
          console.log(goalChart);
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    }
    getInfo();
  }, []);

  return (
    <>
      {!fetchedInfo && <Spinner />}
      {fetchedInfo && (
        <>
          <div className={Styles["main-div"]}>
            {info.budget && (
              <div className={Styles["second-div"]}>
                <h3>Budget</h3>
                <div>Category : {info.budget.category}</div>
                <div>Total Amount : {info.budget.totalAmount}</div>
                <div>Amount Spent : {info.budget.amountSpent}</div>
                <div>Date : {info.budget.date}</div>
              </div>
            )}
            {info.budget && (
                <div className={Styles["donut-chart"]}>
                  <DonutChart dataSet={budgetChart} Label={budgetLabel}/>
                </div>
            )}
            {info.expense && (
              <div className={Styles["second-div"]}>
                <h3>Expense</h3>
                <div>Category : {info.expense.category}</div>
                <div>Amount : {info.expense.amount}</div>
                <div>Date : {info.expense.date}</div>
                <div>{info.expense.description}</div>
              </div>
            )}
          </div>
          <div className={Styles["main-div"]}>
            {info.savingGoal && (
              <div className={Styles["second-div"]}>
                <h3>Saving Goal</h3>
                <div>Category : {info.savingGoal.category}</div>
                <div>Goal Amount : {info.savingGoal.goalAmt}</div>
                <div>Amount Saved : {info.savingGoal.amountSaved}</div>
                <div>Target Date : {info.savingGoal.targetDate}</div>
              </div>
            )}
            {info.savingGoal && (
              <div className={Styles["donut-chart"]}>
                <DonutChart dataSet={goalChart} Label={goalLabel} />
              </div>
            )}
            {info.saving && (
              <div className={Styles["second-div"]}>
                <h3>Saving</h3>
                <div>Category: {info.saving.category}</div>
                <div>Amount: {info.saving.amount}</div>
                <div>Date : {info.saving.date}</div>
                <div>{info.saving.description}</div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default AllInfo;
