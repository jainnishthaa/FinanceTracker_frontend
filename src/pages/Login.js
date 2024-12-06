import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginHandler = async () => {
    const username = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const { data } = await axios.post("/login", { username, password });
      console.log(data);
      // SET THE DATA TO REDUX
      dispatch({ type: "SET_USER", payload: data.user });
      localStorage.setItem("user",JSON.stringify(data.user));
      // NAVIGATE TO HOME PAGE
      navigate("/dashboard/all");
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="container">
      <div className="logindiv">
        <input
          ref={emailRef}
          type="text"
          placeholder="Enter username or email"
        />
        <br />
        <input ref={passwordRef} type="password" placeholder="Enter password" />
        <br />
        <button onClick={loginHandler}>Login</button>
        <div>New User?  <Link to={"/signup"}>Sign up</Link></div>
      </div>
    </div>
  );
};

export default Login;
