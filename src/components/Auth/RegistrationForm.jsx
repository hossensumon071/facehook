import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitForm = (data) => {
    console.log(data);
    reset();
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]"
    >
      {/* <!-- name --> */}
      <Field label="name" error={errors.name}>
        <input
          {...register("name", { required: "name is required" })}
          className={`auth-input ${
            errors.name ? "border-red-500" : "border-gray-200"
          }`}
          name="name"
          type="text"
          id="name"
        />
      </Field>
      {/* <!-- email --> */}
      <Field label="Email" error={errors.email}>
        <input
          {...register("email", { required: "email ID is required" })}
          className={`auth-input ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
          name="email"
          type="email"
          id="email"
        />
      </Field>
      {/* <!-- password --> */}
      <Field label="Password">
        <input
          {...register("password", { required: "password is required" })}
          className={`auth-input ${
            errors.password ? "border-red-500" : "border-gray-200"
          }`}
          name="password"
          type="password"
          id="password"
        />
      </Field>
      {/* <!-- confirm password --> */}
      <Field label="Retype Password">
        <input
          {...register("confirmPassword", { required: "password is required" })}
          className={`auth-input ${
            errors.confirmPassword ? "border-red-500" : "border-gray-200"
          }`}
          name="confirmPassword"
          type="password"
          id="confirmPassword"
        />
      </Field>
      {/* <!-- Submit --> */}
      <button
        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
