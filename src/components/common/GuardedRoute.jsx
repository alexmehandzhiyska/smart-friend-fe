import { Navigate, Outlet } from 'react-router-dom';

const UserRoute = () => {
    const user = localStorage.getItem('user');
    return user ? <Outlet /> : <Navigate to="/login" />
}

const GuestRoute = () => {
    const user = localStorage.getItem('user');
    return user ? <Navigate to="/" /> : <Outlet />
}

export { UserRoute, GuestRoute };