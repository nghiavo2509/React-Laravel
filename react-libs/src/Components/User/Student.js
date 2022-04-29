import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { EmptyData } from '../../layouts/inc/EmptyData';
import { Spinner } from '../../layouts/inc/Spinner';
export const Student = () => {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        var res = await axios.get(`http://localhost/Laravel_/larareact/laravel/api/student`)
        if (res.data.students.length > 0) {
            setStudents(res.data.students)
            setLoading(false)
        }
    }
    var data = students.map((res, key) => {
        return (
            <tr key={key}>
                <td> {key}</td>
                <td > {res.student_code}</td>
                <td> {res.name}</td>
                <td> {res.phone === null ? 'Chưa cập nhật' : res.phone}</td>
                <td>
                    <Link to={`/loading`} className="btn btn-info m-2">Chi tiết </Link>
                </td>
            </tr>
        )
    })
    return (
        <div className="card-body">
            <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Mã Sinh viên</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>Id</th>
                            <th>Mã Sinh viên</th>
                            <th>Name</th>
                            <th>Phone</th>
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
    )
}
