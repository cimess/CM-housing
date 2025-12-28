import { Toaster } from "sonner";
import MyApp from "./Full-App-Structure/Router";
import { LoginAuth } from "./Authentication/Usecontext-logic";
import { Helmet } from "react-helmet-async";

function AppContent() {
  return <MyApp />;
}

function App() {
  return (
    <>
      <Helmet>
        <meta
          name="google-site-verification"
          content="nymCksQN4hSTLj1YLgPvWWY-B-0hB8FJTyALhhBRY-s"
        />
        <title>CM Housing</title>
        <meta
          name="description"
          content="Find verified housing, shortlets, and apartments with CM Housing."
        />
      </Helmet>

      <LoginAuth>
        <AppContent />
      </LoginAuth>

      <Toaster position="top-center" richColors closeButton />
    </>
  );
}

export default App;
