import { Bookmark, Event, Group, Groups, HelpOutline, QuestionAnswer, RssFeed, School, VideoCall, WorkOutline } from '@mui/icons-material'
import React from 'react'
import "./leftbar.css"
// import { RssFeed } from '@mui/icons-material'
import { Users } from '../../dummyData'
const Leftbar = () => {
    return (
        <div className='leftbar'>
            <div className="leftbarwrapper">
                <ul className="leftbarlist">
                    <li className="leftbarItem">
                        <RssFeed className='leftbarIcon' />
                        <span>Feed</span>
                    </li>
                    <li className="leftbarItem">
                        <VideoCall className='leftbarIcon' />
                        <span>Video </span>
                    </li>
                    <li className="leftbarItem">
                        <Groups className='leftbarIcon' />
                        <span>Groups </span>
                    </li>
                    <li className="leftbarItem">
                        <QuestionAnswer className='leftbarIcon' />
                        <span>Questions </span>
                    </li>
                    <li className="leftbarItem">
                        <Bookmark className='leftbarIcon' />
                        <span>Bookmarks</span>
                    </li>
                    <li className="leftbarItem">
                        <WorkOutline className='leftbarIcon' />
                        <span>Jobs</span>
                    </li>
                    <li className="leftbarItem">
                        <Event className='leftbarIcon' />
                        <span>Events</span>
                    </li>
                    <li className="leftbarItem">
                        <School className='leftbarIcon' />
                        <span>Courses</span>
                    </li>
                    <li className="leftbarItem">
                        <RssFeed className='leftbarIcon' />
                        <span>Feed</span>
                    </li>
                </ul>

                <button className='leftbarButton'>Show More</button>
                <hr className='left_hr' />

                <ul className="left_frindList">

                    {
                        Users.map((item, i) => {

                            return (
                                <li className="left_friends">
                                    <img className='leftbarImg' src={item.profilePicture || `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png` } alt="" />
                                    <span className='leftbar_frinds_name'>{item.username}</span>


                                </li>

                            )
                        })
                    }


                </ul>


            </div>

        </div>
    )
}

export default Leftbar
