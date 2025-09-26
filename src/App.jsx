// App.jsx
import { useEffect } from "react";
import MyApp from "./Full-App-Structure/Router";
import { LoginAuth, useLoginAuth } from "./Authentication/Usecontext-logic";
import API from "./api/axios";
import { setAccessToken } from "./utils/authStore";

function AppContent() {
  const { setIsLogin } = useLoginAuth();

useEffect(() => {
  let ignore = false;

  API.post("/auth/refresh-token", {}, { withCredentials: true })
    .then(res => {
      if (!ignore) {
        setAccessToken(res.data.accessToken);
        setIsLogin(true);
      }
    })
    .catch(() => {
      if (!ignore) setIsLogin(false);
    });

  return () => { ignore = true }; // cleanup
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
