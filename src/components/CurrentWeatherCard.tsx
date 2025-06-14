import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';

const API_KEY = '5a629d47155e4227a8d25517251206';

export default function CurrentWeatherCard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Colombo`)
            .then(res => setData(res.data));
    }, []);

    return (
        <Box sx={{ height: 200, minWidth: 350, p: 0.5, borderRadius: 4, backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255,255,255,0.1)',border: '1px solid #f20a29' }}>
            <Typography variant="h6">Current Weather - Colombo</Typography>
            {data && (
                <>
                    <Typography>{data.location.localtime}</Typography>
                    <Typography>🌡️ Temp: {data.current.temp_c}°C</Typography>
                    <Typography>💧 Humidity: {data.current.humidity}%</Typography>
                    <Typography>💨 Wind: {data.current.wind_kph} km/h</Typography>
                    <Typography>🔆 UV: {data.current.uv}</Typography>
                    <img src={"https:" + data.current.condition.icon} alt="weather icon" />
                </>
            )}
        </Box>
    );
}