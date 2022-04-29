import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Login = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [listError, setListError] = useState([]);

    const handleChangeInput = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost/Laravel_/larareact/laravel/api/user/login`, user)
            .then(response => {
                if (response.data.status === 200) {
                    localStorage.setItem('auth_token', response.data.token);
                    localStorage.setItem('auth_username', response.data.username);
                    swal({
                        title: "Login!",
                        text: response.data.message,
                        icon: "success",
                        button: "OK!",
                    });
                    return navigate(`/admin`);
                }
            })
            .catch(error => {
                if (error.response.status === 422) {
                    setListError(error.response.data.errors);
                }
            })
            .then(function () {

            })
    }
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <form className="user" onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <input onChange={handleChangeInput} name="email" type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
                                                <small className="text-danger">{listError.email}</small>
                                            </div>
                                            <div className="form-group">
                                                <input onChange={handleChangeInput} name="password" type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                                                <small className="text-danger">{listError.password}</small>

                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox small">
                                                    <label className="custom-control-label" htmlFor="customCheck">Remember
                                                        Me</label>
                                                    <input type="checkbox" className="custom-control-input" id="customCheck" />

                                                </div>
                                            </div>

                                            <button className="btn btn-primary btn-user btn-block">
                                                Login
                                            </button>
                                            <hr />

                                        </form>
                                        <hr />

                                        <div className="text-center">
                                            <Link className="small" to="/register"> Create an Account</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;