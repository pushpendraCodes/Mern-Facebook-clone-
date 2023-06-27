const AuthReducer = (state, action)=>{

    switch (action.type){

        case "LOGIN_START":{
            return {
                user:null,
                isFetching:true,
                isError:false
            }
        }
        case "LOGIN_SUCCESS":{
            return {
                user:action.payload,
                isFetching:false,
                isError:false,
                alert_msg:"success",
                alert_type:"success"
            }
        }
        case "REGISTER_SUCCESS":{
            return {

                isFetching:false,
                isError:false,
                alert_msg:"successfully registerd",
                alert_type:"success"
            }
        }
        case "LOGIN_FALUIRE":{
            return {
                user:null,
                isFetching:false,
                isError:true,
                alert_msg:"some error accured",
                alert_type:"error"

            }
        }
        case "STOP_FETCHING":{
            return {
                user:null,
                isFetching:false,
                isError:false,
                alert_msg:action.payload,
                alert_type:"warning"
            }
        }
        case "UPDATE_DETAILS":{
            return {
                user:action.payload,
                isFetching:false,
                isError:false,

            }
        }
        case "GET_FEED":{
            return {
                feed:action.payload,
                isFetching:false,
                isError:false,

            }
        }

    }
}
export default AuthReducer;