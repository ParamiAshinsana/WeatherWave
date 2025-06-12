import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar.tsx';
import Header from './components/Topbar.tsx';
import Dashboard from './pages/Dashboard.tsx';

function App() {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                // background: 'linear-gradient(135deg, #6B9DFE 0%, #3B5BDB 100%)',
                background: 'linear-gradient(to bottom right, #0f172a, #1e3a8a, #1e1b4b)',
                color: '#fff',
                overflow: 'hidden',
            }}
        >
            <Sidebar />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Header />
                <Dashboard />
            </Box>
        </Box>
    );
}

export default App;
