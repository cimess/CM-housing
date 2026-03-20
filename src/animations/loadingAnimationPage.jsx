// LoadingPage.jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingAnimation from "./LoadingAnim";

export default function LoadingPage({ redirectTo: defaultRedirectTo = "/", delay = 2000 }) {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || defaultRedirectTo;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(redirectTo);
    }, delay);

    return () => clearTimeout(timer);
  }, [navigate, redirectTo, delay]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f9f9f9",
      }}
    >
      <LoadingAnimation />
    </div>
  );
}
