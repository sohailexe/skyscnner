import React, { useRef, useState, useEffect } from "react";
import Layout from "../Utility/Layout";
import { Subnavigations } from "./index";
import { Link } from "react-scroll";
import gsap from "gsap";

interface SubnavigationItem {
  to: string;
  offset: number;
  label: string;
}

const SubNavBar: React.FC = () => {
  const [stickyNav, setStickyNav] = useState<boolean>(false);
  const container = useRef<HTMLDivElement>(null);

  const handleControl = () => {
    const position = window.scrollY;
    console.log(position);

    if (position > 600) {
      setStickyNav(true);
    } else if (position <= 800) {
      setStickyNav(false);
    }
  };

  useEffect(() => {
    if (stickyNav && container.current) {
      gsap.fromTo(container.current, { y: -150 }, { y: 0, top: 0 });
    }
  }, [stickyNav]);
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleControl);
    return () => window.removeEventListener("scroll", handleControl);
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <div
          ref={container}
          className={`${
            stickyNav
              ? "fixed top-0 left-0 w-full z-40 px-48 bg-white"
              : "relative"
          } z-30 flex items-center justify-between border-b border-zinc-300`}
        >
          <div className="flex gap-6">
            {(Subnavigations as SubnavigationItem[]).map((data, index) => (
              <Link
                to={data.to}
                duration={500}
                isDynamic={true}
                smooth={true}
                spy={true}
                hashSpy={true}
                offset={data.offset}
                activeClass="border-b-2 border-blue-500 !text-primary-or"
                key={index}
                className="cursor-pointer pt-7 pb-5 hover:text-primary-or border-primary-or font-medium tracking-wider"
              >
                {data.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-5 font-medium">
            <h1 className="text-4xl">Rs 3,643</h1>
            <button className="text-white text-Text bg-Primaray_Color py-2 px-3 rounded-md">
              View Deals
            </button>
          </div>
        </div>
        {/* <NavCard /> */}
      </div>
    </Layout>
  );
};

export default SubNavBar;
