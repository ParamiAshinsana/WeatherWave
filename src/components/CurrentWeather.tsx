import React, { useEffect, useState } from 'react';
import axios from 'axios';

type CurrentWeatherProps = {
    city: string;
};
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

function CurrentWeather({ city }: CurrentWeatherProps) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get<WeatherData>(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
            .then((res) => {
                setWeather(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching weather data:', err);
                setWeather(null);
                setLoading(false);
            });
    }, [city]);

    return (
        <div className="relative max-w-md mx-auto mt-10 p-6 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl" />
            <div className="relative z-10">
                {loading ? (
                    <p className="text-center text-white">Loading...</p>
                ) : weather ? (
                    <div className="text-center">
                        <h2 className="text-xl font-semibold mb-2 text-white">
                            Current Weather in {weather.location.name}
                        </h2>

                        <div className="flex flex-col items-center gap-1 mb-4">
                            <img
                                src={weather.current.condition.icon}
                                alt={weather.current.condition.text}
                                className="w-16 h-16 drop-shadow-lg"
                            />
                            <p className="text-white text-lg font-medium">
                                {weather.current.condition.text}
                            </p>
                        </div>

                        <div className="grid grid-cols-4 gap-4 text-sm">
                            <div className="flex flex-col items-center bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                                <span className="font-bold text-blue-200">
                                    {weather.current.temp_c}°C
                                </span>
                                <span className="text-white/80">Temp</span>
                            </div>
                            <div className="flex flex-col items-center bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                                <span className="font-bold text-green-200">
                                    {weather.current.humidity}%
                                </span>
                                <span className="text-white/80">Humidity</span>
                            </div>
                            <div className="flex flex-col items-center bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                                <span className="font-bold text-purple-200">
                                    {weather.current.wind_kph} km/h
                                </span>
                                <span className="text-white/80">Wind</span>
                            </div>
                            <div className="flex flex-col items-center bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                                <span className="font-bold text-yellow-200">
                                    {weather.current.uv}
                                </span>
                                <span className="text-white/80">UV</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-red-300">Error loading weather data.</p>
                )}
            </div>
        </div>
    );
}

export default CurrentWeather;