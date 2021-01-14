import {
    FETCH_PLATS, DETAIL_PLAT
  } from "../types";

  export const platReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_PLATS:
      return { state: action.payload };
    default:
      return state;
  }
};

export const  productDetailsReducer = (state = {  }, action) =>{
  switch (action.type) {
    case DETAIL_PLAT:
  return { detailproduct: action.payload };
default:
  return state;
  }
}