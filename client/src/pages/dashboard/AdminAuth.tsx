import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import useForm from "../../hooks/useForm";
import FormInput from "@/components/auth/components/FormInput";
import { useMutation } from "@tanstack/react-query";
import axios from "@/api/axios";
import { toast } from "sonner";

interface AdminFormValues {
  email: string;
  password: string;
}

const AdminAuth = () => {
  const initialValues: AdminFormValues = {
    email: "",
    password: "",
  };

  const { mutate: adminChecker, isPending } = useMutation({
    mutationKey: ["admin-auth"],
    mutationFn: async (values: AdminFormValues) => {
      const { data } = await axios.post("/dashboard/admin-auth", values, {
        withCredentials: true,
      });
      return data;
    },
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (err: any) => {
      toast.error(err.response.data.message || "Something went wrong");
    },
  });
  const navigate = useNavigate();

  const validate = (values: AdminFormValues): Record<string, string> => {
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

  const handleSubmit = async (values: AdminFormValues): Promise<void> => {
    await adminChecker(values);
  };

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit: submitForm,
  } = useForm<AdminFormValues>({
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
        className="p-6 bg-white rounded-lg shadow-lg"
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
          <h2 className="text-3xl font-bold text-gray-800">
            Admin Panel Access
          </h2>
          <p className="text-gray-600 mt-2">Sign in to manage the platform</p>
        </motion.div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          <FormInput
            id="email"
            name="email"
            label="Admin Email"
            type="email"
            placeholder="admin@example.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            required
            autoComplete="email"
          />

          <FormInput
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            required
            autoComplete="current-password"
          />

          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            {isPending ? "Authenticating..." : "Enter Admin Panel"}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Not an admin?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Return to site
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminAuth;
