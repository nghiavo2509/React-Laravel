import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert';

export const EditCategory = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [listError, setListError] = useState({});

    const [category, setCategory] = useState({
        title: '',
        status: 1
    });
    useEffect(() => {
        const fetchData = () => {
            var id = params.categoryId;
            axios.get(`http://localhost/Laravel_/larareact/laravel/api/category/${id}`)
                .then(res => {
                    if (res.data.status === 200) {
                        setCategory(res.data.category)
                    } else if (res.data.status === 404) {
                        swal({
                            title: "Edit!",
                            text: 'Item không tồn tại!',
                            icon: "error",
                            button: "OK!",
                        });
                        navigate('/admin/category')
                    }
                })
                .catch(err => {
                    console.log(err);

                })
                .then(function () {

                })
        }
        fetchData();

    }, [])
    const handleChangleInput = (e) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value
        });
    }
    const handleOnSubmit = (e) => {
        setListError({})
        setLoading(true)
        e.preventDefault();
        // var id = params.categoryId;
        var id = params.categoryId;

        axios.post(`http://localhost/Laravel_/larareact/laravel/api/category/${id}`, category)
            .then(res => {
                if (res.data.VALID) {
                    swal({
                        title: "Updated!",
                        text: res.data.TN,
                        icon: "success",
                        button: "OK!",
                    });
                    setTimeout(() => {
                        navigate('/category')
                    }, 1000)
                } else {
                    swal({
                        title: "Update!",
                        text: res.data.TN,
                        icon: "error",
                        button: "OK!",
                    });
                }
            })
            .catch(err => {
                setListError(err.response.data.errors);
            })
            .then(function () {
                setLoading(false)
            });
    }
    return (
        <div className="category card shadow">
            <div className="main_head m-3">
                <Link to={`/category`} className="btn btn-primary text-uppercase m-2">Danh mục </Link>
                <Link to={`/category/create`} className="btn btn-primary text-uppercase">Thêm mới </Link>

            </div>
            <div className="main_body m-5">

                <form onSubmit={(e) => handleOnSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Tên</label>
                        <input name="title" onChange={handleChangleInput} type="text" className="form-control" id="formGroupExampleInput"
                            value={category.title} placeholder="Tên danh mục"
                        />
                        <small className="text-danger">{listError.title}</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Trạng thái</label>
                        <select value={1 === category.status ? 1 : 0} name="status" onChange={handleChangleInput} className="custom-select">
                            <option value={1}  >Hiển thị</option>
                            <option value={0}  >Ẩn</option>

                        </select>
                        <small className="text-danger">{listError.status}</small>
                    </div>
                    {
                        loading === true ?
                            <button className="btn btn-primary" type="button" disabled="">
                                <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                Đang xử lý...
                            </button>
                            :
                            <button type="submit" className="btn btn-primary">
                                Xác nhận
                            </button>
                    }
                </form>
            </div>
        </div>
    )
}
