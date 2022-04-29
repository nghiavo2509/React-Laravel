import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const AddCategory = () => {
    const [category, setCategory] = useState({
        title: '',
        status: 1
    });
    const [listError, setListError] = useState([]);
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        axios.post(`http://localhost/Laravel_/larareact/laravel/api/category`, category)
            .then(res => {
                if (res.data.VALID) {
                    swal({
                        title: "Created!",
                        text: res.data.TN,
                        icon: "success",
                        button: "OK!",
                    });
                    setCategory({
                        title: '',
                        status: 1
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
        setCategory({
            ...category,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className="category card shadow">
            <div className="main_head m-3">
                <Link to={`/category`} className="btn btn-primary text-uppercase">Danh mục </Link>
            </div>
            <div className="main_body m-5">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Tên</label>
                        <input name="title" onChange={handleChangleInput} type="text" className="form-control" id="formGroupExampleInput"
                            value={category.title} placeholder="Tên danh mục"
                        />
                        <small className="text-danger">{listError.title}</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Trạng thái</label>
                        <select name="status" onChange={handleChangleInput} className="custom-select">
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
    );
}
export default AddCategory;
