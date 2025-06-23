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
            <div className="relative max-w-md mx-auto mt-10 p-6 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
                <div className="flex justify-center items-center py-10">
                    <ArrowPathIcon className="h-8 w-8 text-blue-300 animate-spin" />
                    <span className="ml-2 text-white">Loading weather data...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="relative max-w-md mx-auto mt-10 p-6 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
                <div className="text-center text-red-300 py-10">
                    <ExclamationTriangleIcon className="h-8 w-8 mx-auto mb-2" />
                    {error}
                </div>
            </div>
        );
    }

    if (!weather) return null;

    return (
        <div className="relative max-w-md mx-auto mt-10 p-6 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
            <div className="relative z-10">
                {/* Header with location and time */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-white flex items-center">
                        <MapPinIcon className="h-5 w-5 mr-2" />
                        Current Weather in {weather.location.name}, {weather.location.region}
                    </h2>
                    <p className="text-sm text-white/80 flex items-center mt-1">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        Updated: {formatTime(weather.current.last_updated)}
                    </p>
                </div>

                {/* Main weather display */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <img
                            src={weather.current.condition.icon}
                            alt={weather.current.condition.text}
                            className="w-24 h-24 drop-shadow-lg"
                        />
                        <div className="ml-4">
                            <p className="text-5xl font-bold text-white">
                                {weather.current.temp_c}
                                <span className="text-2xl align-top">°C</span>
                            </p>
                            <p className="text-lg text-blue-200 capitalize">
                                {weather.current.condition.text.toLowerCase()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Weather stats grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <span className="font-bold text-blue-200 text-xl">
              {weather.current.temp_c}°C
            </span>
                        <span className="text-white/80 text-sm">Temperature</span>
                    </div>
                    <div className="flex flex-col items-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <span className="font-bold text-green-200 text-xl">
              {weather.current.humidity}%
            </span>
                        <span className="text-white/80 text-sm">Humidity</span>
                    </div>
                    <div className="flex flex-col items-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <span className="font-bold text-purple-200 text-xl">
              {weather.current.wind_kph} km/h
            </span>
                        <span className="text-white/80 text-sm">Wind</span>
                    </div>
                    <div className="flex flex-col items-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <span className="font-bold text-yellow-200 text-xl">
              {weather.current.uv}
            </span>
                        <span className="text-white/80 text-sm">UV Index</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurrentWeather;