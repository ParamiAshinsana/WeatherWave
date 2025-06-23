import React from 'react';
import {
    HomeIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    ArrowLeftOnRectangleIcon,
    Squares2X2Icon,
} from '@heroicons/react/24/solid';

export default function Sidebar() {
    return (
        <div className="h-screen w-16 flex flex-col justify-between items-center py-6">
            {/* Top Icon */}
            <div className="flex flex-col items-center gap-6">
                <Squares2X2Icon className="w-6 h-6 text-white cursor-pointer" />

                {/* Navigation Icons */}
                <div className="flex flex-col gap-6 mt-8">
                    <HomeIcon className="w-6 h-6 text-white hover:text-blue-400 cursor-pointer" />
                    <ChartBarIcon className="w-6 h-6 text-white hover:text-blue-400 cursor-pointer" />
                    <Cog6ToothIcon className="w-6 h-6 text-white hover:text-blue-400 cursor-pointer" />
                </div>
            </div>

            {/* Logout Icon */}
            <div>
                <ArrowLeftOnRectangleIcon className="w-6 h-6 text-white hover:text-red-400 cursor-pointer" />
            </div>
        </div>
    );
}
