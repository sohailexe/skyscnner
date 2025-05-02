import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="mb-4">
      <label 
        htmlFor={id} 
        className="block text-gray-700 font-medium mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="relative">
        <motion.input
          id={id}
          type={inputType}
          className={`auth-input ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
          }}
          required={required}
          whileFocus={{ scale: 1.01 }}
          animate={{ 
            boxShadow: isFocused ? '0 0 0 3px rgba(7, 112, 227, 0.2)' : 'none'
          }}
        />
        
        {type === 'password' && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      
      {error && (
        <motion.p 
          className="input-error"
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