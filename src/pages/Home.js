import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <div className="homediv">
      <h2>Master Your Money, Achieve Your Goals</h2>
      <h2>Effortless Financial Tracking!</h2>
      <div>
      <Link to={"/signup"}>
        <Button>Signup</Button>
      </Link>
      <Link to={"/login"}>
        <Button>Login</Button>
      </Link>
      </div>
      </div>
    </div>
  );
};

export default Home;
