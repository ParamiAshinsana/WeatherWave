import {useState} from "react";
import TopBar from "./TopBar";
import CurrentWeather from "./CurrentWeather";
import MultiCityWeather from "./MultiCityWeather";
import WeatherForecast from "./WeatherForecast";
import HourlyForecast from "./HourlyForecast";
import UVIndex from "./UVIndex.tsx";

function ContentArea() {
    const [city, setCity] = useState("Colombo");
    return (
        <div className="flex h-screen overflow-hidden antialiased bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950">
            <div className="flex-1 flex flex-col overflow-y-auto">

                <div className="pt-5 h-48 border-b border-white/10 flex flex-col justify-end pb-4">
                    <TopBar onSearch={setCity}/>
                </div>


                <main className="p-2 sm:p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-1 flex flex-col gap-4">
                        <div className="rounded-xl overflow-hidden">
                            <CurrentWeather city={city}/>
                        </div>
                        <div className="rounded-xl overflow-hidden">
                            <WeatherForecast/>
                        </div>
                    </div>

                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="rounded-xl overflow-hidden">
                                <UVIndex/>
                            </div>
                            <div className="rounded-xl overflow-hidden">
                                <MultiCityWeather/>
                            </div>
                        </div>
                        <div className="rounded-xl overflow-hidden">
                            <HourlyForecast/>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ContentArea;