import React from "react";
import "./online.css";
const Online = ({ item, i }) => {
  const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;
  return (
    <>
      <li className="rightbaronlineFriend">
        <div className="rightbarOnlineUserProfile">
          <img
            className="rightbarOnlineUserPic"
            src={
              item.profilePicture ||
              `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
            }
          />
          <span className="rightbarOnlineIcon"></span>
        </div>
        <span className="rightbarOnlineUserName">{item.username}</span>
      </li>
    </>
  );
};

export default Online;
