import "./ComponentsCSS/nav.css";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

function  NavHamburguer() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
    setIsOpen(!isOpen);
    };
    return (
        <div className="LinkNavHamburguer md:hidden">
            <button 
                onClick={toggleMenu} 
                className="flex-col z-1 justify-center w-10 h-10 bg-transparent border-none cursor-pointer"
            >
                <span className={`block w-8 h-0.5 bg-white mb-1 transition-all duration-300 transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-8 h-0.5 bg-white mb-1 transition-all duration-300 transform ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-8 h-0.5 bg-white transition-all duration-300 transform ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </button>
            {isOpen && (
                <ul className="linkHamburguer left-0 ">
                    <li className={`text-white cursor-pointer px-4 py-2 ${isOpen ? 'show' : ''}`}>Tu Centro</li>
                    <li className={`text-white cursor-pointer px-4 py-2 ${isOpen ? 'show' : ''}`}>Características</li>
                    <li className={`text-white cursor-pointer px-4 py-2 ${isOpen ? 'show' : ''}`}>Contactar</li>
                </ul>
            )}
        </div>
    );
};

export default NavHamburguer;
