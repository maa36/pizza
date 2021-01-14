import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { platReducer , productDetailsReducer} from "./reducers/platReducers";
import { cartReducer } from "./reducers/cartReducers";
import { signinReducer ,userUpdateReducer } from "./reducers/userReducers"; 
import { orderReducer } from "./reducers/orderReducers"; 
import  {typeCommandeReducer} from "./reducers/commandeReducers"
import Cookie from 'js-cookie';

// const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const userInfo = Cookie.getJSON('userInfo') || null;
const typeCommande = Cookie.getJSON('typeCommande') || "";
const order = Cookie.getJSON('order') || null;


const initialState = {
  commande : {typeCommande},
  user: { userInfo },
  order : {order}
};
const store = createStore(
  combineReducers({
    plats: platReducer,
     plat: productDetailsReducer,
     cart: cartReducer,
     user : signinReducer,
     commande :typeCommandeReducer,
     userUpdate: userUpdateReducer,
     order : orderReducer
      }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;