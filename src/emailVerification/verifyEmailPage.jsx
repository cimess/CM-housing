import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const token = searchParams.get("token");
if (!token) return;
  let ignore = false;

  const verify = async () => {
    try {
      await axios.get(`/api/auth/verify-email?token=${token}`);
      if (!ignore) navigate("/email-verified");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  verify();

  return () => { ignore = true };

  }, [searchParams, navigate]);

  return <p>{status}</p>;
}
