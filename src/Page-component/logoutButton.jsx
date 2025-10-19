import { useNavigate } from "react-router-dom";
import { useLoginAuth } from "@/Authentication/Usecontext-logic";
export default function LogoutButton() {

  const { logout } = useLoginAuth(); // ✅ call context's logout
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout(); // context handles API call, token clearing, etc.
      navigate("/loading", { state: { redirectTo: "/" } });
    } catch (err) {
      console.error("Logout error:", err);
    }
  }

  return (
    <button
      className="hover-bg text-center no-underline"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
