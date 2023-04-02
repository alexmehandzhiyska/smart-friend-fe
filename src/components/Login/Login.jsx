import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';

import './Login.css';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const loginUser = (data) => {
        authService.login(data)
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res));
                navigate('/');
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <section className="content-wrapper">
            <form method="POST" onSubmit={handleSubmit(loginUser)}>
                <h1 className="title">Welcome back</h1>
                <TextField type="username" id="username" name="username" {...register('username')} label="Username" variant="outlined" sx={{my: 2}} color="success"></TextField>
                <TextField type="password" id="password" name="password" {...register('password')} label='Password' variant="outlined" sx={{my: 2}} color="success"></TextField>
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
                <input type="submit" value="Submit" className="submit primary-btn"/>
            </form>
        </section>
    );
}

export default Login;