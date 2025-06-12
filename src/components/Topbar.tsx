import React from 'react';
import { Box, InputBase, IconButton, Avatar } from '@mui/material';
import { Search, Notifications } from '@mui/icons-material';

export default function Topbar() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                px: 3,
                py: 1,
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                boxShadow: '0 0 10px rgba(255,255,255,0.1)',
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: 2,
                    px: 2,
                }}
            >
                <Search sx={{ color: '#fff', mr: 1 }} />
                <InputBase
                    placeholder="Search..."
                    sx={{ color: '#fff', flex: 1 }}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Box>
            <IconButton sx={{ ml: 2, color: '#fff' }}>
                <Notifications />
            </IconButton>
            <IconButton sx={{ ml: 1 }}>
                <Avatar alt="User" src="https://i.pravatar.cc/300" />
            </IconButton>
        </Box>
    );
}
