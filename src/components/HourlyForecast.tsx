// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//     ResponsiveContainer,
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     Tooltip,
//     CartesianGrid,
// } from 'recharts';
// import { ArrowPathIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';
//
// const API_KEY = '5a629d47155e4227a8d25517251206';
//
// function CustomDot(props: any) {
//     const { cx, cy, stroke } = props;
//     return (
//         <circle
//             cx={cx}
//             cy={cy}
//             r={5}
//             stroke={stroke}
//             strokeWidth={2}
//             fill="#3b82f6"
//             className="transition-all duration-300 ease-out"
//             style={{
//                 filter: 'drop-shadow(0 0 4px rgba(59,130,246,0.7))',
//             }}
//             onMouseEnter={() => {
//                 const el = document.getElementById(`dot-${cx}-${cy}`);
//                 if (el) {
//                     el.setAttribute('r', '8');
//                     el.style.filter = 'drop-shadow(0 0 8px rgba(59,130,246,0.9))';
//                 }
//             }}
//             onMouseLeave={() => {
//                 const el = document.getElementById(`dot-${cx}-${cy}`);
//                 if (el) {
//                     el.setAttribute('r', '5');
//                     el.style.filter = 'drop-shadow(0 0 4px rgba(59,130,246,0.7))';
//                 }
//             }}
//             id={`dot-${cx}-${cy}`}
//         />
//     );
// }
//
// export default function HourlyWeatherChart({ city = "Colombo" }: { city?: string }) {
//     const [data, setData] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//
//     const fetchData = async () => {
//         try {
//             setLoading(true);
//             setError(null);
//             const response = await axios.get(
//                 `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1`
//             );
//
//             const hourly = response.data.forecast.forecastday[0].hour.map(
//                 (hourData: any) => ({
//                     time: hourData.time.split(' ')[1].slice(0, 5),
//                     temp_c: hourData.temp_c,
//                     condition: hourData.condition.text,
//                 })
//             );
//
//             setData(hourly);
//         } catch (err) {
//             console.error('Error fetching hourly forecast:', err);
//             setError('Failed to load hourly forecast data');
//             // Set mock data for demonstration if API fails
//             setData(Array.from({ length: 24 }, (_, i) => ({
//                 time: `${i.toString().padStart(2, '0')}:00`,
//                 temp_c: 25 + Math.sin(i / 3) * 3,
//                 condition: i > 6 && i < 18 ? 'Sunny' : 'Clear'
//             })));
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     useEffect(() => {
//         fetchData();
//     }, [city]);
//
//     if (loading) {
//         return (
//             <div className="w-full h-96 flex flex-col items-center justify-center p-4 bg-white/5 backdrop-blur-sm rounded-xl">
//                 <div className="flex items-center space-x-2 text-white/80">
//                     <ArrowPathIcon className="h-5 w-5 animate-spin" />
//                     <span>Loading hourly forecast...</span>
//                 </div>
//             </div>
//         );
//     }
//
//     return (
//         <div className="w-full h-full flex flex-col p-4 bg-white/5 backdrop-blur-sm rounded-xl">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold text-white">Hourly Forecast - {city}</h2>
//                 <button
//                     onClick={fetchData}
//                     disabled={loading}
//                     className="p-1 rounded-full hover:bg-white/10 transition-colors"
//                     aria-label="Refresh data"
//                 >
//                     <ArrowPathIcon className={`h-5 w-5 text-blue-300 ${loading ? 'animate-spin' : ''}`} />
//                 </button>
//             </div>
//
//             {error && (
//                 <div className="mb-4 p-3 bg-red-900/30 rounded-lg flex items-center space-x-2">
//                     <ExclamationTriangleIcon className="h-5 w-5 text-red-300" />
//                     <span className="text-red-300 text-sm">{error}</span>
//                 </div>
//             )}
//
//             <div className="flex-1 min-h-[300px]">
//                 <ResponsiveContainer width="100%" height="100%">
//                     <LineChart
//                         data={data}
//                         margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
//                     >
//                         <defs>
//                             <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
//                                 <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
//                                 <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2} />
//                             </linearGradient>
//                             <filter id="glow" height="200%" width="200%" x="-50%" y="-50%">
//                                 <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#3b82f6" floodOpacity="0.6" />
//                             </filter>
//                         </defs>
//
//                         <CartesianGrid
//                             strokeDasharray="3 3"
//                             stroke="#ffffff20"
//                             vertical={false}
//                         />
//
//                         <XAxis
//                             dataKey="time"
//                             stroke="#ffffff60"
//                             tick={{
//                                 fill: '#ffffff',
//                                 fontSize: '0.7rem',
//                                 fontWeight: '500'
//                             }}
//                             tickLine={false}
//                             axisLine={{ stroke: '#ffffff30' }}
//                             interval={3}
//                             padding={{ left: 10, right: 10 }}
//                         />
//
//                         <YAxis
//                             stroke="#ffffff60"
//                             tick={{
//                                 fill: '#ffffff',
//                                 fontSize: '0.7rem',
//                                 fontWeight: '500'
//                             }}
//                             axisLine={{ stroke: '#ffffff30' }}
//                             domain={['dataMin - 2', 'dataMax + 2']}
//                             tickFormatter={(value) => `${value}°C`}
//                         />
//
//                         <Tooltip
//                             contentStyle={{
//                                 background: 'rgba(15, 23, 42, 0.9)',
//                                 backdropFilter: 'blur(8px)',
//                                 borderRadius: '8px',
//                                 border: '1px solid rgba(255, 255, 255, 0.1)',
//                                 boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
//                                 color: 'white',
//                                 fontSize: '0.8rem'
//                             }}
//                             labelStyle={{
//                                 color: '#bfdbfe',
//                                 fontWeight: '600',
//                             }}
//                             itemStyle={{
//                                 color: '#93c5fd',
//                                 fontWeight: '500',
//                             }}
//                             formatter={(value: number) => [`${value}°C`, "Temperature"]}
//                             labelFormatter={(label) => `Time: ${label}`}
//                         />
//
//                         <Line
//                             type="monotone"
//                             dataKey="temp_c"
//                             stroke="url(#tempGradient)"
//                             strokeWidth={3}
//                             dot={<CustomDot />}
//                             activeDot={{
//                                 r: 8,
//                                 fill: '#3b82f6',
//                                 stroke: '#ffffff',
//                                 strokeWidth: 2,
//                                 filter: 'url(#glow)'
//                             }}
//                             animationDuration={1500}
//                         />
//                     </LineChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// }

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    ArrowPathIcon,
    ExclamationTriangleIcon,
    SunIcon,
    MoonIcon,
    CloudIcon,
    BoltIcon
} from '@heroicons/react/24/solid';

const API_KEY = '5a629d47155e4227a8d25517251206';

interface HourlyWeatherData {
    time: string;
    temp_c: number;
    condition: string;
    is_day: boolean;
    chance_of_rain: number;
}

interface WeatherApiResponse {
    forecast: {
        forecastday: Array<{
            hour: Array<{
                time: string;
                temp_c: number;
                condition: {
                    text: string;
                };
                is_day: number;
                chance_of_rain: number;
            }>;
        }>;
    };
}

const WeatherIcon = ({ condition }: { condition: string }) => {
    const lowerCondition = condition.toLowerCase();

    if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) {
        return <SunIcon className="h-8 w-8 text-yellow-400" />;
    }
    if (lowerCondition.includes('cloud')) {
        return <CloudIcon className="h-8 w-8 text-gray-400" />;
    }
    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
        return <BoltIcon className="h-8 w-8 text-blue-400" />;
    }
    if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
        return <BoltIcon className="h-8 w-8 text-purple-400" />;
    }
    return <MoonIcon className="h-8 w-8 text-indigo-300" />;
};

export default function HourlyForecastCards({ city = "Colombo" }: { city?: string }) {
    const [data, setData] = useState<HourlyWeatherData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get<WeatherApiResponse>(
                `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1`
            );

            const hourly: HourlyWeatherData[] = response.data.forecast.forecastday[0].hour.map(
                (hourData) => ({
                    time: hourData.time.split(' ')[1].slice(0, 5),
                    temp_c: Math.round(hourData.temp_c),
                    condition: hourData.condition.text,
                    is_day: hourData.is_day === 1,
                    chance_of_rain: hourData.chance_of_rain,
                })
            );

            setData(hourly);
        } catch (err) {
            console.error('Error fetching hourly forecast:', err);
            setError('Failed to load hourly forecast data');
            setData(Array.from({ length: 24 }, (_, i) => ({
                time: `${i.toString().padStart(2, '0')}:00`,
                temp_c: 25 + Math.sin(i / 3) * 3,
                condition: i > 6 && i < 18 ? 'Sunny' : 'Clear',
                is_day: i > 6 && i < 18,
                chance_of_rain: i > 12 && i < 18 ? 30 : 0
            })));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [city]);

    if (loading) {
        return (
            <div className="w-full h-64 flex flex-col items-center justify-center p-4 bg-white/5 backdrop-blur-sm rounded-xl">
                <div className="flex items-center space-x-2 text-white/80">
                    <ArrowPathIcon className="h-5 w-5 animate-spin" />
                    <span>Loading hourly forecast...</span>
                </div>
            </div>
        );
    }

    // Split data into two rows
    const firstRow = data.slice(0, 12);
    const secondRow = data.slice(12, 24);

    return (
        <div className="w-full h-full flex flex-col p-4 bg-white/5 backdrop-blur-sm rounded-xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">24-Hour Forecast - {city}</h2>
                <button
                    onClick={fetchData}
                    disabled={loading}
                    className="p-1 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Refresh data"
                >
                    <ArrowPathIcon className={`h-5 w-5 text-blue-300 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {error && (
                <div className="mb-6 p-3 bg-red-900/30 rounded-lg flex items-center space-x-2">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-300" />
                    <span className="text-red-300 text-sm">{error}</span>
                </div>
            )}

            <div className="flex flex-col space-y-4 h-full">
                {/* First Row */}
                <div className="w-full overflow-x-auto pb-2">
                    <div className="flex space-x-4 min-w-max">
                        {firstRow.map((hour, index) => (
                            <div
                                key={index}
                                className={`flex flex-col items-center p-4 rounded-xl min-w-[90px] transition-all duration-300 ${
                                    hour.is_day ? 'bg-blue-500/10' : 'bg-indigo-900/10'
                                } hover:bg-white/10 border border-white/5 hover:border-white/10`}
                            >
                                <p className="text-sm font-medium text-white/80 mb-2">
                                    {hour.time}
                                </p>
                                <WeatherIcon condition={hour.condition} />
                                <p className="text-xl font-bold text-white mt-2">
                                    {hour.temp_c}°
                                </p>
                                <p className="text-xs text-center text-white/60 mt-1 capitalize">
                                    {hour.condition.toLowerCase()}
                                </p>
                                {hour.chance_of_rain > 0 && (
                                    <p className="text-xs mt-1 text-blue-300">
                                        ☔ {hour.chance_of_rain}%
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Second Row */}
                <div className="w-full overflow-x-auto pb-2">
                    <div className="flex space-x-4 min-w-max">
                        {secondRow.map((hour, index) => (
                            <div
                                key={index + 12}
                                className={`flex flex-col items-center p-4 rounded-xl min-w-[90px] transition-all duration-300 ${
                                    hour.is_day ? 'bg-blue-500/10' : 'bg-indigo-900/10'
                                } hover:bg-white/10 border border-white/5 hover:border-white/10`}
                            >
                                <p className="text-sm font-medium text-white/80 mb-2">
                                    {hour.time}
                                </p>
                                <WeatherIcon condition={hour.condition} />
                                <p className="text-xl font-bold text-white mt-2">
                                    {hour.temp_c}°
                                </p>
                                <p className="text-xs text-center text-white/60 mt-1 capitalize">
                                    {hour.condition.toLowerCase()}
                                </p>
                                {hour.chance_of_rain > 0 && (
                                    <p className="text-xs mt-1 text-blue-300">
                                        ☔ {hour.chance_of_rain}%
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}