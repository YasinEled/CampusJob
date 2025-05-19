import "./Style/nav.css";
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


  // EL CONTENEDOR DE TODO

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="ULPERS LinkNav relative mx-auto flex w-fit rounded-full bg-gradient-to-br px-4 from-[#05302D] via-[#ffffffd7] to-[#05302D] bg-[length:200%_200%] bg-[position:50%_50%] p-1"
    >
      <Tab setPosition={setPosition} href="/#">Tu Centro</Tab>
      <Tab setPosition={setPosition} href="google.com">Características</Tab>
      <Tab setPosition={setPosition} href="#">Contactar</Tab>

      <Cursor position={position} />
    </ul>
  );
};


// ESTO SON LAS PALABRAS

const Tab = ({ children, setPosition, href }) => {
  const ref = useRef(null);

  return (
    <a
      ref={ref}
      href={href}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer py-1.5 font-bold  duration-500 md:px-5 md:py-2 md:text-base hover:text-white">
      {children}
    </a>
  );
};


// LO QUE SE MUEVE DENTRO

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-5 rounded-full no-underline bg-[#05302D] md:h-10 "
    />
  );
};


export default SlideTabsExample;
