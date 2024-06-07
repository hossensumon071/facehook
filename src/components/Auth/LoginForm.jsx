import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import axios from "axios";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const onSubmit = async (data) => {
    try {
      //  make an api call
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        data
      );
      // will return tokens and logged in user information
      if (res.status === 200) {
        const { user, token } = res.data;
        if (token) {
          const authToken = token.token;
          const refreshToken = token.refreshToken;

          // console.log("login with  token", authToken, refreshToken);
          setAuth({ user, authToken, refreshToken });
          navigate("/");
          reset();
        }
      }
    } catch (error) {
      return setError("root.random", {
        type: "random",
        message: `User with email ${data.email} is not found`,
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='border-b border-[#3F3F3F] pb-10 lg:pb-[60px]'
    >
      {/* <!-- email --> */}

      <Field label={"email"} error={errors.email}>
        <input
          className={`auth-input ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
          name='email'
          type='email'
          id='email'
          {...register("email", { required: "emial is required" })}
        />
      </Field>
      {/* <!-- password --> */}
      <Field label={"password"} error={errors.password}>
        <input
          className={`auth-input ${
            errors.password ? "border-red-500" : "border-gray-200"
          }`}
          name='password'
          type='password'
          id='password'
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
      </Field>

      {/* <!-- Submit --> */}
      <button
        className='auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90'
        type='submit'
      >
        Login
      </button>
      {errors && (
        <p className='text-red-600 py-3 text-center'>
          {errors?.root?.random?.message}
        </p>
      )}
    </form>
  );
};

export default LoginForm;
