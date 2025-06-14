// import React from 'react';
// import { Box } from '@mui/material';
// import Sidebar from './components/Sidebar.tsx';
// import Header from './components/Topbar.tsx';
// import Dashboard from './pages/Dashboard.tsx';
//
// function App() {
//     return (
//         <Box
//             sx={{
//                 height: '100vh',
//                 display: 'flex',
//                 // background: 'linear-gradient(135deg, #6B9DFE 0%, #3B5BDB 100%)',
//                 background: 'linear-gradient(to bottom right, #0f172a, #1e3a8a, #1e1b4b)',
//                 color: '#fff',
//                 overflow: 'hidden',
//             }}
//         >
//             <Sidebar />
//             <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//                 <Header />
//                 <Dashboard />
//             </Box>
//         </Box>
//     );
// }
//
// export default App;


import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import Header from './components/Topbar';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                background: 'linear-gradient(to bottom right, #0f172a, #1e3a8a, #1e1b4b)',
                color: '#fff',
                overflow: 'hidden',
            }}
        >
            {/* Sidebar Navigation */}
            <Sidebar />

            {/* Main Content Area */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' ,border: '1px solid #f5e902'}}>
                <Header />
                <Box component="main" sx={{ flex: 1, overflowY: 'auto', p: 2 ,border: '1px solid #f5e902'}}>
                    <Dashboard />
                </Box>
            </Box>
        </Box>
    );
}

export default App;


