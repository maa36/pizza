import { FETCH_PLATS , DETAIL_PLAT } from "../types";
import axios from 'axios';

export const fetchPlats = () => async (dispatch) => {
  const res = await fetch("http://localhost:5000/api/plats");
  console.log(res);
  const data = await res.json();
  console.log(data);
  dispatch({
    type: FETCH_PLATS,
    payload: data,
  });
};
export const detailsPlat = (productId) => async (dispatch) => {
  
  const res = await axios.get("http://localhost:5000/api/plat/" + productId);
  console.log(res);
  const data = await res.data;
  console.log(data);
  dispatch({
    type: DETAIL_PLAT,
    payload: data,
  });
};