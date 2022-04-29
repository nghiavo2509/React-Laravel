import { Link, NavLink } from "react-router-dom";


const Sidebar = () => {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            {/* <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink" />
                </div>
                <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
            </a> */}
            <hr className="sidebar-divider my-0" />
            <li className="nav-item active">
                <Link className="nav-link" to="/">
                    <i className="fas fa-fw fa-tachometer-alt" />
                    <span>Dashboard</span>
                </Link>

            </li>
            <hr className="sidebar-divider" />
            <div className="sidebar-heading">
                Interface
            </div>
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                    <i className="fa fa-book" />
                    <span> Libraries</span>
                </a>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header"> Custom Libraries:</h6>
                        <NavLink className="collapse-item" to={"/category"}> Category</NavLink>
                        <NavLink className="collapse-item" to={"/product"}> Product</NavLink>

                    </div>

                </div>
            </li>
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                    <i className="fa fa-user" />
                    <span>User</span>
                </a>
                <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header"> Users:</h6>
                        <NavLink className="collapse-item" to={`/user/staff`}> Nhân viên</NavLink>
                        <NavLink className="collapse-item" to={`user/student`}> Sinh viên</NavLink>

                    </div>
                </div>
            </li>


            <li className="nav-item">
                <NavLink className="nav-link collapsed" to={`/manage-borrow`}>
                    <i className="fa fa-th-large" />
                    <span> Quản lý mượn - trả sách</span>
                </NavLink>
            </li>
            <hr className="sidebar-divider" />


            <hr className="sidebar-divider d-none d-md-block" />
            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle" />
            </div>
            <div className="sidebar-card d-none d-lg-flex">
                <img className="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="..." />
                <p className="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
            </div>
        </ul>

    )
}
export default Sidebar;