import { motion } from "framer-motion";
import "./Style/DescriptionHeaderComercial.css";

function DescriptionHeader() {
  return (
    <motion.div className="description-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div className="quote-left" initial={{ rotate: 0 }} animate={{ rotate: 15 }} transition={{ duration: 2 }}>
        <h1>“</h1>
      </motion.div>
      
      <motion.div className="description-center">
        <p>
          Una plataforma que conecta la formación profesional con oportunidades laborales reales, facilitando la gestión privada de ofertas de empleo
        </p>
      </motion.div>
      
      <motion.div className="quote-right " initial={{ rotate: 0 }} animate={{ rotate: 15 }} transition={{ duration: 2 }}>
        <h1>”</h1>
      </motion.div>
    </motion.div>
  );
}

export default DescriptionHeader;
