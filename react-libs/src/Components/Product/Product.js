import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { EmptyData } from '../../layouts/inc/EmptyData';
import { Spinner } from '../../layouts/inc/Spinner';


export const Product = () => {

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([{}])

    const fetchData = async () => {
        const res = await axios.get(`http://localhost/Laravel_/larareact/laravel/api/product`)
        console.log(res.data.products);
        setProducts(res.data.products)
        setLoading(false);
    }
    useEffect(() => {
        fetchData();
    }, [])
    const handleClickStatus = async (productId) => {
        const res = await axios.post(`http://localhost/Laravel_/larareact/laravel/api/product/${productId}/status`)
    }
    const deleteItem = (id) => {
        axios.post(`http://localhost/Laravel_/larareact/laravel/api/product/${id}/destroy`)
            .then(res => {
                fetchData();
            })
            .catch(err => {

            })
            .then(function () {
            })
    }
    var data = products.map((value, key) => {
        return (
            <tr key={'pd_' + value.id}>
                <td>{key}</td>
                <td>{value.title}</td>
                <td>{value.category_title}</td>
                <td>{value.quantity}</td>
                <td>
                    <div className="custom-control custom-switch">
                        <label className="switch">
                            <input
                                defaultChecked={value.status === 1 ? true : false}
                                onChange={() => handleClickStatus(value.id)} type="checkbox" />
                            <span className="slider round" />
                        </label>
                    </div>
                </td>
                <td>
                    <Link to={`edit/${value.id}`} className="btn btn-info m-2">Sửa </Link>
                    <button
                        onClick={() => { deleteItem(value.id) }}
                        className="btn btn-danger ">Xóa
                    </button>
                </td>
            </tr>
        )
    })
    return (
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Tên sách</th>
                                <th>Danh mục</th>
                                <th>Kho</th>
                                <th>Trạng thái</th>
                                <th>Manage</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Id</th>
                                <th>Tên sách</th>
                                <th>Danh mục</th>
                                <th>Kho</th>
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
        </div >
    );
}
