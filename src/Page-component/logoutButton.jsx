import API from "../api/axios";
import { useLoginAuth } from "@/Authentication/Usecontext-logic";
import { setAccessToken } from "@/utils/authStore";
import { useNavigate } from "react-router-dom";
import NavLink from "@/home-component/navigation-link-component";
export default function LogoutButton() {
  const { setIsLogin } = useLoginAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await API.post("/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // clear accessToken from memory
      setAccessToken(null);
      setIsLogin(false);
      navigate("/");
    }
  }

  return (
    <NavLink
      onClick={handleLogout}
    >
      Logout
    </NavLink>
  );
}
