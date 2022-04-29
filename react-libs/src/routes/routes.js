import Dashboard from '../Components/Dashboard'
import Login from '../Components/Login'
import Register from '../Components/Register'


const routes = [
    { path: '/', exact: true, name: 'Admin' },
    { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/login', exact: true, name: 'Login', component: Login },
    { path: '/register', exact: true, name: 'Register', component: Register },

];

export default routes;