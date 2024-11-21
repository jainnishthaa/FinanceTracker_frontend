import React, { useEffect } from 'react'
import Spinner from "../components/Spinner";
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Logout = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    useEffect(() => {
      async function logout(){
        let {data}=await axios.get("/logout");
        console.log(data);
        localStorage.removeItem("user");
        dispatch({type:"DELETE_USER"});
        navigate("/");
      }
      logout();
    }, [])
    
  return (
    <div className="container">
      <Spinner />
    </div>
  )
}

export default Logout