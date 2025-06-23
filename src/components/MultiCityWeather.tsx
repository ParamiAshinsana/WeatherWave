import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowPathIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

type WeatherData = {
    location: {
        name: string;
    };
    current: {
        temp_c: number;
        condition: {
            text: string;
            icon: string;
        };
    };
};

const API_KEY = '5a629d47155e4227a8d25517251206';
const cities = ['Jaffna', 'Gampaha', 'Nuwara Eliya', 'Ratnapura', 'Batticaloa'];

function MultiCityWeather() {
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = () => {
        setLoading(true);
        setError(null);
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
                console.error('Error fetching weather data:', err);
                setError('Failed to load city weather data');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    return (
        <div className="w-full h-full p-4 bg-white/5 backdrop-blur-sm rounded-xl">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Global Cities</h2>
                <button
                    onClick={fetchWeather}
                    disabled={loading}
                    className="p-1 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Refresh weather data"
                >
                    <ArrowPathIcon className={`h-5 w-5 text-blue-300 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {error ? (
                <div className="h-[calc(100%-3rem)] flex flex-col items-center justify-center text-red-300">
                    <ExclamationTriangleIcon className="h-8 w-8 mb-2" />
                    <p>{error}</p>
                    <button
                        onClick={fetchWeather}
                        className="mt-4 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            ) : loading ? (
                <div className="h-[calc(100%-3rem)] grid grid-cols-1 gap-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-16 bg-white/5 rounded-lg animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="h-[calc(100%-3rem)] overflow-y-auto pr-1 space-y-3">
                    {weatherData.map(({ location, current }) => (
                        <div
                            key={location.name}
                            className="flex items-center p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer group"
                        >
                            <img
                                src={current.condition.icon}
                                alt={current.condition.text}
                                className="w-10 h-10 flex-shrink-0 drop-shadow-lg"
                            />
                            <div className="ml-3 flex-1 min-w-0">
                                <h3 className="text-sm font-medium text-white truncate">
                                    {location.name}
                                </h3>
                                <p className="text-xs text-white/70 truncate">
                                    {current.condition.text}
                                </p>
                            </div>
                            <div className="ml-2 flex items-center">
                                <span className="text-lg font-semibold text-blue-200">
                                    {current.temp_c}°
                                </span>
                                <span className="text-sm text-blue-200/80">C</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MultiCityWeather;