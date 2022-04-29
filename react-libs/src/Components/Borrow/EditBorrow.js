import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

export const EditBorrow = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [listError, setListError] = useState({});
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({
        user_code: '',
        quantity: '',
        product_name: '',
        staff_id: '',
    });
    const [status, setStatus] = useState([

        {
            id: 'da_tra', title: 'Trả sách',
        },
        {
            id: 'dang_muon', title: 'Đang mượn',
        },
        {
            id: 'huy_bo', title: 'Hủy',
        },
    ])
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getData = async () => {
            var id = params.borrowId;
            var res = await axios.get(`http://localhost/Laravel_/larareact/laravel/api/borrow/${id}`);
            if (res.data) {
                setInfo(res.data);
            }
        }
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
        getData();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        var id = params.borrowId;

        axios.post(`http://localhost/Laravel_/larareact/laravel/api/borrow/${id}`, info)
            .then(res => {

                if (res.data.VALID) {
                    swal({
                        title: "Created!",
                        text: res.data.TN,
                        icon: "success",
                        button: "OK!",
                    });
                    return navigate('/manage-borrow');

                } else {
                    setListError({
                        submit: res.data.TN
                    })
                }
            })
            .catch(err => {
                console.log(err.response);

            })
            .then(function () {

            })
    }

    const handleChangleInput = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }
    var databooks = books.map((res, key) => {
        return (
            <option key={key} value={res.title} selected={info.product_name === res.title} > {res.title} </option>
        )
    })
    var selectStatus = status.map((res, key) => {
        return (
            <option key={key} value={res.id} selected={res.id === info.status} >{res.title}</option>
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
                            onChange={handleChangleInput} defaultValue={info.product_name}
                        />
                        <datalist id="books"  >
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
                        <label htmlFor="exampleFormControlSelect1">Trạng thái</label>
                        <select name='status' onChange={handleChangleInput} className="form-control" id="exampleFormControlSelect1">
                            {selectStatus}
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
