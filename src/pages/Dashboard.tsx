import ContentArea from "../components/ContentArea";
import SideBar from "../components/SideBar";

function Dashboard() {
    return (
        // <div className="grid grid-cols-1 lg:grid-cols-12">
        //     <div className="hidden lg:block lg:col-span-1 h-screen w-16">
        //         <SideBar />
        //     </div>
        //
        //     <div className="col-span-1 lg:col-span-11 h-screen">
        //         <ContentArea />
        //     </div>
        // </div>
        <div className="flex">
            <div className="hidden lg:block max-w-[80px] h-screen">
                <SideBar/>
            </div>

            <div className="flex-1 h-screen overflow-auto">
                <ContentArea/>
            </div>
        </div>
    );
}

export default Dashboard;