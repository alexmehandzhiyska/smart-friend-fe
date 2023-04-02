import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';

import authService from '../../services/authService';

import './Register.css';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const registerUser = (data) => {
    authService
      .register(data)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="content-wrapper">
      <article className="avatar-wrapper">
        <img
          src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
          className="avatar"
          alt=""
        />
      </article>

      <article className="form-wrapper">
        <section>
          <h1 className="title">Create your account</h1>

          <form method="POST" onSubmit={handleSubmit(registerUser)}>
            <TextField type="text" id="username" name="username" {...register("username")} label="Username" variant="outlined" sx={{my: 2}} color="success"></TextField>
            <TextField type="email" id="email" name="email" {...register("email")} label="Email" variant="outlined" sx={{my: 2}} color="success"></TextField>
            <TextField type="password" id="password" name="password" {...register("password")} label="Password" variant="outlined" sx={{my: 2}} color="success"></TextField>

            <p>Already have an account? <Link to="/login">Log in here</Link></p>
            <input type="submit" value="Submit" className="submit primary-btn" />
          </form>
        </section>
      </article>
    </section>
  );
};

export default Register;
