// LoadingPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "./LoadingAnim";

export default function LoadingPage({ redirectTo = "/", delay = 2000 }) {
  const navigate = useNavigate();

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
