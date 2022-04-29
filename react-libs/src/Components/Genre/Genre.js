import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams, NavLink, Outlet } from 'react-router-dom'
import { EmptyData } from '../../layouts/inc/EmptyData';
import { Spinner } from '../../layouts/inc/Spinner';

export const Genre = () => {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    var categoryId = params.categoryId;
    const [popupShow, setPopupShow] = useState(true);
    const [genres, setGenres] = useState([
        {
            id: '',
            title: '',
            category_title: '',
            status: ''
        }
    ])

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        axios.get(`http://localhost/Laravel_/larareact/laravel/api/genre/${categoryId}/get`)
            .then(res => {
                setGenres(res.data.genres)
            })
            .catch(err => {
                console.log(err);
            })
            .then(function () {
                setLoading(false);
            })
    }
    const deleteItem = (id) => {
        axios.post(`http://localhost/Laravel_/larareact/laravel/api/genre/${id}/destroy`)
            .then(res => {
                fetchData();
            })
            .catch(err => {

            })
            .then(function () {
            })
    }
    const handleClickStatus = async (genreId) => {
        const res = await axios.post(`http://localhost/Laravel_/larareact/laravel/api/genre/${genreId}/status`)
    }
    var data = genres.map((res, index) => {
        return (
            <tr key={res.id}>
                <td>{index}</td>
                <td>{res.title}</td>
                <td>{res.category_title}</td>
                <td>
                    <div className="custom-control custom-switch">
                        <label className="switch">
                            <input
                                defaultChecked={res.status === 1 ? true : false}
                                onChange={() => handleClickStatus(res.id)} type="checkbox" />
                            <span className="slider round" />
                        </label>
                    </div>
                </td>
                <td>
                    <Link to={`edit/${res.id}`} className="btn btn-info m-2">Sửa </Link>
                    <button
                        onClick={() => { deleteItem(res.id) }}
                        className="btn btn-danger ">Xóa
                    </button>
                </td>
            </tr>
        );
    })
    return (
        <div className="card shadow mb-4">

            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Danh sách Thể loại</h6>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Danh mục</th>
                                <th>Trạng thái</th>
                                <th>Manage</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Danh mục</th>
                                <th>Trạng thái</th>
                                <th>Manage</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {loading === true && (<tr><td><Spinner /></td></tr>)}
                            {data.length > 0 ? data : <tr><td><EmptyData /></td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>

            <Outlet />

        </div >
    )
}
