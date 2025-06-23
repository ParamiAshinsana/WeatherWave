// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
//
// type WeatherData = {
//     location: {
//         name: string;
//     };
//     current: {
//         temp_c: number;
//         condition: {
//             text: string;
//             icon: string;
//         };
//     };
// };
//
// const API_KEY = '5a629d47155e4227a8d25517251206';
// const cities = ['Colombo', 'New York', 'London', 'Tokyo', 'Sydney'];
//
// function MultiCityWeather() {
//     const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         Promise.all(
//             cities.map((city) =>
//                 axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
//             )
//         )
//             .then((responses) => {
//                 setWeatherData(responses.map((res) => res.data));
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 console.error('Error fetching multiple cities weather:', err);
//                 setLoading(false);
//             });
//     }, []);
//
//     return (
//         <div className="relative max-w-md mx-auto mt-6 p-6 rounded-2xl overflow-hidden">
//             {/* Glass background layer */}
//             <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl" />
//
//             {/* Content */}
//             <div className="relative z-10">
//                 <h2 className="text-xl font-semibold mb-6 text-center text-white">
//                     World Weather
//                 </h2>
//
//                 {loading ? (
//                     <div className="text-center py-4">
//                         <p className="text-white/80 animate-pulse">Loading weather data...</p>
//                     </div>
//                 ) : (
//                     <div className="space-y-4">
//                         {weatherData.map(({ location, current }) => (
//                             <div
//                                 key={location.name}
//                                 className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/15 transition-all duration-300"
//                             >
//                                 <div className="flex items-center gap-4">
//                                     <img
//                                         src={current.condition.icon}
//                                         alt={current.condition.text}
//                                         className="w-10 h-10 drop-shadow-lg"
//                                     />
//                                     <div>
//                                         <h3 className="text-sm font-medium text-white">
//                                             {location.name}
//                                         </h3>
//                                         <p className="text-xs text-white/70">
//                                             {current.condition.text}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <p className="text-lg font-semibold text-blue-200">
//                                     {current.temp_c}°C
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
//
// export default MultiCityWeather;

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
        <div className="relative w-full h-full p-2 min-[400px]:p-3 sm:p-4 md:p-5 lg:p-6">
            {/* Glass background layer */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm min-[500px]:backdrop-blur-md sm:backdrop-blur-lg rounded-lg min-[500px]:rounded-xl sm:rounded-2xl border border-white/20 shadow-xs min-[500px]:shadow-sm sm:shadow-md md:shadow-lg" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
                {/* Title with responsive sizing */}
                <h2 className="text-[15px] min-[400px]:text-base min-[500px]:text-lg sm:text-xl md:text-2xl font-semibold mb-2 min-[500px]:mb-3 sm:mb-4 md:mb-5 text-center text-white">
                    World Weather
                </h2>

                {loading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-xs min-[500px]:text-sm sm:text-base text-white/80 animate-pulse">
                            Loading weather data...
                        </p>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto pr-1 space-y-1.5 min-[500px]:space-y-2 sm:space-y-3 md:space-y-4">
                        {weatherData.map(({ location, current }) => (
                            <div
                                key={location.name}
                                className="flex items-center justify-between p-2 min-[500px]:p-3 sm:p-4 bg-white/10 backdrop-blur-xs min-[500px]:backdrop-blur-sm rounded-md min-[500px]:rounded-lg sm:rounded-xl hover:bg-white/15 transition-all duration-200 border border-white/10"
                            >
                                <div className="flex items-center gap-2 min-[500px]:gap-3 sm:gap-4 flex-1 min-w-0">
                                    {/* Weather icon with responsive sizing */}
                                    <img
                                        src={current.condition.icon}
                                        alt={current.condition.text}
                                        className="w-7 h-7 min-[500px]:w-8 min-[500px]:h-8 sm:w-10 sm:h-10 flex-none drop-shadow-lg"
                                    />

                                    {/* City and condition text - adjusted for 500-770px range */}
                                    <div className="min-w-0">
                                        <h3 className="text-[13px] min-[500px]:text-sm sm:text-base font-medium text-white truncate">
                                            {location.name}
                                        </h3>
                                        <p className="text-[11px] min-[500px]:text-xs sm:text-sm text-white/70 truncate">
                                            {current.condition.text}
                                        </p>
                                    </div>
                                </div>

                                {/* Temperature with responsive sizing - specific adjustment for 500-770px */}
                                <p className="text-[13px] min-[500px]:text-sm sm:text-base md:text-lg font-semibold text-blue-200 whitespace-nowrap ml-2 min-[500px]:ml-3">
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