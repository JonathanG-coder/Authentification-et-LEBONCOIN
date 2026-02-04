import { createContext, useState, useEffect } from "react";
import { logoutUser, getMe as getMeService } from "../services/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  /**
   * Récupérer l'utilisateur connecté
   * Utilise le service centralisé auth.service.js
   */
  const getMe = async () => {
    try {
      const res = await getMeService();
      if (res.status === 200) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Erreur getMe :", err);
      setUser(null);
    }
  };

  /**
   * useEffect pour récupérer l'utilisateur au chargement de l'application
   * ⚡ La fonction async est encapsulée pour éviter l'erreur React 18
   */
  useEffect(() => {
    const fetchUser = async () => {
      await getMe();
    };
    fetchUser();
  }, []);

  /**
   * Logout : supprime le cookie côté backend et vide l'état user côté frontend
   */
  const logout = async () => {
    try {
      await logoutUser(); // supprime le cookie sur le backend
      setUser(null);      // vide l'état côté frontend
    } catch (err) {
      console.error("Erreur logout :", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, getMe }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
