import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StartRegistration from './pages/StartRegistration';
import UserInfo from './pages/UserInfo';
import Responses from './pages/Responses';
import Team from './pages/Team';
import Portal from './pages/Portal';
import ThankYou from './pages/ThankYou';
import ConceptAuth from './pages/ConceptAuth';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/portal" element={<Portal />} />
                <Route path="/registration" element={<StartRegistration />} />
                <Route path="/registration/userInfo" element={<UserInfo />} />
                <Route path="/registration/responses" element={<Responses />} />
                <Route path="/registration/team" element={<Team />} />
                <Route path="/registration/thankyou" element={<ThankYou />} />
                <Route path="/authtest" element={<ConceptAuth />} />
            </Routes>
        </Router>
    )
}
