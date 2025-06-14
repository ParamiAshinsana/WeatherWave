import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const API_KEY = '5a629d47155e4227a8d25517251206';

export default function SummaryChartCard() {
    const [hourly, setHourly] = useState([]);

    useEffect(() => {
        axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=Colombo&days=1`)
            .then(res => setHourly(res.data.forecast.forecastday[0].hour));
    }, []);

    return (
        <Box sx={{ p: 3, borderRadius: 4, backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255,255,255,0.1)', height: 300 }}>
            <Typography variant="h6" gutterBottom>Hourly Summary</Typography>
            <ResponsiveContainer width="100%" height="85%">
                <LineChart data={hourly}>
                    <XAxis dataKey="time" tickFormatter={(t) => t.split(' ')[1]} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="temp_c" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
}