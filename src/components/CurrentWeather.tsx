import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    ArrowPathIcon,
    ExclamationTriangleIcon,
    MapPinIcon,
    ClockIcon
} from '@heroicons/react/24/solid';

type CurrentWeatherProps = {
    city: string;
};

type WeatherData = {
    location: {
        name: string;
        region: string;
        localtime: string;
    };
    current: {
        temp_c: number;
        humidity: number;
        wind_kph: number;
        uv: number;
        pressure_mb: number;
        condition: {
            text: string;
            icon: string;
        };
        last_updated: string;
    };
};

const API_KEY = '5a629d47155e4227a8d25517251206';

function CurrentWeather({ city }: CurrentWeatherProps) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get<WeatherData>(
                    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
                );
                setWeather(response.data);
            } catch (err) {
                console.error('Error fetching weather data:', err);
                setError('Failed to fetch weather data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city]);

    const formatTime = (timeString: string) => {
        return new Date(timeString).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="h-full w-full flex justify-center items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl">
                <div className="flex flex-col items-center">
                    <ArrowPathIcon className="h-8 w-8 text-blue-300 animate-spin mb-2" />
                    <span className="text-white/80">Loading weather data...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-full w-full flex justify-center items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl">
                <div className="flex flex-col items-center text-red-300">
                    <ExclamationTriangleIcon className="h-8 w-8 mb-2" />
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!weather) return null;

    return (
        <div className="h-full w-full p-4 bg-white/5 backdrop-blur-sm rounded-xl">
            {/* Header with location and time */}
            <div className="mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center">
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    {weather.location.name}, {weather.location.region}
                </h2>
                <p className="text-xs sm:text-sm text-white/60 flex items-center mt-1">
                    <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    Updated: {formatTime(weather.current.last_updated)}
                </p>
            </div>

            {/* Main weather display */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
                <div className="flex items-center">
                    <img
                        src={weather.current.condition.icon}
                        alt={weather.current.condition.text}
                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 drop-shadow-lg"
                    />
                    <div className="ml-2 sm:ml-4">
                        <p className="text-4xl sm:text-5xl font-bold text-white">
                            {weather.current.temp_c}
                            <span className="text-xl sm:text-2xl align-top">°C</span>
                        </p>
                        <p className="text-sm sm:text-base text-blue-200 capitalize">
                            {weather.current.condition.text.toLowerCase()}
                        </p>
                    </div>
                </div>
            </div>

            {/* Weather stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                <div className="flex flex-col items-center bg-white/5 rounded-lg p-2 sm:p-3">
                    <span className="font-bold text-blue-200 text-lg sm:text-xl">
                        {weather.current.temp_c}°C
                    </span>
                    <span className="text-white/60 text-xs sm:text-sm">Temperature</span>
                </div>
                <div className="flex flex-col items-center bg-white/5 rounded-lg p-2 sm:p-3">
                    <span className="font-bold text-green-200 text-lg sm:text-xl">
                        {weather.current.humidity}%
                    </span>
                    <span className="text-white/60 text-xs sm:text-sm">Humidity</span>
                </div>
                <div className="flex flex-col items-center bg-white/5 rounded-lg p-2 sm:p-3">
                    <span className="font-bold text-purple-200 text-lg sm:text-xl">
                        {weather.current.wind_kph} km/h
                    </span>
                    <span className="text-white/60 text-xs sm:text-sm">Wind</span>
                </div>
                <div className="flex flex-col items-center bg-white/5 rounded-lg p-2 sm:p-3">
                    <span className="font-bold text-yellow-200 text-lg sm:text-xl">
                        {weather.current.uv}
                    </span>
                    <span className="text-white/60 text-xs sm:text-sm">UV Index</span>
                </div>
            </div>
        </div>
    );
}

export default CurrentWeather;