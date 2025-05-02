import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 24 },
  },
};

export interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}

export function TextInput({
  id,
  label,
  value,
  onChange,
  placeholder = "Country, city or airport",
  className = "",
  error,
}: TextInputProps) {
  return (
    <motion.div
      className={`bg-white px-2 py-1 md:px-4 md:py-3 ${className}`}
      variants={itemVariants}
    >
      <Label htmlFor={id} className="text-sm text-gray-500 block mb-1">
        {label}
      </Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`border-0 p-0 bg-white text-black font-medium focus-visible:ring-0 h-auto ${
          error ? "border-b border-red-500" : ""
        }`}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-red-500 mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
