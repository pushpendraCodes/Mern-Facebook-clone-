import { Link } from "react-router-dom";
import "./register.css";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../AuthContext/AuthContext";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
export default function Register() {
  const { isFetching, isError, dispatch } = useContext(authContext);
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  let navigate = useNavigate();
  let url = import.meta.env.VITE_APP_API_URL;


  useEffect(()=>{
    if (JSON.parse(localStorage.getItem("user"))) {
      navigate("/");
    }
  },[])

  const handleClick = async (e) => {
    console.log(passwordAgain.current.value, password.current.value);
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        let res = await axios.post(`${url}/api/auth/register`, user);
        if (res.status === 200) {
          console.log(res, "register");
          dispatch({type:"REGISTER_SUCCESS"})
          navigate("/login");
        }

        email.current.value = "";
        password.current.value = "";
        username.current.value = "";
        passwordAgain.current.value = "";
      } catch (err) {
        console.log(err);
        dispatch({type:"LOGIN_FALUIRE"})
      }
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">social</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Facebook.
          </span>
        </div>
        <div className="loginRight">
          <form onSubmit={handleClick} className="loginBox">
            <input
              required
              name="username"
              ref={username}
              placeholder="Username"
              className="loginInput"
            />
            <input
              required
              name="email"
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
            <input
              required
              name="passwordAgain"
              ref={passwordAgain}
              placeholder="Password Again"
              className="loginInput"
            />
            <button type="submit" className="loginButton">

              {
                isFetching? <CircularProgress color="inherit" size="20px" />:"sign up"
              }
            </button>
            <Link className="loginRegisterButton" to="/login">

            {
                isFetching? <CircularProgress color="inherit" size="20px" />:"Log in account"
              }
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
