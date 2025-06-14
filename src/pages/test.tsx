// import React, { useEffect, useState } from 'react';
// import { Box, Typography, CircularProgress } from '@mui/material';
// import axios from 'axios';
//
// const API_KEY = '5a629d47155e4227a8d25517251206';
//
// export default function Dashboard() {
//     const [weather, setWeather] = useState(null);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Colombo`)
//             .then(response => {
//                 setWeather(response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching weather data:', error);
//                 setLoading(false);
//             });
//     }, []);
//
//     return (
//         <Box sx={{ flex: 1, p: 4, overflowY: 'auto', color: '#fff' }}>
//             <Typography variant="h4" gutterBottom>
//                 Weather in Colombo
//             </Typography>
//
//             {loading ? (
//                 <CircularProgress sx={{ color: '#fff' }} />
//             ) : weather ? (
//                 <Box sx={{ mt: 3, display: 'grid', gap: 2 }}>
//                     <Typography>🌡️ Temperature: {weather.current.temp_c}°C</Typography>
//                     <Typography>💧 Humidity: {weather.current.humidity}%</Typography>
//                     <Typography>💨 Wind Speed: {weather.current.wind_kph} km/h</Typography>
//                     <Typography>🔆 UV Index: {weather.current.uv}</Typography>
//                 </Box>
//             ) : (
//                 <Typography>Error loading data</Typography>
//             )}
//         </Box>
//     );
// }

// Dashboard.tsx
import React from 'react';
import { Box, Grid , Stack } from '@mui/material';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
// import MapImageCard from '../components/MapImageCard';
import PopularCitiesCard from '../components/PopularCitiesCard';
import ForecastCard from '../components/ForecastCard';
import SummaryChartCard from '../components/SummaryChartCard';

export default function Dashboard() {
    return (
        // <Box sx={{ flex: 1, p: 4, overflowY: 'auto' }}>
        //     <Grid container spacing={3}>
        //         {/* First Row: 3 columns */}
        //         <Grid item xs={12} md={4}>
        //             <CurrentWeatherCard />
        //         </Grid>
        //         <Grid item xs={12} md={4}>
        //             {/*<MapImageCard />*/}
        //         </Grid>
        //         <Grid item xs={12} md={4}>
        //             <PopularCitiesCard />
        //         </Grid>
        //
        //         {/* Second Row: 2 columns */}
        //         <Grid item xs={12} md={6}>
        //             <ForecastCard />
        //         </Grid>
        //         <Grid item xs={12} md={6}>
        //             <SummaryChartCard />
        //         </Grid>
        //     </Grid>
        // </Box>
        <Box sx={{ p: { xs: 2, sm: 3, lg: 4 } }}>
            <Grid container spacing={3}>
                {/* Left Column (Current Weather & Forecast) */}
                <Grid item xs={12} lg={4}>
                    <Stack spacing={3}>
                        <CurrentWeatherCard />
                        <ForecastCard />
                    </Stack>
                </Grid>

                {/* Right Column (Map, Popular Cities, Summary Chart) */}
                <Grid item xs={12} lg={8}>
                    <Stack spacing={3}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                {/*<MapCard />*/}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <PopularCitiesCard />
                            </Grid>
                        </Grid>
                        <SummaryChartCard />
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}

