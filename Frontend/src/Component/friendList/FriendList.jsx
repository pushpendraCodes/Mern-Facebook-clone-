import React, { useEffect, useState } from "react";
import "./friendList.css";
import axios from "axios";
import { Link } from "react-router-dom";
const FriendList = ({ id }) => {

  let url = import.meta.env.VITE_APP_API_URL;
  const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;
  console.log(id,"id")

  const[friend ,setfriend]=useState(Object)
  useEffect(() => {


    // getting friendlist
    const getFriendDetails = async () => {
      let res = await axios.get(`${url}/api/user/${id}`,

          {
            headers: {
              "Content-Type": "application/json",
              authorization: JSON.parse(localStorage.getItem("token")),
            },
          }
      );
      console.log(res.data, "friebslist");
      setfriend(res.data)
    };
    getFriendDetails();
  }, []);
  return (
    <>
    <Link style={{textDecoration:"none"}}  to={`/profile/${friend.username}/${friend._id}`}>
      <div className="rightbarFollowing">
        <img
            src={ friend?.profilePicture ?  `${url}/${friend?.profilePicture}`:`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png` }
          alt=""
          className="rightbarFollowingImg"
        />
        <span className="rightbarFollowingName">{friend.username}</span>
      </div></Link>
    </>
  );
};

export default FriendList;
