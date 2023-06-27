import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useContext, useEffect, useState } from "react";
import "./post.css";
import axios from "axios";
import { format } from "timeago.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";


const options = [
    'Delete',
  ];

  const ITEM_HEIGHT = 48;

const Post = ({ post, get_feed, user_id }) => {

  let userId = JSON.parse(localStorage.getItem("user_id"));
  const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;
  let url = import.meta.env.VITE_APP_API_URL;

  // get user
  const [user, setUser] = useState(Object);


  const GetUser = async () => {
    try {
      let res = await axios.get(`${url}/api/user/${user_id}`
      ,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      }
      );
      setUser(res.data);
      console.log(res.data, "users");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetUser();
  }, [user_id]);


  // handel like
  const handelLike = async (id) => {
    try {
      let res = await axios.put(`${url}/api/posts/liked/${id}`, {
        userId: userId,

      }
      ,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      }
      );
      get_feed();
      toast(res.data, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
    }
  };


//   three dot menu

const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};


const handleClose = () => {
  setAnchorEl(null);
};


  return (
    <div className="Post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${post.userName}/${post.userId}`}>
              <img
                className="postImage"
                src={
                  user?.profilePicture
                    ? `${url}/${user?.profilePicture}`
                    : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
                }
                alt=""
              />
            </Link>
            <span className="postUserName"> {post.userName} </span>
            <span className="postTime">{format(post.createdAt)}</span>
          </div>

          {/* three dot menu */}
          <div className="postTopRight">
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "10ch",
                },
              }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === "Pyxis"}
                  onClick={handleClose}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
            {/* <MoreVert /> */}



          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={`${url}/${post.img}`} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="postIcon" src={`${PF}like.png`} alt="" />
            <img
              className="postIcon"
              onClick={() => {
                handelLike(post._id);
              }}
              src="/assets/heart.png"
              alt=""
            />
            <span className="postLikesCount">
              {post.likes.length} people Like it
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postComment">0 Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
