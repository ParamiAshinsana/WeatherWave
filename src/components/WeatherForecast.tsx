import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowPathIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

const API_KEY = '5a629d47155e4227a8d25517251206';

interface ForecastDay {
    date: string;
    day: {
        condition: {
            text: string;
            icon: string;
        };
        avgtemp_c: number;
        maxtemp_c: number;
        mintemp_c: number;
    };
}

interface WeatherApiResponse {
    forecast: {
        forecastday: ForecastDay[];
    };
}

function WeatherForecast({ city = "Colombo" }: { city?: string }) {
    const [forecast, setForecast] = useState<ForecastDay[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchForecast = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get<WeatherApiResponse>(
                `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`
            );
            setForecast(response.data.forecast.forecastday);
        } catch (err) {
            console.error('Error fetching forecast:', err);
            setError('Failed to load forecast data');
            // Mock data for demonstration
            setForecast(Array.from({ length: 7 }, (_, i) => ({
                date: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
                day: {
                    condition: {
                        text: ['Sunny', 'Partly Cloudy', 'Rainy'][Math.floor(Math.random() * 3)],
                        icon: '//cdn.weatherapi.com/weather/64x64/day/113.png'
                    },
                    avgtemp_c: Math.round(25 + Math.random() * 5),
                    maxtemp_c: Math.round(28 + Math.random() * 5),
                    mintemp_c: Math.round(22 + Math.random() * 3)
                }
            })));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchForecast();
    }, [city]);

    return (
        <div className="w-full h-full p-4 bg-white/5 backdrop-blur-sm rounded-xl">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">7-Day Forecast - {city}</h2>
                <button
                    onClick={fetchForecast}
                    disabled={loading}
                    className="p-1 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Refresh forecast"
                >
                    <ArrowPathIcon className={`h-5 w-5 text-blue-300 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-900/30 rounded-lg flex items-center space-x-2">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-300" />
                    <span className="text-red-300 text-sm">{error}</span>
                </div>
            )}

            {loading ? (
                <div className="space-y-3">
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className="h-16 bg-white/5 rounded-lg animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="space-y-3">
                    {forecast.map((day) => (
                        <div
                            key={day.date}
                            className="flex items-center p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                        >
                            <div className="w-24 flex-shrink-0">
                                <p className="text-sm font-medium text-white">
                                    {new Date(day.date).toLocaleDateString('en-US', {
                                        weekday: 'short'
                                    })}
                                </p>
                                <p className="text-xs text-white/60">
                                    {new Date(day.date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>

                            <div className="flex items-center flex-1 min-w-0">
                                <img
                                    src={day.day.condition.icon}
                                    alt={day.day.condition.text}
                                    className="w-10 h-10 flex-shrink-0 mr-3 drop-shadow-lg"
                                />
                                <p className="text-sm text-white/80 truncate">
                                    {day.day.condition.text}
                                </p>
                            </div>

                            <div className="flex items-center space-x-4 ml-2">
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-blue-200">
                                        {day.day.maxtemp_c}°
                                    </p>
                                    <p className="text-xs text-white/60">
                                        High
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-blue-100">
                                        {day.day.avgtemp_c}°
                                    </p>
                                    <p className="text-xs text-white/60">
                                        Avg
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-blue-300">
                                        {day.day.mintemp_c}°
                                    </p>
                                    <p className="text-xs text-white/60">
                                        Low
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WeatherForecast;