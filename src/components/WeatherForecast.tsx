import React from 'react';

function WeatherForecast() {

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
                7-Day Weather Forecast – Colombo</h2>

                <p className="text-center text-gray-500 dark:text-gray-300">Loading forecast...</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div
                            className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-center shadow-md">
                            <p className="font-semibold text-gray-700 dark:text-white">test1</p>
                            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">test2</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">test3</p>
                        </div>
                </div>
        </div>
    );
}

export default WeatherForecast;
