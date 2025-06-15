import React, { useEffect, useState } from 'react';
import axios from 'axios';

type WeatherData = {
    location: {
        name: string;
    };
    current: {
        temp_c: number;
        humidity: number;
        wind_kph: number;
        uv: number;
        condition: {
            text: string;
            icon: string;
        };
    };
};

const API_KEY = '5a629d47155e4227a8d25517251206';

function CurrentWeather() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get<WeatherData>(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Colombo`)
            .then((res) => {
                setWeather(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching weather data:', err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-xl bg-white dark:bg-gray-800 transition-all">
            {loading ? (
                <p className="text-center text-gray-500 dark:text-gray-300">Loading...</p>
            ) : weather ? (
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                        Current Weather in {weather.location.name}
                    </h2>

                    {/* Weather Condition & Icon */}
                    <div className="flex flex-col items-center gap-1 mb-4">
                        <img src={weather.current.condition.icon}
                             alt={weather.current.condition.text}
                             className="w-16 h-16" />
                        <p className="text-gray-700 dark:text-gray-300 text-lg">
                            {weather.current.condition.text}
                        </p>
                    </div>

                    {/* Weather Metrics */}
                    <div className="flex justify-between gap-4 text-sm">
                        <div className="flex flex-col items-center">
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {weather.current.temp_c}°C
              </span>
                            <span className="text-gray-500 dark:text-gray-400">Temp</span>
                        </div>
                        <div className="flex flex-col items-center">
              <span className="font-bold text-green-600 dark:text-green-400">
                {weather.current.humidity}%
              </span>
                            <span className="text-gray-500 dark:text-gray-400">Humidity</span>
                        </div>
                        <div className="flex flex-col items-center">
              <span className="font-bold text-purple-600 dark:text-purple-400">
                {weather.current.wind_kph} km/h
              </span>
                            <span className="text-gray-500 dark:text-gray-400">Wind</span>
                        </div>
                        <div className="flex flex-col items-center">
              <span className="font-bold text-yellow-600 dark:text-yellow-400">
                {weather.current.uv}
              </span>
                            <span className="text-gray-500 dark:text-gray-400">UV</span>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-red-500">Error loading weather data.</p>
            )}
        </div>
    );
}

export default CurrentWeather;