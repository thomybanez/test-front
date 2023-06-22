import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import axios from "axios";

const App = () => {
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN");
  const [user, setUser] = useState({});

  const handleLogin = (data) => {
    setLoggedInStatus("LOGGED_IN");
    setUser(data);
  };

  const handleLogOut = () => {
    setLoggedInStatus("NOT_LOGGED_IN")
    setUser({})
  }

  const checkLoginStatus = () => {
    axios.get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(response => {
        if (response.data.logged_in && loggedInStatus === "NOT_LOGGED_IN"){
          setLoggedInStatus("LOGGED_IN");
          setUser(response.data.user);
        }
        else if (!response.data.logged_in && loggedInStatus === "LOGGED_IN"){
          setLoggedInStatus("NOT_LOGGED_IN");
          setUser({})
        }
      })
      .catch(error => {
        console.log("Check Login Error", error);
      });
  }

  useEffect(() => {
    checkLoginStatus();
  });

  return (
    <Router>
      <Routes>
        <Route
          exact
          path={"/"}
          element={
            <Home 
              handleLogin={handleLogin} 
              handleLogOut={handleLogOut} 
              loggedInStatus={loggedInStatus} 
              user={user} 
            />
          }
        />
        <Route
          exact
          path={"/dashboard"}
          element={
            <Dashboard 
              loggedInStatus={loggedInStatus} 
              user={user} 
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;