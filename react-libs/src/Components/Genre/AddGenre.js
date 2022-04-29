import axios from 'axios';
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import swal from 'sweetalert';

export const AddGenre = () => {
    const param = useParams();
    var categoryId = param.categoryId;
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState({
        title: '',
        category_id: categoryId,
        status: 1
    });
    const [listError, setListError] = useState([]);
    const handleSubmit = async (e) => {
        setListError([]);
        e.preventDefault();
        axios.post(`http://localhost/Laravel_/larareact/laravel/api/genre`, genre)
            .then(res => {
                if (res.data.VALID) {
                    swal({
                        title: "Created!",
                        text: res.data.TN,
                        icon: "success",
                        button: "OK!",
                    });
                    setGenre({
                        ...genre,
                        title: '',
                    })
                }
            })
            .catch(function (error) {
                if (error.response.status === 422) {
                    setListError(error.response.data.errors);
                }
            })
            .then(function () {
                setLoading(false)
            });


    }
    const handleChangleInput = (e) => {
        setGenre({
            ...genre,
            [e.target.name]: e.target.value
        });
    }
    return (
        <div className="genre card shadow">
            <div className="main_body m-5">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Tên</label>
                        <input name="title" onChange={handleChangleInput} type="text" className="form-control" id="formGroupExampleInput"
                            value={genre.title} placeholder="Tên thể loại"
                        />
                        <small className="text-danger">{listError.title}</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Trạng thái</label>
                        <select name="status" defaultValue={1} onChange={handleChangleInput} className="custom-select">
                            <option value={1}>Hiển thị</option>
                            <option value={0}>Ẩn</option>
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
