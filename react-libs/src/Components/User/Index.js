import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export const Index = () => {
    return (
        <div className="card shadow mb-4">
            <div className="main_head m-3 d-flex ">
                <ul className="nav nav-pills" style={{ gap: 10 }}>
                    <li className="nav-item">
                        <NavLink to={`/user/staff`} className="nav-link"> Nhân viên </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={`/user/student`} className="nav-link"> Sinh viên </NavLink>
                    </li>
                </ul>
            </div>
            <Outlet />
        </div>
    )
}
