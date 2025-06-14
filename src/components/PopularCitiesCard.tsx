import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';

const API_KEY = '5a629d47155e4227a8d25517251206';
const cities = ['London', 'Tokyo', 'New York', 'Paris', 'Mumbai'];

export default function PopularCitiesCard() {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        Promise.all(cities.map(city =>
            axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
        )).then(responses => setWeatherData(responses.map(r => r.data)));
    }, []);

    return (
        <Box sx={{ p: 3, borderRadius: 4, backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255,255,255,0.1)' }}>
            <Typography variant="h6">Popular Cities</Typography>
            {weatherData.map((city, index) => (
                <Box key={index} sx={{ mt: 1 }}>
                    <Typography>{city.location.name}: {city.current.condition.text}</Typography>
                    <img src={"https:" + city.current.condition.icon} alt="weather icon" />
                </Box>
            ))}
        </Box>
    );
}