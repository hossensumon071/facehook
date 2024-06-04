import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError
  } = useForm();

  const submitForm = async (formData) => {
    console.log(formData);

    try {
      // Make an API call
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      );
      // Will Return Tokens and logged in user information

      if (response.status === 200) {
        const { user, token } = response.data;

        if (token) {
          const authToken = token.token;
          const refreshToken = token.refreshToken;

          console.log(
            `login time with auth token ${authToken} and ${refreshToken}`
          );

          setAuth({ user, authToken, refreshToken });
          navigate("/");
          reset();
        }
      }
    } catch (error) {
      console.error(error);
      setError("root.random", {
        type: "random",
        message: `User with email ${formData.email} is not found`
      })
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
    >
      <Field label="email" error={errors.email}>
        <input
          {...register("email", { required: "Email Id is required" })}
          className={`auth-input ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
          name="email"
          type="email"
          id="email"
        />
      </Field>

      <Field label="Password" error={errors.password}>
        <input
          {...register("password", {
            required: "password Id is required",
            minLength: {
              value: 8,
              message: "Your password must be 8 characters",
            },
          })}
          className={`auth-input ${
            errors.password ? "border-red-500" : "border-gray-200"
          }`}
          name="password"
          type="password"
          id="password"
        />
      </Field>

      <button
        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
        type="submit"
      >
        Login
      </button>
      <p className="text-rose-600 text-center py-2">{errors?.root?.random?.message}</p>
    </form>
  );
};

export default LoginForm;
