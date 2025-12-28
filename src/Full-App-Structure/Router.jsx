import { Suspense, lazy } from "react";
import Default from "@/home-component/header-footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LoadingAnimationPage from "@/animations/loadingAnimationPage";
import LoadingAnimation from "@/animations/LoadingAnim";

// Lazy load page components
const Body = lazy(() => import("@/body component/homeBody"));
const Login = lazy(() => import("@/Page-component/Login"));
const Register = lazy(() => import("@/Page-component/register"));
const HouseRegister = lazy(() => import("@/Page-component/Agent"));
const RecoverPassword = lazy(() => import("@/Page-component/RecoverPassword"));
const MyMessagePage = lazy(() => import("@/Page-component/my-message-component"));
const MyadvertComponent = lazy(() => import("@/Page-component/my-advert-component"));
const EmailSuccess = lazy(() => import("@/emailVerification/Emailsuccess"));
const VerifyEmailPage = lazy(() => import("@/emailVerification/verifyEmailPage"));
const Settings = lazy(() => import("@/Page-component/profile"));
const HouseDetailPage = lazy(() => import("@/shortlet/HouseDetailPage"));
const ResetPassword = lazy(() => import("@/Page-component/ResetPassword"));
const ResetPasswordWithoutLogin = lazy(() => import("@/Page-component/resetPasswordWithoutlogin"));

// Admin Router
const AdminRouter = lazy(() => import("@/admin/AdminRouter").then(module => ({ default: module.AdminRouter })));

function AnimatedRouter() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingAnimation />}>
        <Routes location={location} key={location.pathname}>
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
          <Route path="/house/:id" element={<Default><HouseDetailPage /></Default>} />

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
            path="/ResetPassword"
            element={
              <Default>
                <ResetPassword />
              </Default>
            }
          />
           <Route
            path="/reset-password"
            element={
              <Default>
                <ResetPasswordWithoutLogin />
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

          {/* Admin Route - No Default Layout */}
          <Route path="/cimessadmin/*" element={<AdminRouter />} />

        </Routes>
      </Suspense>
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
