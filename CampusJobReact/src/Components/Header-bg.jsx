import "./ComponentsCSS/headerBg.css";

function HeaderBg() {
    return (
        <div className="absolute   w-full py-10 h-full  overflow-hidden items-center justify-center">
            <div className="absolute left-20   rounded-full bola-Rosa1"></div>

            <div className="absolute  right-15  rounded-full bola-Rosa"></div>
            <div className="absolute  right-150  rounded-full bola-Amarilla"></div>
            <div className="absolute  left-20  rounded-full bola-Azul"></div>

            <div className="absolute inset-0 borosso"></div>
        </div>
    );
};

export default HeaderBg;
