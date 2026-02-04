import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/UseAuth";

export default function LogoutBtn() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <button
      style={{ background: "red", color: "white" }}
      onClick={handleLogout}
    >
      Se déconnecter
    </button>
  );
}
