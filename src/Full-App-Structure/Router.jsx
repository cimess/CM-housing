import Body from "@/body component/homeBody";
import Login from "@/Page-component/Login";
import Default from "@/home-component/header-footer";
import Register from "@/Page-component/register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import HouseRegister from "@/Page-component/Agent";
import RecoverPassword from "@/Page-component/RecoverPassword";
import MyMessagePage from "@/Page-component/my-message-component";
import MyadvertComponent from "@/Page-component/my-advert-component";
import EmailSuccess from "@/emailVerification/Emailsuccess";
import VerifyEmailPage from "@/emailVerification/verifyEmailPage";
import { AnimatePresence, motion } from "framer-motion";
import Settings from "@/Page-component/profile";
import LoadingAnimationPage from "@/animations/loadingAnimationPage";
import HouseDetailPage from "@/shortlet/HouseDetailPage";

function AnimatedRouter() {
  const location = useLocation();

  return (
    <AnimatePresence location={location} key={location.pathname}>
      <Routes>
        <Route
          path="/"
          element={
            <Default>
              <Body />
            </Default>
          }
        />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/email-verified" element={<EmailSuccess />} />
        <Route path="/house/:id" element={<Default><HouseDetailPage />
            </Default>} />

        <Route
          path="/loading"
          element={<LoadingAnimationPage redirectTo="/" delay={2000} />}
        />
        <Route
          path="/Login"
          element={
            <Default>
              <Login />
            </Default>
          }
        />

        <Route
          path="/Register"
          element={
            <Default>
              <Register />
            </Default>
          }
        />

        <Route
          path="/HouseRegister"
          element={
            <Default>
              <HouseRegister />
            </Default>
          }
        />

        <Route
          path="/RecoverPassword"
          element={
            <Default>
              <RecoverPassword />
            </Default>
          }
        />

        <Route
          path="/MyMessagePage"
          element={
            <Default>
              <MyMessagePage />
            </Default>
          }
        />
        <Route
          path="/MyAdvertComponent"
          element={
            <Default>
              <MyadvertComponent />
            </Default>
          }
        />

        <Route
          path="/Profile"
          element={
            <Default>
              <Settings />
            </Default>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function MyApp() {
  return (
    <Router>
      <AnimatedRouter />
    </Router>
  );
}
