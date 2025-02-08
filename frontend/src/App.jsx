import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Portal from "./pages/Portal";
import "./App.css";
import AuthCallback from "./pages/AuthCallback";
import Team from "./pages/Team";
import JoinTeam from "./pages/JoinTeam";
import CreateTeam from "./pages/CreateTeam";
import ProtectedStartRegistration from "./pages/ProtectedStartRegistration";
import ProtectedUserInfo from "./pages/ProtectedUserInfo";
import ProtectedResponses from "./pages/ProtectedResponses";
import ProtectedThankYou from "./pages/ProtectedThankYou";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/portal/team" element={<Team />} />
        <Route path="/portal/join-team" element={<JoinTeam />} />
        <Route path="/portal/create-team" element={<CreateTeam />} />
        <Route path="/registration" element={<ProtectedStartRegistration />} />
        <Route path="/registration/userInfo" element={<ProtectedUserInfo />} />
        <Route
          path="/registration/responses"
          element={<ProtectedResponses />}
        />
        <Route path="/registration/thankyou" element={<ProtectedThankYou />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </Router>
  );
}
