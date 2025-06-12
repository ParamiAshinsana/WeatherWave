import React from 'react';
import { Box, List, ListItemButton, ListItemIcon } from '@mui/material';
import { Home, BarChart, Settings } from '@mui/icons-material';

const sidebarItems = [
    { icon: <Home /> },
    { icon: <BarChart /> },
    { icon: <Settings /> },
];

export default function Sidebar() {
    return (
        <Box
            sx={{
                width: 150,
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                boxShadow: '0 0 15px rgba(255,255,255,0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 2,
            }}
        >
            <Box sx={{ mb: 3, fontWeight: 'bold', fontSize: 24, letterSpacing: 1, color: '#fff' }}>
                WeatheWave
            </Box>
            <List>
                {sidebarItems.map(({ icon }, index) => (
                    <ListItemButton
                        key={index}
                        sx={{ mb: 1, borderRadius: 2, justifyContent: 'center' }}
                    >
                        <ListItemIcon sx={{ color: '#fff', minWidth: 'auto' }}>
                            {icon}
                        </ListItemIcon>
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
}
