import "./ComponentsCSS/TargetaPublicidad.css"
import { motion } from "framer-motion";
function Targeta() {
  
  return (
    <div className="tarjeta-principal  " >
        <div className="absolute inset-x-1/2 transform -translate-x-1/2 targeta-container  " >
            <div className="targeta-CV">
              <p className="CV">CV</p>
            </div>
            <div className="targeta-principal  " >
              <div className="targeta-User">
                <svg className="logoUser" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 448 512"><path fill="#05302d4d" d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"/></svg>              
              </div>
              <div className="targeta-secundaria">
              </div>
              <div className="targeta-secundaria">

              </div>
              <div>

              </div>
            </div>
        </div>
        <motion.div style={{ transform: "scale(0.8)" }} className="absolute right-0 targeta-containerR  top-30 overflow-hidden  w-screen h-screen"  initial={{ rotate: 12 , x: 100 }}>
            <div className="targeta-CV">
              <p className="CV">CV</p>
            </div>
            <div className="targeta-principal">
              <div className="targeta-User">
                <svg className="logoUser" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 448 512"><path fill="#05302d4d" d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"/></svg>              
              </div>
              <div className="targeta-secundaria">
              </div>
              <div className="targeta-secundaria">

              </div>
              <div>

              </div>
            </div>
        </motion.div>
        <motion.div className=" absolute targeta-containerL top-30 "  initial={{ rotate: -12 , x: -100 }} >
            <div className="targeta-CV">
              <p className="CV">CV</p>
            </div>
            <div className="targeta-principal">
              <div className="targeta-User">
                <svg className="logoUser" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 448 512"><path fill="#05302d4d" d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"/></svg>              
              </div>
              <div className="targeta-secundaria">
              </div>
              <div className="targeta-secundaria">

              </div>
              <div>

              </div>
            </div>
        </motion.div>
    </div>
  );
}

export default Targeta;