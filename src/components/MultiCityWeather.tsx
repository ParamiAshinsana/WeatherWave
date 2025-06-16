import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
const cities = ['Colombo', 'New York', 'London', 'Tokyo', 'Sydney'];

function MultiCityWeather() {
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
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
        <div className="relative max-w-md mx-auto mt-6 p-6 rounded-2xl overflow-hidden">
            {/* Glass background layer */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl" />

            {/* Content */}
            <div className="relative z-10">
                <h2 className="text-xl font-semibold mb-6 text-center text-white">
                    World Weather
                </h2>

                {loading ? (
                    <div className="text-center py-4">
                        <p className="text-white/80 animate-pulse">Loading weather data...</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {weatherData.map(({ location, current }) => (
                            <div
                                key={location.name}
                                className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/15 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={current.condition.icon}
                                        alt={current.condition.text}
                                        className="w-10 h-10 drop-shadow-lg"
                                    />
                                    <div>
                                        <h3 className="text-sm font-medium text-white">
                                            {location.name}
                                        </h3>
                                        <p className="text-xs text-white/70">
                                            {current.condition.text}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-lg font-semibold text-blue-200">
                                    {current.temp_c}°C
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MultiCityWeather;