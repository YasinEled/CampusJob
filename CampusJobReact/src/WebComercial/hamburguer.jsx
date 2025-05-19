import "./Style/nav.css";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

function  NavHamburguer() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
    setIsOpen(!isOpen);
    };
    return (
        <div className="LinkNavHamburguer flex-col">
            <div className="z-2">
                <button 
                    onClick={toggleMenu} 
                    className="w-10 h-10 bg-transparent cursor-pointer"
                >
                    <span className={`block w-8 h-0.5 bg-white mb-1 transition-all duration-300 transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-8 h-0.5 bg-white mb-1 transition-all duration-300 transform ${isOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-8 h-0.5 bg-white transition-all duration-300 transform ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
                </button>
            </div>
            <div className={`linkHamburguer z-0 f ${isOpen ? 'show' : ''}`}>
                {isOpen && (
                    <ul className="flex flex-col">
                        <a className="text-white cursor-pointer px-4 py-2" href="/#">Tu Centro</a>
                        <a className="text-white cursor-pointer px-4 py-2" href="/#">Características</a>
                        <a className="text-white cursor-pointer px-4 py-2" href="/#">Contactar</a>
                    </ul>
                )}
            </div>
            
        </div>
    );
};

export default NavHamburguer;
