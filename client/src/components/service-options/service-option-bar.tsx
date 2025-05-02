import { CarIcon, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

interface ServiceButtonProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  index: number;
}

const ServiceButton = ({ icon, label, href, index }: ServiceButtonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to={href}
        className="bg-dark-blue hover:bg-light-blue/75 
        text-md md:text-lg text-white cursor-pointer flex gap-2 px-4 py-5 md:px-6 md:py-7 rounded-lg transition-colors duration-150 ease-in flex-col items-center justify-start text-start md:flex-row w-full h-full"
      >
        <motion.span
          whileHover={{ rotate: 10 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {icon}
        </motion.span>
        {label}
      </Link>
    </motion.div>
  );
};

const ServiceOptionBar = () => {
  const services = [
    { icon: <Globe size={24} />, label: "Hotels", href: "/hotels" },
    { icon: <CarIcon size={24} />, label: "Car hire", href: "/cars" },
    {
      icon: <Globe size={24} />,
      label: "Explore everywhere",
      href: "/flights",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="maxScreen grid grid-cols-1 sm:grid-cols-3 justify-center gap-4 flex-wrap mt-12"
    >
      {services.map((service, index) => (
        <ServiceButton
          key={index}
          icon={service.icon}
          label={service.label}
          href={service.href}
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default ServiceOptionBar;
