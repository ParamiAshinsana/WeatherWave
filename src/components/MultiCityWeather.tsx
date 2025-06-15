import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = '5a629d47155e4227a8d25517251206';
const cities = ['Colombo', 'New York', 'London', 'Tokyo', 'Sydney'];

function MultiCityWeather() {
    const [weatherData, setWeatherData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all(
            cities.map((city) =>
                axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
            )
        )
            .then((responses) => {
                setWeatherData(responses.map((res) => res.data));
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching multiple cities weather:', err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="max-w-md mx-auto mt-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
                World Weather
            </h2>

            {loading ? (
                <p className="text-center text-sm text-gray-500 dark:text-gray-300">Loading...</p>
            ) : (
                <div className="space-y-3">
                    {weatherData.map(({ location, current }) => (
                        <div
                            key={location.name}
                            className="flex items-center justify-between p-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={current.condition.icon}
                                    alt={current.condition.text}
                                    className="w-8 h-8"
                                />
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 dark:text-white">
                                        {location.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {current.condition.text}
                                    </p>
                                </div>
                            </div>
                            <p className="text-base font-semibold text-blue-600 dark:text-blue-400">
                                {current.temp_c}°C
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MultiCityWeather;