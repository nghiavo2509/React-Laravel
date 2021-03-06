import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert';

export const EditGenre = () => {
    const params = useParams();
    var id = params.genreId;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [listError, setListError] = useState([]);

    const [genre, setGenre] = useState({
        title: '',
        status: 1
    });
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://localhost/Laravel_/larareact/laravel/api/genre/${id}`);
            if (res.data.status === 200) {
                setGenre(res.data.genre)
            } else if (res.data.status === 404) {
                swal({
                    title: "Edit!",
                    text: 'Item không tồn tại!',
                    icon: "error",
                    button: "OK!",
                });
                navigate(`/admin/category/items}`)
            }

        }
        fetchData();

    }, [])
    const handleChangleInput = (e) => {
        setGenre({
            ...genre,
            [e.target.name]: e.target.value
        });
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();

        setListError({})
        setLoading(true)

        axios.post(`http://localhost/Laravel_/larareact/laravel/api/genre/${id}`, genre)
            .then(res => {
                console.log(res);
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
                // setListError(err.response.data.errors);
            })
            .then(function () {
                setLoading(false)
            });
    }
    return (
        <div className="category card shadow">
            <div className="main_body m-5">
                <form onSubmit={(e) => handleOnSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Tên</label>
                        <input name="title" onChange={handleChangleInput} type="text" className="form-control" id="formGroupExampleInput"
                            value={genre.title} placeholder="Tên danh mục"
                        />
                        <small className="text-danger">{listError.title}</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Trạng thái</label>
                        <select value={1 === genre.status ? 1 : 0} name="status" onChange={handleChangleInput} className="custom-select">
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
