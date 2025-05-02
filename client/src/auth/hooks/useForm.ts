import { useState, ChangeEvent, FormEvent } from "react";

interface FormErrors {
  [key: string]: string;
}

interface UseFormProps<T> {
  initialValues: T;
  validate?: (values: T) => FormErrors;
  onSubmit: (values: T) => void;
}

function useForm<T>({ initialValues, validate, onSubmit }: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    // Clear error when user starts typing in a field that had an error
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleBlur = (e: { target: { name: string } }) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });

    // Validate single field on blur
    if (validate) {
      const validationErrors = validate(values);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validationErrors[name] || "",
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
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
    } else {
      onSubmit(values);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
}

export default useForm;
