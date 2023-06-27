import React from "react";
import { Search } from "@mui/icons-material";
import { Person, Chat, Notifications } from "@mui/icons-material";
import "./topbar.css";
import { Link } from "react-router-dom";
const Topbar = () => {
  let user_name = JSON.parse(localStorage.getItem("user_name"));
  let user_id = JSON.parse(localStorage.getItem("user_id"));
  let user = JSON.parse(localStorage.getItem("user"));
  let url = import.meta.env.VITE_APP_API_URL;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" className="logo">
          Facebook
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="search_icon" />
          <input
            placeholder="search for friend post or video"
            className="searchInput"
            type="text"
            name=""
            id=""
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLink1">
          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            <span className="topbarLink">HomePage</span>
          </Link>
          <span className="topbarLink">Timeline</span>
        </div>

        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="notification">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="notification1">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="notification2">1</span>
          </div>
        </div>
        <Link to={`/profile/${user_name}/${user_id}`}>
          <img
            src={
              user?.profilePicture
                ? `${url}/${user?.profilePicture}`
                : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
            }
            className="topbarImg"
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
