import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'

export const Index = () => {
    var params = useParams();
    var categoryId = params.categoryId;
    const [categoryTitle, setCategoryTitle] = useState('');
    useEffect(() => {
        const getTitle = async () => {
            var obj = {
                select: 'title',
                id: categoryId
            };
            const res = await axios.post(`http://localhost/Laravel_/larareact/laravel/api/category/${categoryId}/object`, obj)
            setCategoryTitle(res.data.object.title);
        }
        getTitle();
    }, [])
    return (
        <div className="card shadow mb-4">
            <div className="main_head m-3 d-flex ">
                <ul className="nav nav-pills" style={{ gap: 10 }}>
                    <li className="nav-item">
                        <NavLink to={`/category`} className="nav-link">Danh mục</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={`/category/items/${categoryId}`} className="nav-link">{categoryTitle} </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={`/category/items/${categoryId}/create`} className="nav-link">Thêm Thể loại </NavLink>
                    </li>
                </ul>
            </div>
            <Outlet />
        </div>
    )
}
