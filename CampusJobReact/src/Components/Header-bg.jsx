import "./ComponentsCSS/headerBg.css";

function HeaderBg() {
    return (
        <div className="absolute  fondo  items-center justify-center">
            <div className="absolute top-100 left-20 w-166 h-90  rounded-full bola-Rosa"></div>

            <div className="absolute topp right-15  h-130 w-200 rounded-full bola-Rosa"></div>
            <div className="absolute topp right-150 h-145 w-200 rounded-full bola-Amarilla"></div>
            <div className="absolute topp left-20 w-166 h-90 rounded-full bola-Azul"></div>

            <div className="absolute inset-0 borosso"></div>
        </div>
    );
};

export default HeaderBg;
