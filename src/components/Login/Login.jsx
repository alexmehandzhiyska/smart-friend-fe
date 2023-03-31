import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { useForm } from 'react-hook-form';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const loginUser = (data) => {
        authService.login(data)
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res));
                console.log(res);
                // navigate('/');
            })
            .catch(err => {
                console.log(err);
            })
    }
    
    return (
        <section>
            <form method="POST" onSubmit={handleSubmit(loginUser)}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" {...register('email')} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" {...register('password')} />

                <input type="submit" value="Submit" />
            </form>
        </section>
    );
}

export default Login;