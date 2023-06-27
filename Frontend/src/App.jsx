import { useContext, useEffect, useState } from "react";
import Home from "./Pages/home/Home";
import "./App.css";
import { Person } from "@mui/icons-material";
import Profile from "./Component/Profile/Profile";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
} from "react-router-dom";
import Page_not_found from "./Component/Page_not_found";
import { authContext } from "./AuthContext/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  let page_not_found = {
    width: "100%",
    height: "60%",
    objectFit: "cover",
  };

  const { alert_msg, alert_type } = useContext(authContext);
  console.log(alert_msg, "alert_msg", alert_type);

  const token = JSON.parse(localStorage.getItem("token"));

  return (
    <>
      {/* alert msg */}
      {alert_msg &&
        toast(alert_msg, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })}

      {/* routing */}
      <Router>
        <ToastContainer />
        <Routes>

          <Route path="/" exact element={<Home/>} />
          <Route path="/login"  element={<Login/>} />
          <Route path="/register"  element={<Register/>} />
          <Route path="/profile/:username/:id"  element={<Profile/>} />

          <Route
            path="/*"
            element={
              <div>
                <img
                  style={page_not_found}
                  src="assets\page_not_found.jpg"
                  alt=""
                />
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
