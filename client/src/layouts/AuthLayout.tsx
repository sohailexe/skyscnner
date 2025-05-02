import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../components/Logo";
import Navbar from "@/components/Navbar/Navbar";

const travelImageUrls: string[] = [
  "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg",
  "https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg",
  "https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg",
];
const AuthLayout: React.FC = () => {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % travelImageUrls.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[100vh] overflow-hidden relative ">
      {/* Background Images */}
      {travelImageUrls.map((bg, index) => (
        <div
          key={bg}
          className={`absolute inset-0  bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
            index === currentBg ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${bg})` }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 h-full flex flex-col items-center">
        {/* Header */}
        <Navbar />
        <div className="py-12 bg-dark-blue"></div>

        <Logo className="mt-8" />
        {/* Main Content */}
        <div className="flex-1 w-full flex items-center justify-center p-6">
          <Outlet />
        </div>

        {/* Footer */}
        <motion.footer
          className="w-full p-4 text-center text-white/80 text-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p>
            &copy; {new Date().getFullYear()} Skyscanner Ltd. All rights
            reserved.
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default AuthLayout;
