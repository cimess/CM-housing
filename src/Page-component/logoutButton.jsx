// import {useNavigate } from "react-router-dom";
// import {useLoginAuth} from "@/Authentication/Usecontext-logic";
// import API from "@/api/axios"; // ✅ import your axios instance
// import { setAccessToken } from "@/utils/authStore"; // ✅ import your auth helper

// export default function LogoutButton() {
//   const { setIsLogin } = useLoginAuth();
//   const navigate = useNavigate();

//   async function handleLogout() {
//     try {
//       await API.post("/auth/logout", {}, { withCredentials: true });

//     } catch (err) {
//       console.error("Logout error:", err);
//     } finally {
//       setAccessToken(null);
//       setIsLogin(false);
//     navigate("/loading", { state: { redirectTo: "/" } })
//     }
//   }

//   return (
//     <button
//       className="hover-bg text-center no-underline"
//       onClick={handleLogout}
//     >
//       Logout
//     </button>
//   );
// }

import { useNavigate } from "react-router-dom";
import { useLoginAuth } from "@/Authentication/Usecontext-logic";
import { useAxiosAuth } from "@/Authentication/useAxiosAuth";
export default function LogoutButton() {
  useAxiosAuth()
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
