import { CREATE_ORDER , FETCH_ORDERS } from "../types";
import axios from 'axios';
import Cookie from 'js-cookie';



export const createOrder = (order) => async (dispatch) => {
  console.log(order);
  try {
    const { data } = await axios.post("http://localhost:5000/api/orders",
      order
    );
  Cookie.set('order', JSON.stringify(data));
    dispatch({ type: CREATE_ORDER, payload: data });
    localStorage.clear("cartItems");

  } catch (error) {
    console.log("erreur");
  }
  
   
};
export const fetchOrders = () => (dispatch) => {
  fetch("http://localhost:5000/api/orders")
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: FETCH_ORDERS, payload: data });
    });
};