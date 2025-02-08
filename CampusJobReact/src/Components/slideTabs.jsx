import "./ComponentsCSS/nav.css";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export const SlideTabsExample = () => {
  return (
    <div>
      <SlideTabs />
    </div>
  );
};

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="ULPERS relative mx-auto flex w-fit rounded-full bg-gradient-to-br px-4 from-[#05302D] via-white to-[#05302D] bg-[length:200%_200%] bg-[position:50%_50%] p-1"
    >
      <Tab setPosition={setPosition}>Tu Centro</Tab>
      <Tab setPosition={setPosition}>Características</Tab>
      <Tab setPosition={setPosition}>Contactar</Tab>

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-5  py-1.5 font-bold text-[#05302D] duration-500 md:px-5 md:py-3 md:text-2xl hover:text-[#ffffff] "
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-[#05302D] md:h-14 "
    />
  );
};


export default SlideTabsExample;
