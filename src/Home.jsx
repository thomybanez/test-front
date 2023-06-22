import React from "react";
import { useNavigate } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import axios from "axios";

const Home = (props) => {
  const navigate = useNavigate();

  const handleSuccessfulAuth = (data) => {
    props.handleLogin(data);
    navigate("/dashboard");
  };

  const handLogOut = () => {
    axios.delete("http://localhost:3001/logout", { withCredentials: true })
    .then(response =>{
      props.handleLogOut();
    }).catch(error =>{
      console.log("Error Logout", error)
    });    
  };

  return (
    <div>
      <h1>Home</h1>
      <h1>Status: {props.loggedInStatus}</h1>
      <button onClick={ () => handLogOut()}>Logout</button>
      <Registration handleSuccessfulAuth={handleSuccessfulAuth} />
      <Login handleSuccessfulAuth={handleSuccessfulAuth} />
    </div>
  );
};

export default Home;