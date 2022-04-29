import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Navigate, Outlet } from "react-router-dom";

const MasterLayout = () => {

    return (
        <div id="wrapper" >
            <Sidebar />
            <div className="d-flex flex-column" id="content-wrapper">
                <div id="content">
                    <Navbar />
                    <div className="container-fluid">
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </div>

        </div >
    );
}
export default MasterLayout;