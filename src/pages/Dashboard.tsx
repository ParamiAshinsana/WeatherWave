import ContentArea from "../components/ContentArea";
import SideBar from "../components/SideBar";

function Dashboard() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="hidden lg:block lg:col-span-1 bg-gray-200 h-screen">
                <SideBar />
            </div>

            <div className="col-span-1 lg:col-span-11 h-screen">
                <ContentArea />
            </div>
        </div>
    );
}
export default Dashboard;