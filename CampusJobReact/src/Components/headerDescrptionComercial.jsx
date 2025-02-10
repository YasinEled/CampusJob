import { div } from "framer-motion/client";
import "./ComponentsCSS/DescriptionHeaderComercial.css"
function DescriptionHeader() {
  
  return (
    <div>
      <div className="relative top-18 flex items-center justify-center h-full">
        <div className="max-w-lg Description text-center text-[#05302d]">
          <p>Una plataforma que conecta la formación profesional con oportunidades laborales reales, facilitando la gestión privada de ofertas de empleo</p>
        </div>
      </div>
      <div className="comilla1">
        <p>"</p>
      </div>
      <div className="relative top-60 text-[#05302d]">
        <p>"</p>
      </div>
    </div>
  );
}

export default DescriptionHeader;