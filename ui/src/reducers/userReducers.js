import { SIGNIN_USER , USER_UPDATE_SUCCESS ,
  USER_UPDATE_FAIL} from "../types";



  export const  signinReducer =(state = {}, action) =>{
  switch (action.type) {
    case SIGNIN_USER:
      return { loading: false, userInfo: action.payload };
   
    // case USER_LOGOUT:
    //   return {};
    default: return state;
  }
}
export const  userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}