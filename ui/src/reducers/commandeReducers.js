import { TYPE_COMMANDE } from "../types";

export const typeCommandeReducer = (
  state = { typeCommande: "" },
  action
) => {
  switch (action.type) {
    case TYPE_COMMANDE:
      return { typeCommande: action.payload };
    
    default:
      return state;
  }
};