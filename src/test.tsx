import {useState} from "react";
import TopBar from "./TopBar";
import CurrentWeather from "./CurrentWeather";
import MultiCityWeather from "./MultiCityWeather";
import WeatherForecast from "./WeatherForecast";
import HourlyForecast from "./HourlyForecast";
import UserLocationMap from "./UserLocationMap";

function ContentArea() {
    const [city, setCity] = useState("Colombo");
    return (
        <div className="flex h-screen overflow-hidden antialiased">
            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Fixed height top bar */}
                <div className="h-14 flex-none">
                    <TopBar onSearch={setCity}/>
                </div>


                {/* Main content area */}
                <main className="border p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column (Current Weather & Forecast) */}
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        <div className="border min-h-[300px]">
                            <CurrentWeather city={city}/>
                        </div>
                        <div className="border min-h-[300px]">
                            <WeatherForecast/>
                        </div>
                    </div>

                    {/* Right Column (Map, Multi-City, Hourly) */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border min-h-[300px]">
                                <UserLocationMap/>
                            </div>
                            <div className="border min-h-[300px]">
                                <MultiCityWeather/>
                            </div>
                        </div>
                        <div className="border min-h-[300px]">
                            <HourlyForecast/>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ContentArea;