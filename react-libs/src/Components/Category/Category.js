import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { EmptyData } from "../../layouts/inc/EmptyData";
import { Spinner } from "../../layouts/inc/Spinner";

const Category = () => {
    const [categories, setCategories] = useState([{
        id: '',
        title: '',
        count_genre: 0
    }]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const res = await axios.get(`http://localhost/Laravel_/larareact/laravel/api/category`);
        if (res.data.categories.length > 0) {
            setCategories(res.data.categories)
            setLoading(false);
        }
    }
    const handleClickStatus = async (id) => {
        const res = await axios.post(`http://localhost/Laravel_/larareact/laravel/api/category/${id}/status`)
    }
    const deleteItem = (id) => {
        axios.post(`http://localhost/Laravel_/larareact/laravel/api/category/${id}/destroy`)
            .then(res => {
                fetchData();
            })
            .catch(err => {
            })
            .then(function () {
            })
    }
    let data = categories.map((res, index) => {
        return (<tr key={res.id}>
            <td>{index}</td>
            <td><Link to={`items/${res.id}`} className="font-weight-bold">{res.title}</Link></td>
            <td>{res.count_genre}</td>
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
                <Link to={`${res.id}`} className="btn btn-info m-2">Sửa </Link>
                <button
                    onClick={() => { deleteItem(res.id) }}
                    className="btn btn-danger ">Xóa
                </button>
            </td>
        </tr>)
    })
    return (

        <div className="card shadow mb-4">
            <div className="main_head m-3">
                <Link to={`/admin/category/create`} className="btn btn-primary text-uppercase">Thêm Danh mục </Link>
            </div>
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Danh sách danh mục</h6>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Số lượng</th>
                                <th>Trạng thái</th>
                                <th>Manage</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Số lượng</th>
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

        </div>


    );
}
export default Category;