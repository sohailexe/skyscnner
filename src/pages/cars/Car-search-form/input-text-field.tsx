import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useCallback,
  useState,
} from "react";
import clsx from "clsx";

export interface InputTextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const InputTextField = forwardRef<HTMLInputElement, InputTextFieldProps>(
  (
    { id, label, value, onChange, placeholder = "", className, ...rest },
    ref
  ) => {
    // Add state to track focus
    const [isFocused, setIsFocused] = useState(false);

    // Internal ref for the <input>
    const internalRef = useRef<HTMLInputElement>(null);

    // Expose the input's DOM node to parent via ref
    useImperativeHandle(ref, () => internalRef.current!, []);

    // Handle clicking or keyboard activation on the wrapper
    const handleActivate = useCallback(() => {
      internalRef.current?.focus();
    }, []);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          internalRef.current?.focus();
        }
      },
      []
    );

    // Wrap onChange to extract value
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      },
      [onChange]
    );

    // Add focus handlers
    const handleFocus = useCallback(() => {
      setIsFocused(true);
    }, []);

    const handleBlur = useCallback(() => {
      setIsFocused(false);
    }, []);

    return (
      <div
        role="textbox"
        aria-labelledby={`${id}-label`}
        tabIndex={0}
        className={clsx(
          "bg-white flex flex-col text-black px-4 py-1 rounded-lg cursor-text",
          "hover:shadow-md transition-shadow",
          "outline-2 outline-offset-2",
          {
            "outline outline-sky-300": isFocused, // Apply outline when focused
          },
          "active:outline-sky-300", // mouse-down outline
          "focus-visible:outline-sky-300", // keyboard outline
          className
        )}
        onClick={handleActivate}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <label
          id={`${id}-label`}
          htmlFor={id}
          className="text-gray-600 text-sm font-medium "
        >
          {label}
        </label>
        <input
          id={id}
          ref={internalRef}
          type="text"
          className="border-none outline-none px-0 py-1 text-base w-full"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    );
  }
);

InputTextField.displayName = "InputTextField";
export default React.memo(InputTextField);
