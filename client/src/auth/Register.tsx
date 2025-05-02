import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FormInput from "./components/FormInput";
import SocialLogin from "./components/SocialLogin";
import useForm from "./hooks/useForm";

interface RegisterValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

const Register: React.FC = () => {
  const initialValues: RegisterValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  };

  const validate = (values: RegisterValues) => {
    const errors: Record<string, string> = {};

    if (!values.firstName) {
      errors.firstName = "First name is required";
    }

    if (!values.lastName) {
      errors.lastName = "Last name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(values.password)) {
      errors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!values.agreeTerms) {
      errors.agreeTerms = "You must agree to the terms and conditions";
    }

    return errors;
  };

  const handleSubmit = (values: RegisterValues) => {
    console.log("Register values:", values);
    // Here you would typically call an API to create the user
    alert("Registration successful! (This is a demo)");
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
          <h2 className="text-3xl font-bold text-gray-800">Create account</h2>
          <p className="text-gray-600 mt-2">
            Join Skyscanner to start your journey
          </p>
        </motion.div>

        <form onSubmit={submitForm}>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              id="firstName"
              label="First Name"
              type="text"
              placeholder="John"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.firstName}
              required
            />

            <FormInput
              id="lastName"
              label="Last Name"
              type="text"
              placeholder="Doe"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.lastName}
              required
            />
          </div>

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

          <FormInput
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirmPassword}
            required
          />

          <div className="mb-6">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={values.agreeTerms}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "agreeTerms",
                        value: e.target.checked,
                      },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                />
              </div>
              <div className="ml-3">
                <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="auth-link">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="auth-link">
                    Privacy Policy
                  </a>
                </label>
                {errors.agreeTerms && (
                  <p className="input-error">{errors.agreeTerms}</p>
                )}
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            className="auth-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Create account
          </motion.button>
        </form>

        <SocialLogin />

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Register;
