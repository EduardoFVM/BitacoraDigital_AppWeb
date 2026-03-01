import CustomNavbar from "../components/CustomNavBar";
import CustomSidebar from "../components/CustomSidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout(){
    const SIDEBAR_WIDTH = "80px";

    return(
        <div className="d-flex vh-100 overflow-hidden">
            <CustomSidebar />
            <div
                className="d-flex flex-column w-100"
                style={{
                    marginLeft: SIDEBAR_WIDTH,
                    Height: "100vh",
                    transition: "margin-left 0.3s ease"
                }}
            >
                <CustomNavbar />
                <div className="p-4 flex-grow-1 overflow-y-auto">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}