import React from "react";
import { motion } from "framer-motion";
import logo from "@/assets/skyscanner-seeklogo.png";
import { Link } from "react-router";
interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <motion.div
      className={`${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link to={"/"} className={`text-2xl font-bold`}>
        <img src={logo} alt="logo" className="w-36 invert brightness-0" />
      </Link>
    </motion.div>
  );
};

export default Logo;
