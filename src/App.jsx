

import { Toaster } from "sonner";
import MyApp from "./Full-App-Structure/Router";
import { LoginAuth } from "./Authentication/Usecontext-logic";
import { useAxiosAuth } from "./Authentication/useAxiosAuth";

function AppContent() {
  useAxiosAuth(); // hooks up Axios interceptors with accessToken from context
  return <MyApp />;
}

function App() {
  return (
    <>
    <LoginAuth>
      <AppContent />
    </LoginAuth>
    <Toaster
        position="top-center"
        richColors
        closeButton
      />
    </>
  );
}

export default App;

