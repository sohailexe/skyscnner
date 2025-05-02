import { useState, FormEvent, ChangeEvent, FocusEvent } from "react";

/**
 * Interface for useForm hook configuration
 */
interface UseFormConfig<T extends Record<string, any>> {
  initialValues: T;
  validate?: (values: T) => Record<string, string>;
  onSubmit: (values: T) => void;
}

/**
 * Interface for useForm hook return value
 */
interface UseFormReturn<T extends Record<string, any>> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (e?: FormEvent) => void;
  resetForm: () => void;
  setFieldValue: (field: keyof T, value: any) => void;
}

/**
 * Custom hook for form handling with validation
 * @param config - Configuration options
 * @returns Form state and handlers
 */
function useForm<T extends Record<string, any>>(
  config: UseFormConfig<T>
): UseFormReturn<T> {
  const { initialValues, validate, onSubmit } = config;

  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setValues({
      ...values,
      [name]: fieldValue,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Handle field blur events
  const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });

    // Validate single field on blur
    if (validate) {
      const validationErrors = validate(values);
      setErrors((prev) => ({
        ...prev,
        [name]: validationErrors[name] || "",
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e?: FormEvent): void => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    setIsSubmitting(true);

    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce<Record<string, boolean>>(
      (acc, key) => {
        acc[key] = true;
        return acc;
      },
      {}
    );
    setTouched(allTouched);

    // Validate all fields on submit
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);

      // Only submit if there are no errors
      if (Object.keys(validationErrors).length === 0) {
        onSubmit(values);
      }

      setIsSubmitting(false);
    } else {
      onSubmit(values);
      setIsSubmitting(false);
    }
  };

  // Reset form to initial values
  const resetForm = (): void => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  // Set specific field value programmatically
  const setFieldValue = (field: keyof T, value: any): void => {
    setValues({
      ...values,
      [field]: value,
    });
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
  };
}

export default useForm;
