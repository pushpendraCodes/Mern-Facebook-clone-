import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../Online/Online";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authContext } from "../../AuthContext/AuthContext";
import FriendList from "../friendList/FriendList";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { FiEdit2 } from "react-icons/fi";
import TextField from "@mui/material/TextField";
import { Divider } from "@mui/material";
export default function Rightbar({ id }) {
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} item={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;
    // console.log(id, "id");
    let url = import.meta.env.VITE_APP_API_URL;
    let user_id = JSON.parse(localStorage.getItem("user_id"));

    // follow unfollow button functinality
    const [status, setstatus] = useState(null);

    const [friends, setfriends] = useState([]);
    const [user, setUser] = useState([]);
    const { user: Current_User, dispatch } = useContext(authContext);
    console.log("Current_User", Current_User);

    const getUserDetails = async () => {
      let res = await axios.get(`${url}/api/user/${id}`
      ,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      }
      );
      console.log(res, "friends");
      setUser(res.data);
      setfriends(res.data.followings);
    };

    useEffect(() => {
      let user = JSON.parse(localStorage.getItem("user"));
      // console.log(user.followings, "followings");
      if (user.followings.includes(id)) {
        setstatus("unFollow");
      } else {
        setstatus("Follow");
      }

      getUserDetails();
    }, []);

// follow unfollow user
    const un_follow_user = async () => {
      if (status == "unFollow") {
        try {
          const res = await axios.put(`${url}/api/user/${id}/unfollow`, {
            userId: user_id,

          }

          ,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: JSON.parse(localStorage.getItem("token")),
            },
          }
          );
          console.log(res, "unfollow");
          if (res.status === 200) {
            setstatus("Follow");
            toast("successfully unfollowed", {
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
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const res = await axios.put(`${url}/api/user/${id}/follow`, {
            userId: user_id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: JSON.parse(localStorage.getItem("token")),
            },
          }
          );
          console.log(res, "unfollow");
          if (res.status === 200) {
            setstatus("unFollow");
            toast("successfully followed", {
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
        } catch (error) {
          console.log(error);
        }
      }
    };

    // profile update modal
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

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [name, setname] = useState(false);
    const [bio, setbio] = useState(false);
    const [city, setcity] = useState(false);
    const [from, setfrom] = useState(false);
    const [relation, setrelation] = useState(false);

    const [data, setdata] = useState({
      username: user?.username,
      bio: user?.bio,
      city: user?.city,
      from: user?.from,
      relationship: user?.relationship,
    });
    console.log(data, "setdata");
    const handelChange = (e) => {
      // e.preventDefault();

      setdata({ ...data, [e.target.name]: e.target.value });
    };

    // update profile details
    const handelSave = async () => {
      try {
        let res = await axios.put(
          `${url}/api/user/update/details/${user_id}`,
          data
          ,
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("token")),
            },
          }
        );
        if (res.status === 200) {
          console.log(res.data, "rightbar");
          setdata("");
          setOpen(false);
          await dispatch({ type: "UPDATE_DETAILS", payload: res.data });

          toast("successfully updated", {
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
        setOpen(false);
        console.log(res, "res");
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <>
        {id !== user_id && (
          <button
            onClick={() => {
              un_follow_user();
            }}
            className="follow_btn "
          >
            {status} &nbsp;
            {status === "Follow" ? (
              <AiOutlinePlusCircle />
            ) : (
              <AiOutlineMinusCircle />
            )}
          </button>
        )}
        {id == user_id && (
          <button onClick={handleOpen} className="update_btn">
            Update Profile <FiEdit2 />{" "}
          </button>
        )}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h4 style={{ marginBottom: "10px" }}>Profile</h4>

            <div className="flex">
              <span className="rightbarInfoKey">Name</span>
              <span className="rightbarInfoValue">{user?.username}</span>
              <FiEdit2
                onClick={() => {
                  setname(!name);
                }}
                className="edit_icon"
                color="blue"
              />
            </div>

            {name && (
              <>
                <TextField
                  onChange={(e) => {
                    handelChange(e);
                  }}
                  id="standard-size-small"
                  defaultValue={user?.username}
                  size="small"
                  variant="standard"
                  className="name"
                  name="username"
                />
              </>
            )}

            <Divider />
            <br />

            <div className="flex">
              <span className="rightbarInfoKey">Bio</span>
              <span className="rightbarInfoValue">{user?.bio || "no bio"}</span>
              <FiEdit2
                onClick={() => {
                  setbio(!bio);
                }}
                className="edit_icon"
                color="blue"
              />
            </div>

            {bio && (
              <>
                <TextField
                  onChange={(e) => {
                    handelChange(e);
                  }}
                  id="standard-size-small"
                  defaultValue={user?.bio}
                  size="small"
                  variant="standard"
                  className="name"
                  name="bio"
                />
              </>
            )}

            <br />
            <h4 style={{ marginBottom: "10px", marginTop: "10px" }}>
              Details
            </h4>
            <div className="details">
              <div className="flex">
                <span className="rightbarInfoKey">City</span>
                <span className="rightbarInfoValue">{user?.city}</span>

                <FiEdit2
                  onClick={() => {
                    setcity(!city);
                  }}
                  className="edit_icon"
                  color="blue"
                />
              </div>

              {city && (
                <>
                  <TextField
                    onChange={(e) => {
                      handelChange(e);
                    }}
                    name="city"
                    id="standard-size-small"
                    defaultValue={user?.city}
                    size="small"
                    variant="standard"
                    className="name"
                  />
                </>
              )}

              <br />
              <div className="flex">
                <span className="rightbarInfoKey">From</span>
                <span className="rightbarInfoValue">{user?.from}</span>

                <FiEdit2
                  onClick={() => {
                    setfrom(!from);
                  }}
                  className="edit_icon"
                  color="blue"
                />
              </div>

              {from && (
                <>
                  <TextField
                    onChange={(e) => {
                      handelChange(e);
                    }}
                    name="from"
                    id="standard-size-small"
                    defaultValue={user?.from}
                    size="small"
                    variant="standard"
                    className="name"
                  />
                </>
              )}
              <br />

              <div className="flex">
                <label for="cars">Relationiship - </label>
                {(() => {
                  if (user?.relationship == 1) return <span>single</span>;
                  if (user?.relationship == 2) return <span>married</span>;
                  if (user?.relationship == 3) return <span>commited</span>;
                })()}

                <br />

                <FiEdit2
                  onClick={() => {
                    setrelation(!relation);
                  }}
                  className="edit_icon"
                  color="blue"
                />
              </div>

              {relation && (
                <>
                  <input
                    style={{ marginLeft: "8px" }}
                    onChange={(e) => {
                      handelChange(e);
                    }}
                    type="radio"
                    name="relationship"
                    value={1}
                  />
                  single
                  <input
                    style={{ marginLeft: "5px" }}
                    onChange={(e) => {
                      handelChange(e);
                    }}
                    type="radio"
                    name="relationship"
                    value={2}
                  />
                  married
                  <input
                    style={{ marginLeft: "5px" }}
                    onChange={(e) => {
                      handelChange(e);
                    }}
                    type="radio"
                    name="relationship"
                    value={3}
                  />
                  commited
                </>
              )}
            </div>
            <button onClick={handelSave} className="btn_save">
              save
            </button>
          </Box>
        </Modal>
        <br />
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user?.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user?.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {(() => {
                if (user?.relationship == 1) return <span>single</span>;
                else if (user?.relationship == 2) return <span>married</span>;
                else if( user?.relationship == 3) return <span>commited</span>;


              })()}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((element, i) => {
            console.log(element, "element");
            return <FriendList key={i} id={element} />;
          })}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {id ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
