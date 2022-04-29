import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { EmptyData } from "../../layouts/inc/EmptyData";
import { Spinner } from "../../layouts/inc/Spinner";
export const Borrow = () => {
    const [loading, setLoading] = useState(true);

    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            var res = await axios.get(`http://localhost/Laravel_/larareact/laravel/api/borrow`)
            if (res.data.borrows.length > 0) {
                setItems(res.data.borrows);
                setLoading(false);
            }
        }
        fetchData();
    }, [])
    var data = items.map((res, key) => {
        return (
            <tr key={key}>
                <td>{key}</td>
                <td> {res.user_code}</td>
                <td> {res.product_id}</td>
                <td> {res.quantity}</td>
                <td> {res.staff_id}</td>
                <td>
                    {
                        res.status === 'dang_muon' ? 'Đang mượn'
                            : (res.status === 'da_tra') ? 'Đã trả' : 'Đã hủy'}
                </td>
                <td>
                    <Link to={`edit/${res.id}`} className="btn btn-info m-2">Sửa </Link>

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
                                <th>Sinh viên</th>
                                <th>Tên sách</th>
                                <th>Số lượng</th>
                                <th>Người phụ trách</th>
                                <th>Trạng thái</th>
                                <th>Manage</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Id</th>
                                <th>Sinh viên</th>
                                <th>Tên sách</th>
                                <th>Số lượng</th>
                                <th>Người phụ trách</th>
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
    )
}
