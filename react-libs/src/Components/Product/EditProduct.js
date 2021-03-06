import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

export const EditProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [listError, setlistError] = useState([]);
    const [product, setProduct] = useState({
        id: '',
        title: '',
        quantity: '',
        category_id: '',
        genre_id: '',
        status: '',
    });
    const [categories, setCategories] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const getData = async () => {
            var id = params.productId;
            var res = await axios.get(`http://localhost/Laravel_/larareact/laravel/api/product/${id}`)
            if (res.data) {
                setProduct(res.data);
                categories();
                genress(res.data.category_id);
            }
        }
        const categories = async () => {
            var data = {
                status: true
            };
            const res = await axios.post(`http://localhost/Laravel_/larareact/laravel/api/category/data/get`, data)
            if (res.data.categories.length > 0) {
                setCategories(res.data.categories);

            }
        }
        getData();

    }, [])

    const onchangeSelectCategory = async (e) => {
        var id = e.target.value;
        var data = {
            category_id: id
        };
        const res = await axios.post(`http://localhost/Laravel_/larareact/laravel/api/category/data/get`, data)
        if (res.data.genres.length > 0) {
            setGenres(res.data.genres)
            setProduct({
                ...product,
                category_id: id
            })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        var id = product.id;
        setLoading(true);
        axios.post(`http://localhost/Laravel_/larareact/laravel/api/product/${id}`, product)
            .then(res => {
                if (res.data.VALID) {
                    swal({
                        title: "Updated!",
                        text: res.data.TN,
                        icon: "success",
                        button: "OK!",
                    });
                    setTimeout(() => {
                        navigate('/admin/product')
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
                console.log(err);
            })
            .then(function () {
                setLoading(false)
            });
    }
    const handleChangeInput = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    }

    var selectCategory = categories.map((res, key) => {
        return (
            <option key={key} value={res.id} selected={res.id === product.category_id}>{res.title}</option>
        )
    })
    const genress = async (id) => {
        var data = {
            category_id: id
        };
        const res = await axios.post(`http://localhost/Laravel_/larareact/laravel/api/category/data/get`, data)
        if (res.data.genres.length > 0) {
            setGenres(res.data.genres)
        }
    }
    var selectGenres = genres.map((res, key) => {
        return (
            <option key={key} value={res.id} selected={res.id === product.genre_id}>{res.title}</option>
        )
    })
    return (
        <div className="genre card shadow">
            <div className="main_body m-5">
                <form onSubmit={(event) => handleSubmit(event)} >
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">T??n s??ch</label>
                        <input
                            value={product.title} onChange={(event) => handleChangeInput(event)}
                            name="title" type="text" className="form-control" id="formGroupExampleInput"
                            placeholder="T??n s??ch"
                        />
                        <small className="text-danger">{listError.title}</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInputQty">S??? l?????ng</label>
                        <input
                            value={product.quantity} onChange={(event) => handleChangeInput(event)}
                            name="quantity" type="text" className="form-control" id="formGroupExampleInputQty"
                            placeholder="S??? l?????ng"
                        />
                        <small className="text-danger">{listError.quantity}</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Danh m???c</label>
                        <select defaultValue={product.category_id}
                            onChange={(event) => onchangeSelectCategory(event)}
                            name='category_id' className="form-control" id="exampleFormControlSelect1">
                            <option value="" disabled >Ch???n danh m???c</option>
                            {selectCategory}
                        </select>
                        <small className="text-danger">{listError.category_id}</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Th??? lo???i</label>
                        <select name='genre_id' onChange={(event) => handleChangeInput(event)} className="form-control" id="exampleFormControlSelect1">
                            <option>Ch???n th??? lo???i</option>
                            {selectGenres}
                        </select>
                        <small className="text-danger">{listError.genre_id}</small>
                    </div>


                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Tr???ng th??i</label>
                        <select name="status" onChange={(event) => handleChangeInput(event)} defaultValue={1} className="custom-select">
                            <option value={1}>Hi???n th???</option>
                            <option value={0}>???n</option>
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
                                ??ang x??? l??...
                            </button>
                            :
                            <button type="submit" className="btn btn-primary">
                                X??c nh???n
                            </button>
                    }
                </form>
            </div>
        </div>
    )
}
