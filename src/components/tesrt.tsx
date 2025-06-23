import { useState } from "react";
import TopBar from "./TopBar";
import CurrentWeather from "./CurrentWeather";
import MultiCityWeather from "./MultiCityWeather";
import WeatherForecast from "./WeatherForecast";
import HourlyForecast from "./HourlyForecast";
import UserLocationMap from "./UserLocationMap";

function ContentArea() {
    const [city, setCity] = useState("Colombo");
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <div className="h-14 flex-none">
                <TopBar onSearch={setCity} />
            </div>

            <div className="flex-1 flex flex-col gap-6 p-4 overflow-y-auto">
                {/* Current Weather - Always full width */}
                <div className="min-h-[320px]">
                    <CurrentWeather city={city} />
                </div>

                {/* Map - Full width on mobile, half on larger screens */}
                <div className="min-h-[320px] md:min-h-[280px]">
                    <UserLocationMap />
                </div>

                {/* MultiCity - Full width with scroll if needed */}
                <div className="min-h-[280px] overflow-y-auto">
                    <MultiCityWeather />
                </div>

                {/* Forecasts - Stack on mobile, side-by-side on larger screens */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
                    <div className="min-h-[320px]">
                        <WeatherForecast />
                    </div>
                    <div className="min-h-[320px]">
                        <HourlyForecast />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContentArea;