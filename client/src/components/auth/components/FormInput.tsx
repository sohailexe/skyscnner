import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion, HTMLMotionProps } from "framer-motion";

/**
 * Props for the FormInput component
 */
interface FormInputProps {
  id: string;
  name?: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  className?: string;
  autoComplete?: string;
  // Add any additional props you need from HTMLMotionProps
  [key: string]: any; // This allows other props to pass through
}

/**
 * Enhanced FormInput component with animation and password visibility toggle
 */
const FormInput: React.FC<FormInputProps> = ({
  id,
  name = id, // Default name to id if not provided
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  autoComplete,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  // Define motion input props separately to ensure type safety
  const motionInputProps: HTMLMotionProps<"input"> = {
    id,
    name,
    type: inputType,
    className: `w-full px-3 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              ${error ? "border-red-500 focus:ring-red-500" : ""} 
              ${className}`,
    placeholder,
    value,
    onChange,
    onFocus: () => setIsFocused(true),
    onBlur: (e) => {
      setIsFocused(false);
      if (onBlur) onBlur(e as React.FocusEvent<HTMLInputElement>);
    },
    required,
    autoComplete,
    animate: {
      boxShadow: isFocused ? "0 0 0 3px rgba(7, 112, 227, 0.2)" : "none",
    },
    whileFocus: { scale: 1.01 },
    ...props,
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <motion.input {...motionInputProps} />

        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={togglePasswordVisibility}
            tabIndex={-1} // Prevent tab focus on this button
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {error && (
        <motion.p
          className="mt-1 text-sm text-red-600"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default FormInput;
