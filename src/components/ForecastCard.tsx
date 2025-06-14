import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';

const API_KEY = '5a629d47155e4227a8d25517251206';

export default function ForecastCard() {
    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=Colombo&days=7`)
            .then(res => setForecast(res.data.forecast.forecastday));
    }, []);

    return (
        <Box sx={{ p: 3, borderRadius: 4, backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255,255,255,0.1)' }}>
            <Typography variant="h6">7 Day Forecast</Typography>
            {forecast.map((day, index) => (
                <Box key={index}>
                    <Typography>{day.date}: {day.day.condition.text}</Typography>
                    <img src={"https:" + day.day.condition.icon} alt="icon" />
                </Box>
            ))}
        </Box>
    );
}