import { TYPE_COMMANDE } from "../types";
import Cookie from 'js-cookie';


export const addType = (type) => (dispatch, getState) => {
//   const typeCommande = getState().commande.typeCommande;
//    console.log(typeCommande);
  
  dispatch({
    type: TYPE_COMMANDE,
    payload: { type },
  });
  Cookie.set('typeCommande', JSON.stringify(type));

//   localStorage.setItem("typeCommande", JSON.stringify(typeCommande));
};