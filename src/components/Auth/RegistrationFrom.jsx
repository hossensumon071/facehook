import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const submitForm = async (formData) => {
    console.log(formData);
    try {
        let response = await axios.post(
            `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
            formData
        );

        if (response.status === 201) {
            navigate("/login");
        }
    } catch (error) {
        console.error(error);
        setError("root.random", {
            type: "random",
            message: `Something went wrong: ${error.message}`,
        });
    }
};


  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]"
    >
      {/* First Name */}
      <Field label={"First Name"} error={errors.firstName}>
        <input
          className={`auth-input ${
            errors.firstName ? "border-red-500" : "border-gray-200"
          }`}
          name="firstName"
          type="text"
          id="firstName"
          {...register("firstName", { required: "First name is required" })}
        />
      </Field>

      {/* Last Name */}
      <Field label={"Last Name"} error={errors.lastName}>
        <input
          className={`auth-input ${
            errors.lastName ? "border-red-500" : "border-gray-200"
          }`}
          name="lastName"
          type="text"
          id="lastName"
          {...register("lastName", { required: "Last name is required" })}
        />
      </Field>

      {/* Email */}
      <Field label={"Email"} error={errors.email}>
        <input
          className={`auth-input ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
          name="email"
          type="email"
          id="email"
          {...register("email", { required: "Email is required" })}
        />
      </Field>

      {/* Password */}
      <Field label={"Password"} error={errors.password}>
        <input
          className={`auth-input ${
            errors.password ? "border-red-500" : "border-gray-200"
          }`}
          name="password"
          type="password"
          id="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
      </Field>

      {/* Submit */}
      <button
        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
        type="submit"
      >
        Register
      </button>

      {errors.root && (
        <p className="text-red-600 py-3 text-center">{errors.root.message}</p>
      )}
    </form>
  );
};

export default RegistrationForm;
