import { createContext, useReducer, useState } from "react";

import AuthReducer from "./AuthReducers";
import { useEffect } from "react";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    feed:[],
    isFetching:false,
    isError:false,
    alert_msg:"",
    alert_type:"",

}
export const authContext = createContext(initialState);


export const AuthProvider = ({children})=>{
    const [state, dispatch] = useReducer( AuthReducer,initialState)

return <authContext.Provider  value={{user:state.user ,isFetching:state.isFetching ,isError:state.isError ,alert_msg:state.alert_msg,alert_type:state.alert_type ,feed:state.feed , dispatch}} >
    {children}
</authContext.Provider>
}


