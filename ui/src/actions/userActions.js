import { SIGNIN_USER , USER_UPDATE_SUCCESS ,USER_UPDATE_FAIL } from "../types";
import Cookie from 'js-cookie';
import axios from 'axios';

export const addUser = (data) => async (dispatch) => {
 
  
    dispatch({ type: SIGNIN_USER, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));

}
export const updateUser = ( userId, name, email, phone , adresse , rue ,batiment ) => async (dispatch, getState) => {
    // const { userSignin: { userInfo } } = getState();
    // const { user: { userInfo } } = getState();
console.log(userId);
    try {
      const { data } = await axios.put("http://localhost:5000/api/user/" + userId,
        { name, email, phone , adresse  , rue , batiment}
      );
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
    }
  }