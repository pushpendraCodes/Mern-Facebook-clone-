import React, { useContext, useEffect, useState } from "react";
import Leftbar from "../leftbar/Leftbar";
import Rightbar from "../rightbar/Rightbar";
import Topbar from "../topbar/Topbar";
import Feed from "../feed/Feed";
import "./Profile.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { authContext } from "../../AuthContext/AuthContext";
import { AiFillCamera } from "react-icons/ai";
import { RiImageEditFill } from "react-icons/ri";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CoverPreview from "./CoverPreview";
import ProfilePreview from "./ProfilePreview";
import View_Profile from "./View_Profile";

export default function Profile() {
  let { username, id } = useParams();
  let url = import.meta.env.VITE_APP_API_URL;

  const { user } = useContext(authContext);
  const [users, setUser] = useState();
  let userId = JSON.parse(localStorage.getItem("user_id"));

// geting user profile details
  const freind_profile = async () => {
    try {
      let res = await axios.get(`${url}/api/user/${id}`
      ,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      }
      );
      console.log(res.data, "friend_profile");
      setUser(res.data);

      if(id === userId){
      localStorage.setItem("user", JSON.stringify(res.data));
      }



    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    freind_profile();
  }, [id]);

  useEffect(() => {
    freind_profile();
  }, [user]);

  let user_id = JSON.parse(localStorage.getItem("user_id"));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // cover image update

  const [open, setOpen] = useState(false);
  const [cover_img, setCover] = useState();
  const [cover_preview, setCoverPreview] = useState();
  console.log(cover_img, "setCover");

  const handleClose = () => {
    setOpen(false);
    setCover(null);
    setCoverPreview(null);
    window.location.reload();
  };

  const handelCover = (e) => {
    console.log(e.target.files[0], "handelCover");
    setCover(e.target.files[0]);
    setCoverPreview(URL.createObjectURL(e.target.files[0]));
    setOpen(true);
  };

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append("CoverPicture", cover_img);
    let res = await axios.put(
      `${url}/api/user/update/cover/${user_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data'",
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    if (res.status === 200) {
      setOpen(false);
      freind_profile();
      toast("cover picture updated", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    console.log(res, "cover update");
  };

  // profile picture update
  const [open1, setOpen1] = useState(false);
  const [profilePicture, setProfile] = useState();
  const [Profile_preview, setProfilePreview] = useState();
  console.log(profilePicture, "profile");

  const handleClose1 = () => {
    setOpen1(false);
    setProfile(null);
    setProfilePreview(null);
    window.location.reload();
  };

  const handelProfile = (e) => {
    console.log(e.target.files[0], "profile");
    setProfile(e.target.files[0]);
    setProfilePreview(URL.createObjectURL(e.target.files[0]));
    setOpen1(true);
  };

  const handleSubmit1 = async () => {
    let formData = new FormData();
    formData.append("profilePicture", profilePicture);
    let res = await axios.put(
      `${url}/api/user/update/profile/${user_id}`,
      formData
      ,
      {
        headers: {
          "Content-Type": "multipart/form-data'",
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    if (res.status === 200) {
      setOpen1(false);
      freind_profile();

      toast("profile picture updated", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    console.log(res, "profile update");
  };
  const [open2, setOpen2] = useState(false);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Leftbar />

        <CoverPreview
          open={open}
          handleClose={handleClose}
          cover_preview={cover_preview}
          handleSubmit={handleSubmit}
        />
        <ProfilePreview
          open={open1}
          handleClose={handleClose1}
          cover_preview={Profile_preview}
          handleSubmit={handleSubmit1}
        />

        <View_Profile
          setOpen2={setOpen2}
          open2={open2}
          profile_pic={`${url}/${users?.profilePicture}`}
        />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profilecover">
              <img
                className="profileCoverImg"
                src={
                  users?.CoverPicture
                    ? `${url}/${users?.CoverPicture}`
                    : `https://images.unsplash.com/photo-1596387451750-f7bfb51461ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y292ZXIlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80`
                }
                alt="cover picture"
              />
              {id === user_id && (
                <label htmlFor="cover">
                  <input
                    onChange={(e) => {
                      handelCover(e);
                    }}
                    accept="image"
                    id="cover"
                    name="CoverPicture"
                    style={{ display: "none" }}
                    type="file"
                  />
                  <RiImageEditFill className="update_cover_icon" />
                </label>
              )}
              <img
                className="profileUserimg"
                onClick={() => {
                  setOpen2(!open);
                }}
                // src="/assets/person/1.jpeg"
                src={
                  users?.profilePicture
                    ? `${url}/${users?.profilePicture}`
                    : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
                }
                alt=""
              />
              {id === user_id && (
                <label htmlFor="profile">
                  <input
                    onChange={(e) => {
                      handelProfile(e);
                    }}
                    style={{ display: "none" }}
                    id="profile"
                    type="file"
                    name="profilePicture"
                  />
                  <AiFillCamera className="update_profile_icon" />
                </label>
              )}
            </div>
            <div className="profileInfo">
              <span className="profileName">{users?.username}</span>
              <span className="profileDesc">{users?.bio}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed id={id} />
            <Rightbar id={id} />
          </div>
        </div>
      </div>
    </>
  );
}
