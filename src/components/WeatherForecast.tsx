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
        <div className="relative max-w-4xl mx-auto mt-10 p-8 rounded-3xl overflow-hidden">
            {/* Glass background layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/15 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl" />

            {/* Content */}
            <div className="relative z-10">
                <h2 className="text-3xl font-bold text-center mb-8 text-white tracking-wide">
                    7-Day Weather Forecast – Colombo
                </h2>

                {loading ? (
                    <div className="text-center py-6">
                        <p className="text-white/80 animate-pulse">Loading forecast data...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {forecast.map((day) => (
                            <div
                                key={day.date}
                                className="group p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-300 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                            >
                                <p className="font-semibold text-white mb-3">
                                    {new Date(day.date).toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </p>
                                <img
                                    src={day.day.condition.icon}
                                    alt={day.day.condition.text}
                                    className="w-14 h-14 mx-auto my-3 drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
                                />
                                <p className="text-xl font-bold text-blue-200 mb-1">
                                    {day.day.avgtemp_c}°C
                                </p>
                                <div className="flex justify-center gap-2 text-xs text-white/70">
                                    <span>H: {day.day.maxtemp_c}°</span>
                                    <span>•</span>
                                    <span>L: {day.day.mintemp_c}°</span>
                                </div>
                                <p className="text-sm text-white/80 mt-2">{day.day.condition.text}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default WeatherForecast;