import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from 'recharts';

const API_KEY = '5a629d47155e4227a8d25517251206';

function CustomDot(props: any) {
    const { cx, cy, stroke } = props;
    return (
        <circle
            cx={cx}
            cy={cy}
            r={6}
            stroke={stroke}
            strokeWidth={2}
            fill="#3b82f6"
            style={{
                filter: 'drop-shadow(0 0 5px rgba(59,130,246,0.7))',
                cursor: 'pointer',
                transition: 'r 0.3s ease',
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as SVGCircleElement).setAttribute('r', '9');
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as SVGCircleElement).setAttribute('r', '6');
            }}
        />
    );
}

export default function HourlyWeatherChart() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(
                `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=Colombo&days=1`
            )
            .then((res) => {
                const hourly = res.data.forecast.forecastday[0].hour.map(
                    (hourData: any) => ({
                        time: hourData.time.split(' ')[1].slice(0, 5), // HH:MM
                        temp_c: hourData.temp_c,
                        condition: hourData.condition.text,
                    })
                );
                setData(hourly);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching hourly forecast:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <p className="text-center text-gray-500 dark:text-gray-300 mt-10 animate-pulse">
                Loading hourly weather chart...
            </p>
        );
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-3xl shadow-2xl">
            <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700 dark:text-blue-400 tracking-wide">
                Hourly Temperature — Colombo
            </h2>

            <ResponsiveContainer width="100%" height={350}>
                <LineChart
                    data={data}
                    margin={{ top: 30, right: 40, left: 20, bottom: 5 }}
                >
                    <defs>
                        <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2} />
                        </linearGradient>
                        <filter
                            id="glow"
                            height="200%"
                            width="200%"
                            x="-50%"
                            y="-50%"
                        >
                            <feDropShadow
                                dx="0"
                                dy="0"
                                stdDeviation="3"
                                floodColor="#3b82f6"
                                floodOpacity="0.7"
                            />
                        </filter>
                    </defs>

                    <CartesianGrid strokeDasharray="4 4" stroke="#cbd5e1" />

                    <XAxis
                        dataKey="time"
                        stroke="#2563eb"
                        tick={{ fill: '#2563eb', fontWeight: '600' }}
                        tickLine={false}
                        axisLine={{ stroke: '#2563eb' }}
                        interval={2}
                        padding={{ left: 10, right: 10 }}
                        style={{ userSelect: 'none' }}
                    />

                    <YAxis
                        stroke="#2563eb"
                        tick={{ fill: '#2563eb', fontWeight: '600' }}
                        axisLine={{ stroke: '#2563eb' }}
                        unit="°C"
                        domain={['dataMin - 2', 'dataMax + 2']}
                        style={{ userSelect: 'none' }}
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1e40af',
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.7)',
                        }}
                        labelStyle={{ color: '#bfdbfe', fontWeight: '700' }}
                        itemStyle={{ color: '#93c5fd', fontWeight: '600' }}
                        cursor={{ stroke: '#3b82f6', strokeWidth: 2 }}
                    />

                    <Line
                        type="monotone"
                        dataKey="temp_c"
                        stroke="url(#tempGradient)"
                        strokeWidth={4}
                        dot={<CustomDot />}
                        activeDot={{ r: 10, filter: 'drop-shadow(0 0 8px #3b82f6)' }}
                        filter="url(#glow)"
                        animationDuration={1200}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
