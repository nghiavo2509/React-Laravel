import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './layouts/Footer';
import Navbar from './layouts/Navbar';
import Sidebar from './layouts/Sidebar';
import './assets/admin/css/sb-admin-2.css';
import './assets/admin/vendor/fontawesome-free/css/all.min.css';
// import '.././assets/admin/vendor/jquery/jquery';
import './assets/admin/vendor/bootstrap/js/bootstrap.bundle';
import './assets/admin/css/custom.css';
import Login from './Components/Login';



function App_old() {
    const navigate = useNavigate();

    axios.defaults.baseURL = 'http://localhost:8000/'; // laravel
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.post['Accept'] = 'application/json';

    axios.defaults.withCredentials = false;
    axios.interceptors.request.use(function (config) {

        const token = localStorage.getItem('auth_token');
        console.log(token);

        config.headers.Authorization = token ? `Bearer ${token}` : '';

        return config;
    }, function (error) {

        // Do something with request error
        return Promise.reject(error);
    });


    return (
        <div className="App">
            <div id="wrapper" >
                <Sidebar />
                <div className="d-flex flex-column" id="content-wrapper">
                    <div id="content">
                        <Navbar />
                        <div className="container-fluid">
                            <Outlet />
                        </div>
                    </div>
                    <Footer />
                </div>

            </div >
        </div>
    );
}

export default App_old;
