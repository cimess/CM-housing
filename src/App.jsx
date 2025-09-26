// App.jsx
import { useEffect } from "react";
import MyApp from "./Full-App-Structure/Router";
import { LoginAuth, useLoginAuth } from "./Authentication/Usecontext-logic";
import API from "./api/axios";
import { setAccessToken } from "./utils/authStore";

function AppContent() {
  const { setIsLogin } = useLoginAuth();

  useEffect(() => {
    // Try refresh on app load
    API.post("/auth/refresh-token", {}, { withCredentials: true })
      .then(res => {
        setAccessToken(res.data.accessToken);
        setIsLogin(true);
      })
      .catch(() => {
        setIsLogin(false);
      });
  }, [setIsLogin]);

  return <MyApp />;
}

function App() {
  return (
    <LoginAuth>
      <AppContent />
    </LoginAuth>
  );
}

export default App;
