import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useCallback,
} from "react";
import clsx from "clsx";

export interface InputDateProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "type"
  > {
  id: string;
  label: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
  className?: string;
}

const InputDate = forwardRef<HTMLInputElement, InputDateProps>(
  ({ id, label, value, onChange, className, ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    // Expose the internal input to parent refs
    useImperativeHandle(ref, () => inputRef.current!);

    // Parse string → Date|null
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        // valueAsDate returns a Date or null if empty
        const parsed = e.target.valueAsDate ?? null;
        onChange(parsed);
      },
      [onChange]
    );

    return (
      <div
        role="textbox"
        aria-labelledby={`${id}-label`}
        tabIndex={0}
        onClick={() => inputRef.current?.focus()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.focus();
          }
        }}
        className={clsx(
          "bg-white flex flex-col text-black px-4 py-1 rounded-lg cursor-text",
          "hover:shadow-md transition-shadow",
          "outline-2 outline-offset-2",
          { "outline outline-sky-300": isFocused },
          "active:outline-sky-300",
          "focus-visible:outline-sky-300",
          className
        )}
      >
        <label
          id={`${id}-label`}
          htmlFor={id}
          className="text-gray-600 text-sm font-medium mb-1"
        >
          {label}
        </label>
        <input
          id={id}
          ref={inputRef}
          type="date"
          className="border-none outline-none px-0 py-1 text-base w-full"
          value={value ? value.toISOString().slice(0, 10) : ""}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
      </div>
    );
  }
);

InputDate.displayName = "InputDate";
export default React.memo(InputDate);
