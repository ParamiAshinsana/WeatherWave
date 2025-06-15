import TopBar from "./TopBar";
import CurrentWeather from "./CurrentWeather";
import MultiCityWeather from "./MultiCityWeather";
import WeatherForecast from "./WeatherForecast";
import HourlyForecast from "./HourlyForecast";

function ContentArea() {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <div className="h-14 flex-none">
                <TopBar />
            </div>


            <div className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto">
                <div className="flex flex-1 gap-4">
                    <div className="border flex-1 bg-gray-100">
                        <CurrentWeather/>
                    </div>
                    <div className="border flex-1 bg-gray-100">Card 2</div>
                    <div className="border flex-1 bg-gray-100"><MultiCityWeather/></div>
                </div>

                <div className="flex flex-1 gap-4">
                    <div className="border flex-1 bg-gray-100"><WeatherForecast/></div>
                    <div className="border flex-1 bg-gray-100"><HourlyForecast/></div>
                </div>
            </div>
        </div>
    );
}

export default ContentArea;
