// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { SunIcon, ArrowPathIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

// const API_KEY = '5a629d47155e4227a8d25517251206';

// function UVIndex({ city = "Colombo" }: { city?: string }) {
//   const [uvData, setUvData] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchUVIndex = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axios.get(
//         `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
//       );

//       console.log('API Response:', response.data); // Debug log

//       // Ensure UV data exists in response
//       if (response.data?.current?.uv !== undefined) {
//         setUvData(response.data.current.uv);
//       } else {
//         throw new Error('UV data not available in response');
//       }
//     } catch (err) {
//       console.error('API Error:', err);
//       setError('Failed to load UV data. Showing sample data.');
//       // Fallback sample data (random UV index 1-11)
//       setUvData(Math.floor(Math.random() * 11) + 1);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUVIndex();
//   }, [city]);

//   const getUVLevel = (uv: number) => {
//     if (uv <= 2) return { level: 'Low', color: 'text-emerald-400', bg: 'bg-emerald-400/10', iconColor: 'text-emerald-300' };
//     if (uv <= 5) return { level: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-400/10', iconColor: 'text-yellow-300' };
//     if (uv <= 7) return { level: 'High', color: 'text-orange-400', bg: 'bg-orange-400/10', iconColor: 'text-orange-300' };
//     if (uv <= 10) return { level: 'Very High', color: 'text-red-400', bg: 'bg-red-400/10', iconColor: 'text-red-300' };
//     return { level: 'Extreme', color: 'text-purple-400', bg: 'bg-purple-400/10', iconColor: 'text-purple-300' };
//   };

//   // Debug view - uncomment to see raw data
//   // return (
//   //   <div className="p-4 text-white">
//   //     <pre>{JSON.stringify({ loading, error, uvData }, null, 2)}</pre>
//   //   </div>
//   // );

//   return (
//     <div className="w-full h-full p-4 bg-white/5 backdrop-blur-sm rounded-xl">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-white">UV Index</h2>
//         <button
//           onClick={fetchUVIndex}
//           disabled={loading}
//           className="p-1 rounded-full hover:bg-white/10 transition-colors"
//           aria-label="Refresh data"
//         >
//           <ArrowPathIcon className={`h-5 w-5 text-blue-300 ${loading ? 'animate-spin' : ''}`} />
//         </button>
//       </div>

//       {loading ? (
//         <div className="flex flex-col items-center justify-center h-[calc(100%-3rem)]">
//           <ArrowPathIcon className="h-8 w-8 animate-spin text-blue-300 mb-2" />
//           <p className="text-white/80">Loading UV data...</p>
//         </div>
//       ) : error ? (
//         <div className="flex flex-col items-center justify-center h-[calc(100%-3rem)] text-center">
//           <ExclamationTriangleIcon className="h-8 w-8 text-red-300 mb-2" />
//           <p className="text-red-300 mb-1">{error}</p>
//           <p className="text-white/70 text-sm mb-3">Using sample data for demonstration</p>
//           <button
//             onClick={fetchUVIndex}
//             className="px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm"
//           >
//             Retry
//           </button>
//         </div>
//       ) : uvData ? (
//         <>
//           <div className={`p-6 rounded-lg ${getUVLevel(uvData).bg} mb-4 text-center`}>
//             <SunIcon className={`h-16 w-16 mx-auto ${getUVLevel(uvData).iconColor} mb-3`} />
//             <p className={`text-5xl font-bold ${getUVLevel(uvData).color} mb-1`}>{uvData}</p>
//             <p className={`text-lg font-medium ${getUVLevel(uvData).color}`}>
//               {getUVLevel(uvData).level}
//             </p>
//           </div>

//           <div className="space-y-4">
//             <div className="p-3 bg-white/5 rounded-lg">
//               <h3 className="text-sm font-medium text-white/80 mb-1">Protection Guide</h3>
//               <ul className="text-sm text-white space-y-1">
//                 {uvData <= 2 && (
//                   <li>• No protection needed</li>
//                 )}
//                 {uvData > 2 && (
//                   <li>• Wear SPF 30+ sunscreen</li>
//                 )}
//                 {uvData > 5 && (
//                   <li>• Seek shade during midday</li>
//                 )}
//                 {uvData > 7 && (
//                   <li>• Wear protective clothing</li>
//                 )}
//                 {uvData > 10 && (
//                   <li>• Avoid being outside</li>
//                 )}
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-sm font-medium text-white/80 mb-2">UV Scale</h3>
//               <div className="grid grid-cols-5 gap-1 mb-1">
//                 {[1, 3, 5, 7, 10].map((level) => (
//                   <div
//                     key={level}
//                     className={`h-2 rounded-full ${uvData >= level ? getUVLevel(level).color.replace('text-', 'bg-') : 'bg-white/10'}`}
//                   />
//                 ))}
//               </div>
//               <div className="grid grid-cols-5 text-xs text-white/60">
//                 <span>Low</span>
//                 <span>Mod</span>
//                 <span>High</span>
//                 <span>V. High</span>
//                 <span>Extreme</span>
//               </div>
//             </div>
//           </div>
//         </>
//       ) : (
//         <div className="flex flex-col items-center justify-center h-[calc(100%-3rem)]">
//           <ExclamationTriangleIcon className="h-8 w-8 text-yellow-300 mb-2" />
//           <p className="text-white">No UV data available</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UVIndex;

import { useEffect, useState } from 'react';
import axios from 'axios';
import { SunIcon, ArrowPathIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

const API_KEY = '4c88003c7a8c4a09acc123615252606';

function UVIndex({ city = "Colombo" }: { city?: string }) {
    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWeatherData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(
                `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
            );

            console.log('Full API Response:', response.data); // Debug log

            if (!response.data.current) {
                throw new Error('No weather data available');
            }

            setWeatherData(response.data);

        } catch (err) {
            console.error('API Error:', err);
            setError('Failed to load weather data');
            // Set mock data with UV index for demonstration
            setWeatherData({
                current: {
                    uv: Math.floor(Math.random() * 11) + 1, // Random UV 1-11
                    condition: {
                        text: ['Sunny', 'Partly Cloudy'][Math.floor(Math.random() * 2)]
                    },
                    temp_c: Math.floor(Math.random() * 30) + 10
                },
                location: {
                    name: city
                }
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, [city]);

    const getUVLevel = (uv: number) => {
        if (uv <= 2) return { level: 'Low', color: 'text-emerald-400', bg: 'bg-emerald-400/10' };
        if (uv <= 5) return { level: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-400/10' };
        if (uv <= 7) return { level: 'High', color: 'text-orange-400', bg: 'bg-orange-400/10' };
        if (uv <= 10) return { level: 'Very High', color: 'text-red-400', bg: 'bg-red-400/10' };
        return { level: 'Extreme', color: 'text-purple-400', bg: 'bg-purple-400/10' };
    };

    // Get UV data - use mock if not available
    const uvIndex = weatherData?.current?.uv ?? Math.floor(Math.random() * 5) + 1;
    const uvLevel = getUVLevel(uvIndex);

    return (
        <div className="w-full h-full p-4 bg-white/5 backdrop-blur-sm rounded-xl">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Sun Protection - {city}</h2>
                <button
                    onClick={fetchWeatherData}
                    disabled={loading}
                    className="p-1 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Refresh data"
                >
                    <ArrowPathIcon className={`h-5 w-5 text-blue-300 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center h-[calc(100%-3rem)]">
                    <ArrowPathIcon className="h-8 w-8 animate-spin text-blue-300 mb-2" />
                    <p className="text-white/80">Loading weather data...</p>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center h-[calc(100%-3rem)] text-center p-4">
                    <ExclamationTriangleIcon className="h-8 w-8 text-yellow-300 mb-2" />
                    <p className="text-yellow-300 mb-2">{error}</p>
                    <p className="text-white/70 text-sm mb-3">Showing sample UV data</p>
                    <button
                        onClick={fetchWeatherData}
                        className="px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm"
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <>
                    <div className={`p-6 rounded-lg ${uvLevel.bg} mb-4 text-center`}>
                        <div className="flex items-center justify-center space-x-4">
                            <SunIcon className={`h-12 w-12 ${uvLevel.color}`} />
                            <div>
                                <p className={`text-4xl font-bold ${uvLevel.color}`}>{uvIndex}</p>
                                <p className={`text-lg ${uvLevel.color}`}>{uvLevel.level} UV</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="p-3 bg-white/5 rounded-lg">
                            <h3 className="text-sm font-medium text-white/80 mb-2">Protection Guide</h3>
                            {uvIndex <= 2 && (
                                <p className="text-sm text-white">Enjoy outdoor activities safely</p>
                            )}
                            {uvIndex > 2 && uvIndex <= 5 && (
                                <p className="text-sm text-white">Wear sunscreen (SPF 30+) and a hat</p>
                            )}
                            {uvIndex > 5 && uvIndex <= 7 && (
                                <p className="text-sm text-white">Seek shade during midday hours</p>
                            )}
                            {uvIndex > 7 && uvIndex <= 10 && (
                                <p className="text-sm text-white">Wear protective clothing and sunglasses</p>
                            )}
                            {uvIndex > 10 && (
                                <p className="text-sm text-white">Avoid sun exposure between 10am-4pm</p>
                            )}
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-white/80 mb-2">UV Index Scale</h3>
                            <div className="grid grid-cols-5 gap-1 mb-1">
                                {[1, 3, 5, 7, 10].map((level) => (
                                    <div
                                        key={level}
                                        className={`h-2 rounded-full ${uvIndex >= level ? uvLevel.color.replace('text-', 'bg-') : 'bg-white/10'}`}
                                    />
                                ))}
                            </div>
                            <div className="grid grid-cols-5 text-xs text-white/60">
                                <span>Low</span>
                                <span>Mod</span>
                                <span>High</span>
                                <span>V. High</span>
                                <span>Extreme</span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-sm font-medium text-white/80 mb-1">UV Level Indicator</h3>
                            <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full"
                                    style={{
                                        width: `${(uvIndex / 11) * 100}%`,
                                        background: `linear-gradient(to right, 
                                                          #10b981 0%, 
                                                          #10b981 18%, 
                                                          #f59e0b 18%, 
                                                          #f59e0b 45%, 
                                                          #f97316 45%, 
                                                          #f97316 63%, 
                                                          #ef4444 63%, 
                                                          #ef4444 90%, 
                                                          #8b5cf6 90%)`
                                    }}
                                />
                            </div>
                            <div className="flex justify-between text-xs text-white/60 mt-1">
                                <span>0</span>
                                <span>3</span>
                                <span>6</span>
                                <span>8</span>
                                <span>11+</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default UVIndex;