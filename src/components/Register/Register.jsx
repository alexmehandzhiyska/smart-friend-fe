import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { useForm } from "react-hook-form";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const registerUser = (data) => {
        authService.register(data)
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
            <form method="POST" onSubmit={handleSubmit(registerUser)}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" {...register('username')} />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" {...register('email')} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" {...register('password')} />

                <input type="submit" value="Submit" />
            </form>
        </section>
    );
}

export default Register;