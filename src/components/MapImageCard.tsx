import React from 'react';
import { Box } from '@mui/material';

export default function MapImageCard() {
    const mapUrl =
        'https://maps.googleapis.com/maps/api/staticmap?center=Colombo,Sri+Lanka&zoom=10&size=600x300&key= AIzaSyAGKuE_Jpa-lFDy5A_udmam2cd0WbM32Sc';

    return (
        <Box
            sx={{
                // p: 3,
                borderRadius: 4,
                // backdropFilter: 'blur(10px)',
                // backgroundColor: 'rgba(255,255,255,0.1)',
                // height: 100,
                // minWidth: 150,

            }}
        >
            {/*<Typography variant="h6" sx={{ mb: 2 }}>*/}
            {/*    Map of Colombo*/}
            {/*</Typography>*/}
            <img
                src={mapUrl}
                alt="Map of Colombo"
                style={{  height: 200,  width: '100%', borderRadius: '12px' }}
            />
        </Box>
    );
}
