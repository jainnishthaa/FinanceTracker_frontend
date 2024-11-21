import React, { useEffect, useState } from 'react'
import axios from "../utils/axios";

const BudgetExpInfo = ({expId}) => {
    const [expense, setExpense] = useState([]);
    useEffect(() => {
        async function fetchExpense (){
            let {data}= await axios.get(`/expenses/${expId}`);
            console.log(data.expense);
            setExpense(data.expense);
        }
        fetchExpense();
        }, [expId]);
  return (
    <tr >
        <td>{expense.date}</td>
        <td>{expense.amount}</td>
        <td>{expense.description}</td>
    </tr>
  )
}

export default BudgetExpInfo;