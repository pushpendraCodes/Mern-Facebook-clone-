import React, { useContext, useEffect, useState } from "react";
import "./feed.css";
import Share from "../Share/Share";
import Post from "../Post/Post";

import axios from "axios";
import { authContext } from "../../AuthContext/AuthContext";

const Feed = ({ id }) => {


  let url = import.meta.env.VITE_APP_API_URL;
  const { dispatch } = useContext(authContext);
  const [Posts, setpost] = useState([]);

  let userId = JSON.parse(localStorage.getItem("user_id"));



  // get feed function
  let get_feed = async () => {
    if (id) {
      try {
        let res = await axios.post(
          `${url}/api/posts/timeline/user`,

          {
            userId: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: JSON.parse(localStorage.getItem("token")),
            },
          }
        );
        if (res.status === 200) {
          console.log(res.data, "post1");
          dispatch({ type: "GET_FEED", payload: res.data });

          setpost(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        let res = await axios.post(`${url}/api/posts/timeline/all`, {
          userId: userId,
        }
        ,
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("token")),
            },
          }
        );
        if (res.status === 200) {
          console.log(res.data, "post2");
          dispatch({ type: "GET_FEED", payload: res.data });

          setpost(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    get_feed();
  }, [id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {!id && <Share />}

        {Posts.map((item, i) => {
          return (
            <Post
              get_feed={get_feed}
              user_id={item.userId}
              key={i}
              post={item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Feed;
