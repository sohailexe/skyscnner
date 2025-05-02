import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight, Home } from "lucide-react";

interface PathSegment {
  name: string;
  path: string;
  isLast: boolean;
}

interface DynamicBreadcrumbProps {
  className?: string;
  colorScheme?: "light" | "dark" | "gradient";
}

// Enhanced mapping for prettier route names
const routeNameMap: Record<string, string> = {
  "": "Home",
  flights: "Flights",
  hotels: "Hotels",
  cars: "Car Rental",
  destinations: "Destinations",
  booking: "Reservation",
  checkout: "Payment",
  account: "My Account",
  support: "Help Center",
  login: "Sign In",
  register: "Sign Up",
  // Add more mappings as needed
};

const DynamicBreadcrumb: React.FC<DynamicBreadcrumbProps> = ({
  className = "",
  colorScheme = "light",
}) => {
  const location = useLocation();
  const [pathSegments, setPathSegments] = useState<PathSegment[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Get color scheme classes
  const getColorClasses = () => {
    switch (colorScheme) {
      case "dark":
        return "bg-gray-800 text-white";
      case "gradient":
        return "bg-gradient-to-r from-blue-500 to-purple-600 text-white";
      case "light":
      default:
        return "bg-white/90 text-gray-800";
    }
  };

  useEffect(() => {
    const pathname = location.pathname;

    // Split the pathname and process each segment
    const segments = pathname.split("/").filter((segment) => segment !== "");

    // Create path segments with accumulated paths
    const processedSegments: PathSegment[] = [
      {
        name: routeNameMap[""] || "Home",
        path: "/",
        isLast: segments.length === 0,
      },
    ];

    let currentPath = "";

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;
      const displayName =
        routeNameMap[segment] ||
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

      processedSegments.push({
        name: displayName,
        path: currentPath,
        isLast,
      });
    });

    setPathSegments(processedSegments);

    // Delay visibility for entrance animation
    setTimeout(() => setIsVisible(true), 100);

    return () => {
      setIsVisible(false);
    };
  }, [location.pathname]);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 1,
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 110,
        damping: 20,
        mass: 0.8,
        delay: i * 0.07,
      },
    }),
  };

  const separatorVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: i * 0.07 + 0.05,
      },
    }),
  };

  const activeLinkVariants = {
    initial: { color: "#64748b" },
    hover: {
      color: colorScheme === "light" ? "#3b82f6" : "#93c5fd",
      scale: 1.03,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.97 },
  };

  const lastItemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
        delay: pathSegments.length * 0.1,
      },
    },
  };

  // Don't show if only home or empty
  if (pathSegments.length <= 1) return null;

  return (
    <div
      className={`relative overflow-hidden maxScreen text-2xl  ${getColorClasses()} ${className}`}
    >
      <Breadcrumb className="max-w-full">
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full flex items-center"
            >
              <BreadcrumbList>
                {pathSegments.map((segment, index) => (
                  <motion.div
                    key={segment.path}
                    custom={index}
                    variants={itemVariants}
                    className="inline-flex items-center"
                  >
                    <BreadcrumbItem>
                      {!segment.isLast ? (
                        <BreadcrumbLink asChild>
                          <motion.div
                            variants={activeLinkVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            className="flex items-center gap-1"
                          >
                            {index === 0 && <Home className="w-4 h-4 mr-1" />}
                            <Link
                              to={segment.path}
                              className="hover:underline transition-all duration-300"
                            >
                              {segment.name}
                            </Link>
                          </motion.div>
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>
                          <motion.span
                            variants={lastItemVariants}
                            className={`font-medium ${
                              colorScheme === "light"
                                ? "text-blue-600"
                                : "text-blue-200"
                            }`}
                          >
                            {segment.name}
                          </motion.span>
                        </BreadcrumbPage>
                      )}
                    </BreadcrumbItem>

                    {index < pathSegments.length - 1 && (
                      <motion.div custom={index} variants={separatorVariants}>
                        <BreadcrumbSeparator>
                          <ChevronRight className="w-4 h-4 mx-1" />
                        </BreadcrumbSeparator>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </BreadcrumbList>
            </motion.div>
          )}
        </AnimatePresence>
      </Breadcrumb>
    </div>
  );
};

export default DynamicBreadcrumb;
