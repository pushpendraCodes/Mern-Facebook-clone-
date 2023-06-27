import React, { useEffect } from "react";
import Feed from "../../Component/feed/Feed";
import Topbar from "../../Component/topbar/Topbar";
import Leftbar from "../../Component/leftbar/Leftbar";
import Rightbar from "../../Component/rightbar/Rightbar";
import "./home.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  let naviagte = useNavigate();
  useEffect(() => {

    if (!JSON.parse(localStorage.getItem("user"))) {
      naviagte("/login");
    }
  }, []);

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Leftbar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
};

export default Home;
