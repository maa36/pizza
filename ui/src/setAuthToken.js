import axios from "axios";

const setAuthToken = token => {
  if (token) {
   // Appliquer le jeton d'autorisation à chaque demande si connecté
    axios.defaults.headers.common["Authorization"] = token;
  } else {
  // Supprimer l'en-tête d'authentification
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;