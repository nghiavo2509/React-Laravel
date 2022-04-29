import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

export const AddBorrow = () => {

    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [listError, setListError] = useState({});
    const [info, setInfo] = useState({
        user_code: '',
        quantity: '',
        product_name: '',
        staff_id: '',
    });
    useEffect(() => {
        const fecthBooks = async () => {
            var data = {
                status: true
            };
            var res = await axios.post(`http://localhost/Laravel_/larareact/laravel/api/product/data/get`, data)
            if (res.data.products.length > 0) {
                setBooks(res.data.products);
            }
        }
        fecthBooks();
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost/Laravel_/larareact/laravel/api/borrow`, info)
            .then(res => {
                console.log(res);
                if (res.data.VALID) {
                    swal({
                        title: "Created!",
                        text: res.data.TN,
                        icon: "success",
                        button: "OK!",
                    });
                    setListError({});
                    setInfo({
                        user_code: '',
                        quantity: '',
                        product_name: '',
                        staff_id: '',
                    });
                } else {
                    setListError({
                        submit: res.data.TN
                    })
                }
            })
            .catch(err => {
                if (err.response.data.errors) {
                    setListError(err.response.data.errors)
                }

            })
            .then(function () {

            })
    }

    const handleChangleInput = (e) => {
        console.log(e.target.name, e.target.value);
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }
    var databooks = books.map((res, key) => {
        return (
            <option key={key} > {res.title} </option>
        )
    })
    return (
        <div className="category card shadow">
            <div className="main_body m-5">
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className='pb-2'>
                        <span className="text-danger font-weight-bold">{listError.submit}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Mã số sinh viên</label>
                        <input name="user_code" onChange={handleChangleInput} type="text" className="form-control" id="formGroupExampleInput"
                            value={info.user_code} placeholder="Mã số"
                        />
                        <small className="text-danger">{listError.user_code}</small>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="formGroupExampleInput">Sách</label>
                        <input type="text" className="form-control" id="formGroupExampleInput"
                            name="product_name" list="books" placeholder="Nhập tên sách"
                            onChange={handleChangleInput}
                        />
                        <datalist id="books" >
                            {databooks}
                        </datalist>
                        <small className="text-danger">{listError.product_name}</small>

                    </div>

                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Số lượng</label>
                        <input name="quantity" onChange={handleChangleInput} type="number" className="form-control" id="formGroupExampleInput"
                            value={info.quantity} placeholder="Số lượng"
                        />
                        <small className="text-danger">{listError.quantity}</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Trạng thái</label>
                        <input name="status" type="text" className="form-control" id="formGroupExampleInput"
                            value={`Sinh viên mượn`} disabled
                        />
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
