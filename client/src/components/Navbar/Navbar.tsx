import { useState, useEffect, useCallback } from "react";
import { motion, useSpring } from "framer-motion";
import { NavLinks } from "./NavLinks";
import { Topbar } from "./Topbar";

/**
 * AnimatedNavbar - auto-hides on scroll down or when pointer is at the very top,
 * reappears on scroll up or hover, with a smooth spring animation.
 */
const Navbar = () => {
  // control visibility
  const [isVisible, setIsVisible] = useState(true);

  // spring-interpolated offset (px)
  const y = useSpring(0, { stiffness: 200, damping: 25 });

  // update spring target whenever isVisible changes
  useEffect(() => {
    y.set(isVisible ? 0 : -100);
  }, [isVisible, y]);

  // handle scroll
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

  // handle mouse at top edge
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (e.clientY < 5) {
        setIsVisible(true);
      }
    },
    [setIsVisible]
  );

  // add listener once
  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  return (
    <motion.nav
      // bind the spring value directly to translateY
      style={{ y }}
      initial={false}
      // keep pointer events on when visible so links are clickable
      onHoverStart={() => setIsVisible(true)}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-dark-blue text-white shadow-md"
    >
      <Topbar />
      <NavLinks />
    </motion.nav>
  );
};

export default Navbar;
