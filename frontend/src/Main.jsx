import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);