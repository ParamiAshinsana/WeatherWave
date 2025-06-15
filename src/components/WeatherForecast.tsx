import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = '5a629d47155e4227a8d25517251206';

function WeatherForecast() {
    const [forecast, setForecast] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=Colombo&days=7`)
            .then((res) => {
                setForecast(res.data.forecast.forecastday);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching forecast data:', err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
                7-Day Weather Forecast – Colombo
            </h2>

            {loading ? (
                <p className="text-center text-gray-500 dark:text-gray-300">Loading forecast...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {forecast.map((day) => (
                        <div
                            key={day.date}
                            className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-center shadow-md"
                        >
                            <p className="font-semibold text-gray-700 dark:text-white">{day.date}</p>
                            <img
                                src={day.day.condition.icon}
                                alt={day.day.condition.text}
                                className="w-12 h-12 mx-auto my-2"
                            />
                            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                {day.day.avgtemp_c}°C
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{day.day.condition.text}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WeatherForecast;
