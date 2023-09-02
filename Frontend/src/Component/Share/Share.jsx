import React, { useState } from "react";
import "./share.css";
import { useRef } from "react";
import {
  EmojiEmotions,
  Label,
  LabelImportant,
  PermMedia,
  Room,
} from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import InputEmoji from "react-input-emoji";
import { Link } from "react-router-dom";

const Share = ({get_feed}) => {
  let url = import.meta.env.VITE_APP_API_URL;

  // const [ text, setText ] = useState('')

  function handleOnEnter(text) {
    console.log("enter", text);
  }

  const [file, setfiles] = useState();
  const [preview, setpreview] = useState();
  const [desc, settext] = useState("");

console.log(desc,"desc")
  // handelChange function
  const hendelChange = (e) => {
    setfiles(e.target.files[0]);
    setpreview(URL.createObjectURL(e.target.files[0]));
  };
  let user_id = JSON.parse(localStorage.getItem("user_id"));
  let user_name = JSON.parse(localStorage.getItem("user_name"));
  let user = JSON.parse(localStorage.getItem("user"));
  console.log(file, "user_id");


  // share post
  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("desc", desc);
    formData.append("user_id", user_id);
    formData.append("user_name", user_name);
    // console.log(formData, formData);

    const res = await axios.post(`${url}/api/posts`, formData, {
      headers: {
        "Content-Type": "multipart/form-data'",
        authorization:JSON.parse(localStorage.getItem("token"))
      },
    });


    if (res.status === 200) {
      setpreview(null);
      settext("");
      // window.location.reload();
      get_feed()
      toast.success("post successfully", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.warning("something wrong", {
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
  };

  return (

    <div className="share">
      <div className="shareWrapper">
        <div className="share_top">
          <Link to={`/profile/${user_name}/${user_id}`}>
            <img
              className="shareTopImage"
              src={
                user?.profilePicture
                  ? `${url}/${user?.profilePicture}`
                  : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
              }
              alt=""
            />
          </Link>
{/*
          <InputEmoji
            borderColor="white"
            value={desc}
            onChange={(e) => {
              settext(e.target.value)
            }}
            cleanOnEnter
            onEnter={handleOnEnter}
            placeholder="Type a message"
          /> */}

<input  placeholder="Type a message"  className="shareTopInput" type="text"  value={desc}
            onChange={(e) => {
              settext(e.target.value)

            }} />

        </div>
        <hr className="share_hr" />

        <div className="share_bottom">
          <form onSubmit={handelSubmit} className="shareOptions">
            <div className="shareOption">
              <label htmlFor="file">
                <PermMedia htmlColor="tomato" className="shareIcon" />
                <span className="shareoptionText">Photo Or Video</span>
                <input
                  accept="image"
                  onChange={(e) => {
                    hendelChange(e);
                  }}
                  id="file"
                  style={{ display: "none" }}
                  type="file"
                />
              </label>
            </div>
            <div className="shareOption">
              <LabelImportant htmlColor="blue" className="shareIcon" />
              <span className="shareoptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareoptionText">Location</span>
            </div>
            <div className="shareOption">

              <EmojiEmotions
                htmlColor="golden"
                classNames
                className="shareIcon"
                hareIcon
              />

              <span className="shareoptionText">Feelings </span>
            </div>{" "}
            <button className="share_button">Share</button>
          </form>
        </div>
      </div>

      <div style={{ position: "relative" }}>
        {preview && (
          <>
            <img className="image_preview" src={preview} alt="" />
            <MdCancel
              onClick={() => {
                setpreview(null);
              }}
              className="cancel"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Share;
