import { Navigate, Outlet } from 'react-router-dom';

const UserRoute = () => {
  let user = localStorage.getItem('user');
  const isAuthenticated = user ? true : false;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export { UserRoute };