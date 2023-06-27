export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});
export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload:user
});
export const Register_Success = () => ({
  type: "REGISTER_SUCCESS"

});
export const LoginFailure = () => ({
  type: "LOGIN_FALUIRE",
});
export const Stop_fetching = (msg) => ({
  type: "STOP_FETCHING",
  payload:msg
})
export const UpdateDetails = (data) => ({
  type: "UPDATE_DETAILS",
  payload:data
})
export const Feed = (data) => ({
  type: "GET_FEED",
  payload:data
})
