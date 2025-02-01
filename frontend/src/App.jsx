import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

export default function App() {
    return (
        <BrowserRouter>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                </Routes>
            </Router>
        </BrowserRouter>
    )
}
