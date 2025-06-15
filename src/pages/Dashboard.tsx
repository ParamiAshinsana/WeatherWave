import ContentArea from "../components/ContentArea";
import SideBar from "../components/SideBar";

function Dashboard() {
    return (
        <div className="grid grid-cols-12">
            <div className="col-span-2 bg-gray-200 h-screen">
                <SideBar />
            </div>
            <div className="col-span-10 bg-white h-screen">
                <ContentArea />
            </div>
        </div>
    );
}
export default Dashboard;