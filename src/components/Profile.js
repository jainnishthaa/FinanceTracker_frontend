import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./Profile.module.css";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const user = useSelector((state) => state.userReducer);
  console.log(user);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [key, setKey] = useState("name");
  const [updatedValue, setUpdatedValue] = useState("");

  const handleDelete = async () => {
    try {
      let { data } = await axios.get(`/user/delete`);
      console.log(data);
      dispatch({ type: "DELETE_USER" });
      dispatch({ type: "DELETE_SAVING_GOAL" });
      dispatch({ type: "DELETE_BUDET" });
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleEdit = async () => {
    if (key === "name") {
      const name = updatedValue;
      try {
        let { data } = await axios.post("/user/update", {
          name,
        });
        dispatch({ type: "SET_USER", payload: data.user });
      } catch (error) {
        alert(error.response.data.message);
      }
    } else if (key === "username") {
      const username = updatedValue;
      try {
        let { data } = await axios.post("/user/update", {
          username,
        });
        dispatch({ type: "SET_USER", payload: data.user });
      } catch (error) {
        alert(error.response.data.message);
      }
    } else if (key === "email") {
      const email = updatedValue;
      try {
        let { data } = await axios.post("/user/update", {
          email,
        });
        dispatch({ type: "SET_USER", payload: data.user });
      } catch (error) {
        alert(error.response.data.message);
      }
    } else if (key === "password") {
      const password = updatedValue;
      try {
        let { data } = await axios.post("/user/update", {
          password,
        });
        dispatch({ type: "SET_USER", payload: data.user });
      } catch (error) {
        alert(error.response.data.message);
      }
    } else {
      alert("Invalid key");
    }
  };

  return (
    <div className={Styles["profile-div"]}>
      <h1>Profile</h1>
      <img className={Styles["image"]} src={user.image}></img>
      <h3 className={Styles["information"]}>Name : {user.name}</h3>
      <h3 className={Styles["information"]}>Username : {user.username}</h3>
      <h3 className={Styles["information"]}>Email : {user.email}</h3>
      <button className={Styles["btn"]} onClick={() => setShowEdit(!showEdit)}>
        Edit Profile
      </button>
      <button className={Styles["btn"]} onClick={handleDelete}>Delete Account</button>
      {showEdit && (
        <div className={Styles["edit-container"]}>
          <select
            value={key}
            onChange={(e) => setKey(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="username">Username</option>
            <option value="email">Email</option>
            <option value="password">Password</option>
          </select>
          {key === "name" && (
            <input
              type="text"
              value={updatedValue}
              onChange={(e) => setUpdatedValue(e.target.value)}
            />
          )}
          {key === "username" && (
            <input
              type="text"
              value={updatedValue}
              onChange={(e) => setUpdatedValue(e.target.value)}
            />
          )}
          {key === "email" && (
            <input
              type="email"
              value={updatedValue}
              onChange={(e) => setUpdatedValue(e.target.value)}
            />
          )}
          {key === "password" && (
            <input
              type="password"
              value={updatedValue}
              onChange={(e) => setUpdatedValue(e.target.value)}
            />
          )}
          <button onClick={handleEdit}>Update</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
