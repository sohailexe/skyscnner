import React from "react";
import { motion } from "framer-motion";

const SocialLogin: React.FC = () => {
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2  text-gray-500 bg-white rounded-2xl">
            Or continue with
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <motion.button
          type="button"
          className="bg-white/90 py-2 px-4 rounded-md border border-gray-300 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            className="mx-auto"
          >
            <path
              d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z"
              fill="#1877F2"
            />
            <path
              d="M13.232 17.5V12.243H14.882L15.127 10.307H13.232V9.06C13.232 8.471 13.392 8.073 14.232 8.073H15.193V6.341C14.519 6.277 13.843 6.244 13.166 6.243C11.422 6.243 10.231 7.302 10.231 8.856V10.307H8.592V12.243H10.231V17.5H13.232Z"
              fill="white"
            />
          </svg>
        </motion.button>

        <motion.button
          type="button"
          className="bg-white/90 py-2 px-4 rounded-md border border-gray-300 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            className="mx-auto"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        </motion.button>

        <motion.button
          type="button"
          className="bg-white/90 py-2 px-4 rounded-md border border-gray-300 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            className="mx-auto"
          >
            <path
              d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.18 14.4 3.19 6.87 9.31 6.53c1.37.05 2.36.82 3.2.88.91-.09 2.09-.98 3.69-.84 1.33.12 2.36.58 3.06 1.39-2.81 1.89-2.04 5.84.58 7.04-.66 1.7-1.56 3.34-2.79 5.28zM9.32 6.53c-.15-3.2 2.32-6.01 5.3-5.8.23 3.37-2.75 6.51-5.3 5.8z"
              fill="black"
            />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default SocialLogin;
