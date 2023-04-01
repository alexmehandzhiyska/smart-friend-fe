import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';

import './Login.css'

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
                
                <TextField type="username" id="username" name="username" {...register('username')} label="Username" variant="outlined"></TextField>
                <label htmlFor="username">Username</label>

                
                <input type="password" id="password" name="password" {...register('password')} autoComplete='off'/>
                <label htmlFor="password">Password</label>

                <input type="submit" value="Submit" />
            </form>
        </section>
    );
}

export default Login;