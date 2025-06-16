// function TopBar() {
//     return (
//         <div className="flex ">
//             <div className="border size-14 grow">02</div>
//             <div className="border size-14 flex-none">03</div>
//         </div>
//     );
// }
//
// export default TopBar;

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

function TopBar() {
    return (
        <div className="flex items-center gap-4">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-4">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search for location"
                    className="w-full bg-white/5 border border-glass-stroke placeholder-gray-400 text-white rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                />
            </div>
            <div className="border size-14 flex-none text-black flex items-center justify-center">
                03xfbdfbdf
            </div>
        </div>
    );
}

export default TopBar;
