import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { getMe, logoutUser } from "../services/auth.service";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await logoutUser(); // suppression cookie backend
    } catch (error) {
      // on ne bloque pas la déconnexion côté UI
      console.warn("Logout backend échoué", error);
    } finally {
      setUser(null); // nettoyage état frontend
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
