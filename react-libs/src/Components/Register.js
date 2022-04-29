import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import swal from "sweetalert"

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        password: '',
        confirmation_password: ''
    })
    const [listError, setListError] = useState([]);

    const saveRegister = (e) => {

        e.preventDefault();
        axios.post(`http://localhost/Laravel_/larareact/laravel/api/user/register`, user)
            .then(res => {
                console.log(res);
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token)
                    localStorage.setItem('auth_name', res.data.name)

                    navigate('/');
                }
            })
            .catch(error => {

                if (error.response && error.response.status === 422) {
                    setListError(error.response.data.errors)
                }
            });
    }
    const handleChangeInput = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="container">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    {/* Nested Row within Card Body */}
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-block bg-register-image" />
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                </div>
                                <form className="user" onSubmit={saveRegister}>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input name="first_name" onChange={handleChangeInput} type="text" className="form-control form-control-user" id="exampleFirstName" placeholder="First Name" />
                                            <small className="text-danger">{listError.first_name}</small>
                                        </div>
                                        <div className="col-sm-6">
                                            <input name="last_name" onChange={handleChangeInput} type="text" className="form-control form-control-user" id="exampleLastName" placeholder="Last Name" />
                                            <small className="text-danger">{listError.last_name}</small>

                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input name="phone" onChange={handleChangeInput} type="text" className="form-control form-control-user" id="exampleInputPhone" placeholder="Your Phone" />
                                        <small className="text-danger">{listError.phone}</small>
                                    </div>
                                    <div className="form-group">
                                        <input name="email" onChange={handleChangeInput} type="email" className="form-control form-control-user" id="exampleInputEmail" placeholder="Email Address" />
                                        <small className="text-danger">{listError.email}</small>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input onChange={handleChangeInput} name="password" type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                                            <small className="text-danger">{listError.password}</small>

                                        </div>
                                        <div className="col-sm-6">
                                            <input onChange={handleChangeInput} name="confirmation_password" type="password" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Repeat Password" />
                                            <small className="text-danger">{listError.confirmation_password}</small>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary btn-user btn-block">
                                        Register Account
                                    </button>
                                    <hr />

                                </form>
                                <hr />
                                <div className="text-center">
                                    <a className="small" href="forgot-password.html">Forgot Password?</a>
                                </div>
                                <div className="text-center">
                                    <Link className="small" to={`/login`}> Already have an account? Login!</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register