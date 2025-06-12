import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Dashboard() {
    return (
        <Box
            sx={{
                flex: 1,
                p: 4,
                overflowY: 'auto',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Welcome to the Dashboard
            </Typography>
            <Typography>
               main content
            </Typography>
        </Box>
    );
}
