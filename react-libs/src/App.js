import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';

import './assets/admin/css/sb-admin-2.css';
import './assets/admin/vendor/fontawesome-free/css/all.min.css';
// import '.././assets/admin/vendor/jquery/jquery';
import './assets/admin/vendor/bootstrap/js/bootstrap.bundle';

import './assets/admin/css/custom.css';
import Login from './Components/Login';
import Register from './Components/Register';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Category from './Components/Category/Category';
import AddCategory from './Components/Category/AddCategory';
import NotFound from './layouts/NotFound';
import { EditCategory } from './Components/Category/EditCategory';
import { Genre } from './Components/Genre/Genre';
import { AddGenre } from './Components/Genre/AddGenre';
import { Index } from './Components/Genre/Index';
import { Index as IndexUser } from './Components/User/Index';
import { Index as IndexBorrow } from './Components/Borrow/Index';


import { EditGenre } from './Components/Genre/EditGenre';
import { Staff } from './Components/User/Staff';
import { Student } from './Components/User/Student';

import { Index as IndexProduct } from './Components/Product/Index';
import { Product } from './Components/Product/Product';
import { AddProduct } from './Components/Product/AddProduct';
import { EditProduct } from './Components/Product/EditProduct';
import MasterLayout from './layouts/MasterLayout';
import { Loading } from './layouts/inc/Loading';
import { Borrow } from './Components/Borrow/Borrow';
import { AddBorrow } from './Components/Borrow/AddBorrow';
import { EditBorrow } from './Components/Borrow/EditBorrow';

function App() {

	axios.defaults.baseURL = 'http://localhost:8000/'; // laravel
	axios.defaults.headers.post['Content-Type'] = 'application/json';
	axios.defaults.headers.post['Accept'] = 'application/json';

	axios.defaults.withCredentials = false;
	axios.interceptors.request.use(function (config) {
		const token = localStorage.getItem('auth_token');
		config.headers.Authorization = token ? `Bearer ${token}` : '';
		return config;
	}, function (error) {
		// Do something with request error
		return Promise.reject(error);
	});

	const isAuthenticated = localStorage.getItem("auth_token");
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/login" element={isAuthenticated ? <Navigate to={`/`} /> : <Login />} exact />

					<Route path="/register" element={isAuthenticated ? <Navigate to='/' /> : <Register />} />

					<Route path='/' element={isAuthenticated ? <MasterLayout /> : <Navigate to={`/login`} />} >

						{/* Category  */}
						<Route path="category" element={<Category />} />
						<Route path="category/:categoryId" element={<EditCategory />} />
						<Route path="category/create" element={<AddCategory />} />

						{/* Genre  */}
						<Route path="category/items/:categoryId" element={<Index />}  >
							<Route path="" element={<Genre />} />
							<Route path="create" element={<AddGenre />} />
							<Route path="edit/:genreId" element={<EditGenre />} />
						</Route>


						{/* User */}
						<Route path="user" element={<IndexUser />} >
							<Route path='staff' element={<Staff />} />
							<Route path='student' element={<Student />} />
						</Route>

						{/* Product */}
						<Route path='product' element={<IndexProduct />}>
							<Route path='' element={<Product />}> </Route>
							<Route path='create' element={<AddProduct />}> </Route>
							<Route path='edit/:productId' element={<EditProduct />}> </Route>
						</Route>

						{/* Borrow Books */}
						<Route path='manage-borrow' element={<IndexBorrow />}>
							<Route path='' element={<Borrow />} />
							<Route path='create' element={<AddBorrow />} />
							<Route path='edit/:borrowId' element={<EditBorrow />} />

						</Route>

						<Route path="*" element={<NotFound />} />
						<Route path="loading" element={<Loading />} />

					</Route>

				</Routes>

			</Router>
		</div>
	);
}

export default App;
