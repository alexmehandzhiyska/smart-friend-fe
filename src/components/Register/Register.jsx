import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { useForm } from "react-hook-form";

import "./Register.css";

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
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              {...register("username")}
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              {...register("email")}
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              {...register("password")}
            />

            <input className="submit" type="submit" value="Submit" />
          </form>
        </section>
      </article>
    </section>
  );
};

export default Register;
