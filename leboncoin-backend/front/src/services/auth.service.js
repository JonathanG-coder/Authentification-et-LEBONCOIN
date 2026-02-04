import api from "../api/axios"
// Endpoints respectif a chaquu'une des routes.
// Sera appelé dans page adéquate : exemple login ou encofe registerUser.
export const registerUser = (payload) => api.post('/auth/register', payload)

export const loginUser = (payload) => api.post('/auth/login', payload)

/**
 * Déconnexion utilisateur
 * Supprime le cookie côté backend
 */
export const logoutUser = () => {
  return api.post("/auth/logout");
};

/**
 * Récupère l'utilisateur courant
 * Utile pour maintenir session après refresh
 */
export const getMe = () => {
  return api.get("/auth/me");
};