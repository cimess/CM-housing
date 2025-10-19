import { Toaster } from "sonner";
import MyApp from "./Full-App-Structure/Router";
import { LoginAuth } from "./Authentication/Usecontext-logic";


function AppContent() {

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

