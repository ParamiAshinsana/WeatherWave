import TopBar from "./TopBar";
import CurrentWeather from "./CurrentWeather";

function ContentArea() {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <div className="h-14 flex-none">
                <TopBar />
            </div>


            <div className="flex-1 flex flex-col gap-4 p-4 overflow-hidden">
                <div className="flex flex-1 gap-4">
                    <div className="border flex-1 bg-gray-100">
                        <CurrentWeather />
                    </div>
                    <div className="border flex-1 bg-gray-100">Card 2</div>
                    <div className="border flex-1 bg-gray-100">Card 3</div>
                </div>

                <div className="flex flex-1 gap-4">
                    <div className="border flex-1 bg-gray-100">Card 4</div>
                    <div className="border flex-1 bg-gray-100">Card 5</div>
                </div>
            </div>
        </div>
    );
}

export default ContentArea;
