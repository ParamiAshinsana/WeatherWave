import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Dashboard from "./pages/Dashboard.tsx";
import CardsPage from "./pages/CardsPage.tsx";

function App(): React.ReactElement {
    return (
        <Router>
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 text-primary-text min-h-screen">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/cards" element={<CardsPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;