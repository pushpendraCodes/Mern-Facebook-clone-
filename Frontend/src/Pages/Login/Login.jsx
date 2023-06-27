import { useContext, useEffect, useRef } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { authContext } from "../../AuthContext/AuthContext";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

export default function Login() {
  let url = import.meta.env.VITE_APP_API_URL;
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch, isError } = useContext(authContext);
  let navigate = useNavigate();

useEffect(()=>{
  if (JSON.parse(localStorage.getItem("user"))) {
    navigate("/");
  }
},[])


  // handel login function
  const handelLogin = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });
    try {
      let res = await axios.post(`${url}/api/auth/login`, {
        email: email.current.value,
        password: password.current.value,
      });
      if (res.status === 200) {
        await dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        console.log(res.data);
        localStorage.setItem("user_id", JSON.stringify(res.data.user._id));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("user_name", JSON.stringify(res.data.user.username));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      } else {
        await dispatch({ type: "STOP_FETCHING", payload: res.data.user });
        email.current.value = "";
        password.current.value = "";
      }
    } catch (error) {
      console.log(error, "error");
      await dispatch({ type: "LOGIN_FALUIRE" });
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Facebook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Facebook.
          </span>
        </div>
        <div className="loginRight">
          <form onSubmit={handelLogin} className="loginBox">
            <input
              required
              ref={email}
              placeholder="Email"
              className="loginInput"
            />
            <input
              required
              name="password"
              ref={password}
              placeholder="Password"
              className="loginInput"
            />

            <button disabled={isFetching} className="loginButton">
              {isFetching ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                "Login"
              )}
            </button>
            <span disabled={isFetching} className="loginForgot">
              Forgot Password?
            </span>

            <Link
              disabled={isFetching}
              className="loginRegisterButton"
              to="/register"
            >
              {isFetching ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "create an account"
              )}
            </Link>
          </form>
        </div>
      </div>
      {}
    </div>
  );
}
