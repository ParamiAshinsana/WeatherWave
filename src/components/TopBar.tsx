import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

type TopBarProps = {
    onSearch: (city: string) => void;
};

function TopBar({ onSearch }: TopBarProps) {
    const [input, setInput] = useState("");

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && input.trim() !== "") {
            onSearch(input.trim());
            setInput("");
        }
    };

    return (
        <div className="flex items-center gap-4">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md m-4">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    name="search"
                    id="search"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Search for location"
                    className="w-full bg-white/5 border border-glass-stroke placeholder-gray-400 text-black rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                />
            </div>

            <div className="flex items-center space-x-4 ml-auto mx-4 border">
                <button
                    aria-label="Notifications"
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                    <BellIcon className="w-6 h-6 text-gray-300" />
                </button>
                <img
                    src="https://picsum.photos/seed/user/40/40"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border-2 border-blue-400"
                />
            </div>
        </div>
    );
}

export default TopBar;


