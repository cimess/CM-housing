import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "@/api/axios";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const token = searchParams.get("token");
    // alert(token)
    if (!token) {
      setStatus("❌ Invalid verification link");
      return;
    }

    let ignore = false;

    const verify = async () => {
      try {
        const res = await API.get(`/auth/verify-email?token=${token}`);
        if (!ignore) {

          setStatus(res.data.message );
          setTimeout(() => navigate("/email-verified"), 2000);
        }
      } catch (err) {
        console.error(err.response?.data || err.message);
        if (!ignore) setStatus("❌ Invalid or expired link");
      }
    };

    verify();
    return () => { ignore = true };
  }, [searchParams, navigate]);

  return <p>{status}</p>;
}
