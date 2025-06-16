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
                transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as SVGCircleElement).setAttribute('r', '9');
                (e.currentTarget as SVGCircleElement).style.filter = 'drop-shadow(0 0 8px rgba(59,130,246,0.9))';
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as SVGCircleElement).setAttribute('r', '6');
                (e.currentTarget as SVGCircleElement).style.filter = 'drop-shadow(0 0 5px rgba(59,130,246,0.7))';
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
            <div className="relative max-w-4xl mx-auto mt-10 p-8 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20" />
                <div className="relative z-10 text-center text-white/80 animate-pulse">
                    Loading hourly weather chart...
                </div>
            </div>
        );
    }

    return (
        <div className="relative max-w-4xl mx-auto mt-10 p-8 rounded-3xl overflow-hidden">
            {/* Glass background layer */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl" />

            {/* Content */}
            <div className="relative z-10">
                <h2 className="text-3xl font-extrabold mb-8 text-center text-white tracking-wide">
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

                        <CartesianGrid
                            strokeDasharray="4 4"
                            stroke="#ffffff30"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="time"
                            stroke="#ffffff80"
                            tick={{ fill: '#ffffff', fontWeight: '500' }}
                            tickLine={false}
                            axisLine={{ stroke: '#ffffff50' }}
                            interval={2}
                            padding={{ left: 10, right: 10 }}
                            style={{ userSelect: 'none' }}
                        />

                        <YAxis
                            stroke="#ffffff80"
                            tick={{ fill: '#ffffff', fontWeight: '500' }}
                            axisLine={{ stroke: '#ffffff50' }}
                            unit="°C"
                            domain={['dataMin - 2', 'dataMax + 2']}
                            style={{ userSelect: 'none' }}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(30, 64, 175, 0.7)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                boxShadow: '0 4px 30px rgba(59, 130, 246, 0.4)',
                                color: 'white',
                            }}
                            labelStyle={{
                                color: '#bfdbfe',
                                fontWeight: '700',
                                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                            }}
                            itemStyle={{
                                color: '#93c5fd',
                                fontWeight: '600',
                                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                            }}
                            cursor={{
                                stroke: 'rgba(59, 130, 246, 0.5)',
                                strokeWidth: 2,
                                strokeDasharray: '4 4'
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="temp_c"
                            stroke="url(#tempGradient)"
                            strokeWidth={4}
                            dot={<CustomDot />}
                            activeDot={{
                                r: 10,
                                fill: '#3b82f6',
                                stroke: '#ffffff',
                                strokeWidth: 2,
                                filter: 'url(#glow) drop-shadow(0 0 8px #3b82f6)'
                            }}
                            filter="url(#glow)"
                            animationDuration={1200}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}