import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EmailSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000); // wait 2 seconds before redirecting

    return () => clearTimeout(timer); // cleanup if component unmounts
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🎉 Email Verified!</h2>
      <p>You can now log in to your account.</p>
      <p style={{ fontSize: "14px", color: "gray" }}>
        Redirecting to login in 5 seconds...
      </p>
      <a href="/login" style={{ color: "blue", textDecoration: "underline" }}>
        Go to Login
      </a>
    </div>
  );
}
