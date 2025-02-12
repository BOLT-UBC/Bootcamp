import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProtectedPortal from "./pages/ProtectedPortal";
import "./App.css";
import Team from "./pages/Team";
import JoinTeam from "./pages/JoinTeam";
import CreateTeam from "./pages/CreateTeam";
import AuthCallback from "./pages/AuthCallback";
import LoginPage from "./pages/LoginPage";
import ProtectedStartRegistration from "./pages/ProtectedStartRegistration";
import ProtectedUserInfo from "./pages/ProtectedUserInfo";
import ProtectedResponses from "./pages/ProtectedResponses";
import ProtectedThankYou from "./pages/ProtectedThankYou";
import ProtectedFinalPage from "./pages/ProtectedFinalPage";
import FinalPage from "./pages/FinalPage"
import Portal from "./pages/Portal";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/portal" element={<ProtectedPortal />} />
        <Route path="/registration" element={<ProtectedStartRegistration />} />
        <Route path="/registration/page-1" element={<ProtectedUserInfo />} />
        <Route path="/registration/page-2" element={<ProtectedResponses />} />
        <Route path="/registration/page-3" element={<ProtectedFinalPage />} />
        <Route path="/registration/page-4" element={<ProtectedThankYou />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </Router>
  );
}
