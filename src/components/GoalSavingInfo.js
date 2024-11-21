import axios from "../utils/axios";
import React, { useEffect, useState } from 'react'

const GoalSavingInfo = ({savId}) => {
  const [saving,setSaving]=useState([]);
  useEffect(()=>{
    async function fetchSaving(){
      let{data}=await axios.get(`/savings/${savId}`);
      console.log(data.saving);
      setSaving(data.saving);
    }
    fetchSaving();
  },[savId]);
  return (
    <tr>
      <td>{saving.date}</td>
      <td>{saving.amount}</td>
      <td>{saving.description}</td>
    </tr>
  )
}

export default GoalSavingInfo