import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FormInput from "./components/FormInput";
import SocialLogin from "./components/SocialLogin";
import useForm from "./hooks/useForm";

interface LoginValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const initialValues: LoginValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const validate = (values: LoginValues) => {
    const errors: Record<string, string> = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const handleSubmit = (values: LoginValues) => {
    console.log("Login values:", values);
    // Here you would typically call an API to authenticate the user
    alert("Login successful! (This is a demo)");
  };

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit: submitForm,
  } = useForm({
    initialValues,
    validate,
    onSubmit: handleSubmit,
  });

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="auth-card"
        whileHover={{
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-800">Welcome back</h2>
          <p className="text-gray-600 mt-2">Sign in to access your account</p>
        </motion.div>

        <form onSubmit={submitForm}>
          <FormInput
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            required
          />

          <FormInput
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            required
          />

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                checked={values.rememberMe}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "rememberMe",
                      value: e.target.checked,
                    },
                  } as unknown as React.ChangeEvent<HTMLInputElement>)
                }
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="auth-link">
                Forgot password?
              </a>
            </div>
          </div>

          <motion.button
            type="submit"
            className="auth-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign in
          </motion.button>
        </form>

        <SocialLogin />

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="auth-link">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
