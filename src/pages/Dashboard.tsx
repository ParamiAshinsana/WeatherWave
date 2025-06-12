import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

const API_KEY = '5a629d47155e4227a8d25517251206';

export default function Dashboard() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Colombo`)
            .then(response => {
                setWeather(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                setLoading(false);
            });
    }, []);

    return (
        <Box sx={{ flex: 1, p: 4, overflowY: 'auto', color: '#fff' }}>
            <Typography variant="h4" gutterBottom>
                Weather in Colombo
            </Typography>

            {loading ? (
                <CircularProgress sx={{ color: '#fff' }} />
            ) : weather ? (
                <Box sx={{ mt: 3, display: 'grid', gap: 2 }}>
                    <Typography>🌡️ Temperature: {weather.current.temp_c}°C</Typography>
                    <Typography>💧 Humidity: {weather.current.humidity}%</Typography>
                    <Typography>💨 Wind Speed: {weather.current.wind_kph} km/h</Typography>
                    <Typography>🔆 UV Index: {weather.current.uv}</Typography>
                </Box>
            ) : (
                <Typography>Error loading data</Typography>
            )}
        </Box>
    );
}