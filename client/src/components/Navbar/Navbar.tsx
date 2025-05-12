import { useState, useEffect, useCallback } from "react";
import { motion, useSpring } from "framer-motion";
import { NavLinks } from "./NavLinks";
import { Topbar } from "./Topbar";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);

  const y = useSpring(0, { stiffness: 200, damping: 25 });

  useEffect(() => {
    y.set(isVisible ? 0 : -50);
  }, [isVisible, y]);

  useEffect(() => {
    let prevY = window.scrollY;
    const onScroll = () => {
      const currY = window.scrollY;
      if (currY < prevY) {
        setIsVisible(true);
      } else if (currY > 100 && currY > prevY) {
        setIsVisible(false);
      }
      prevY = currY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (e.clientY < 5) {
        setIsVisible(true);
      }
    },
    [setIsVisible]
  );

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  return (
    <motion.nav
      style={{ y }}
      initial={false}
      onHoverStart={() => setIsVisible(true)}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-dark-blue text-white shadow-md"
    >
      <Topbar />
      <NavLinks />
    </motion.nav>
  );
};

export default Navbar;
