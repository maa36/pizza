import { ADD_TO_CART , REMOVE_FROM_CART } from "../types";

export const addToCart = (product,qty,supplements,ingredients,size ,total) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  let alreadyExists = false;
  cartItems.forEach((x) => {
    if (x._id === product._id && x.size === size ) {
      alreadyExists = true;
      x.count = parseInt(x.count) + parseInt(qty) ;
      x.supplement = supplements ;
      x.ingredient = ingredients ;
      x.total = parseInt(x.total) + parseInt(total) ;

    }
  });
  if (!alreadyExists) {
    cartItems.push({ ...product, count: qty , supplement : supplements , ingredient : ingredients ,size : size , total : total});
  }
  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = (id, size) => (dispatch, getState) => {

  console.log(id);
  console.log(size);
  const cartItems = getState()
    .cart.cartItems.slice()
    .filter((x) =>  (x._id !== id &&x._id !== size));
  dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};