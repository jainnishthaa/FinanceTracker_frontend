import { useDispatch } from "react-redux";
import axios from "../utils/axios";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const usernameRef = useRef();
  const imageRef = useRef();

  const signupHandler = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    const username = usernameRef.current.value;
    const image = imageRef.current.files[0];

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("username", username);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("image", image);
    // console.log(formdata)

    try {
      const { data } = await axios.post("signup", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({ type: "SET_USER", payload: data });
      navigate("/login");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="signupdiv">
        <input ref={nameRef} type="text" placeholder="Enter Name" />
        <br />
        <input ref={emailRef} type="email" placeholder="Enter Email" />
        <br />
        <input ref={usernameRef} type="text" placeholder="Enter username" />
        <br />
        <input ref={passwordRef} type="password" placeholder="Enter password" />
        <br />
        <input ref={imageRef} type="file" />
        <br />
        <button onClick={signupHandler}>Sign Up</button>
        <div>Already a User!  <Link to={"/login"}>Login</Link></div>
      </div>
    </div>
  );
};

export default Signup;
