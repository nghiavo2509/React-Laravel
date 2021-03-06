import axios from 'axios';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';

export const AddProduct = () => {
    const [loading, setLoading] = useState(false);

    const [categories, setCategories] = useState([]);
    const [listError, setListError] = useState({});
    const [genres, setGenres] = useState([]);
    const [product, setProduct] = useState({
        title: '',
        quantity: '',
        category_id: '',
        genre_id: '',
        status: 1,
    })

    useEffect(() => {
        const categories = async () => {
            var data = {
                status: true
            };
            const res = await axios.post(`http://localhost/Laravel_/larareact/laravel/api/category/data/get`, data)
            if (res.data.categories.length > 0) {
                setCategories(res.data.categories)
            }
        }
        categories();
    }, [])

    const onchangeSelectCategory = async (e) => {
        var id = e.target.value;
        var data = {
            category_id: id
        };
        setGenres([]);
        setProduct({
            ...product,
            category_id: data.category_id,
            genre_id: ''
        })
        const res = await axios.post(`http://localhost/Laravel_/larareact/laravel/api/category/data/get`, data)
        if (res.data.genres.length > 0) {
            setGenres(res.data.genres)
        }
    }
    const handleChangeInput = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post(`http://localhost/Laravel_/larareact/laravel/api/product`, product)
            .then(res => {
                if (res.data.VALID) {
                    swal({
                        title: "Created!",
                        text: res.data.TN,
                        icon: "success",
                        button: "OK!",
                    });
                    setProduct({
                        ...product,
                        title: '',
                        quantity: '',
                        status: 1,
                    })
                    setListError([])

                }
            })
            .catch(err => {
                if (err.response.data.errors) {
                    setListError(err.response.data.errors)
                }
            })
            .then(function () {
                setLoading(false);
            })

    }
    var selectCategory = categories.map((value, key) => {
        return (
            <option key={key} value={value.id}>{value.title}</option>
        )
    })
    var selectGenres = genres.map((value, key) => {
        return (
            <option key={key} value={value.id}>{value.title}</option>
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
                        <select
                            defaultValue={""}
                            name='category_id' onChange={(event) => onchangeSelectCategory(event)} className="form-control" id="exampleFormControlSelect1">
                            <option value={""}>Ch???n danh m???c</option>
                            {selectCategory}
                        </select>
                        <small className="text-danger">{listError.category_id}</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Th??? lo???i</label>
                        <select name='genre_id'
                            defaultValue={""}
                            onChange={(event) => handleChangeInput(event)} className="form-control" id="exampleFormControlSelect1">
                            <option value={""}>Ch???n th??? lo???i</option>
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
            </div >
        </div >
    )
}
