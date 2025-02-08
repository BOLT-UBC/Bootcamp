import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import StartRegistration from "./pages/StartRegistration";
import UserInfo from "./pages/UserInfo";
import Responses from "./pages/Responses";
import Portal from "./pages/Portal";
import ThankYou from "./pages/ThankYou";
<<<<<<< HEAD
import ConceptAuth from "./pages/ConceptAuth";
import "./App.css";
=======
import AuthCallback from "./pages/AuthCallback";
>>>>>>> c50210f (merge)

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/registration" element={<StartRegistration />} />
        <Route path="/registration/userInfo" element={<UserInfo />} />
        <Route path="/registration/responses" element={<Responses />} />
        <Route path="/registration/thankyou" element={<ThankYou />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </Router>
  );
}
