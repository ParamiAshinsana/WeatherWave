import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {ArrowPathIcon, SunIcon, MoonIcon} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const API_KEY = '5a629d47155e4227a8d25517251206';

function SunTimes() {
    const [astronomy, setAstronomy] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAstronomy = async () => {
            try {
                const response = await axios.get(
                    `https://api.weatherapi.com/v1/astronomy.json?key=${API_KEY}&q=Colombo`
                );
                setAstronomy(response.data.astronomy.astro);
            } catch (err) {
                console.error('Error fetching astronomy data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAstronomy();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center p-4 bg-white/5 backdrop-blur-sm rounded-xl">
                <div className="flex items-center space-x-2 text-white/80">
                    <ArrowPathIcon className="h-5 w-5 animate-spin"/>
                    <span>Loading sun times...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full p-4 bg-white/5 backdrop-blur-sm rounded-xl">
            <div className="md:col-span-2 lg:col-span-3 flex justify-between items-center">
                <Link to="/" className="inline-flex items-center text-blue-300 hover:text-blue-400 mb-4">
                    <ArrowPathIcon className="w-5 h-5 mr-2 transform rotate-180"/>
                    Back to Dashboard
                </Link>
                {/*<div className="text-sm text-white/80">*/}
                {/*    {location.name} • {new Date(location.localtime).toLocaleTimeString([], {*/}
                {/*    hour: '2-digit',*/}
                {/*    minute: '2-digit'*/}
                {/*})}*/}
                {/*</div>*/}
            </div>
            <h2 className="text-xl font-bold text-white mb-4">Sun & Moon</h2>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-yellow-500/20 rounded-full">
                            <SunIcon className="h-6 w-6 text-yellow-400"/>
                        </div>
                        <div>
                            <p className="text-sm text-white/80">Sunrise</p>
                            <p className="text-xl font-bold text-yellow-300">
                                {astronomy.sunrise}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-500/20 rounded-full">
                            <SunIcon className="h-6 w-6 text-blue-300"/>
                        </div>
                        <div>
                            <p className="text-sm text-white/80">Sunset</p>
                            <p className="text-xl font-bold text-blue-200">
                                {astronomy.sunset}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-indigo-500/20 rounded-full">
                            <MoonIcon className="h-6 w-6 text-indigo-300"/>
                        </div>
                        <div>
                            <p className="text-sm text-white/80">Moon Phase</p>
                            <p className="text-xl font-bold text-purple-200">
                                {astronomy.moon_phase}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-gray-500/10 to-gray-700/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-500/20 rounded-full">
                            <MoonIcon className="h-6 w-6 text-gray-300"/>
                        </div>
                        <div>
                            <p className="text-sm text-white/80">Moon Illumination</p>
                            <p className="text-xl font-bold text-gray-200">
                                {astronomy.moon_illumination}%
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SunTimes;



