import React from 'react'
import "./online.css"
const Online = ({item, i}) => {
  const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER
  return (
  <>


<li className="rightbaronlineFriend">
            <div className="rightbarOnlineUserProfile">
              <img className='rightbarOnlineUserPic' src={item.profilePicture} />
              <span className='rightbarOnlineIcon'></span>


            </div>
            <span className='rightbarOnlineUserName'>{item.username}</span>

          </li>

  </>
  )
}

export default Online


