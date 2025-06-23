import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
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
        <div className="w-full max-w-2xl mx-auto px-4">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
                    <MagnifyingGlassIcon className="w-6 h-6 text-gray-300" />
                </div>
                <input
                    type="text"
                    name="search"
                    id="search"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Search city or location..."
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all text-lg shadow-lg"
                />
            </div>
        </div>
    );
}

export default TopBar;