import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../ComponentsCSS/MenuCentros/MenuCentros.css";


export default function MenuCentros() {
  const navigate = useNavigate();
  const [centros, setCentros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCentros = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/centro/all');
        const data = await response.json();

        if (data.success) {
          setCentros(data.data);
        } else {
          setError(data.message || 'No se pudieron cargar los centros');
        }
      } catch (err) {
        setError('Error al conectar con el servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchCentros();
  }, []);

  const handleVerInformacion = (id) => {
    navigate(`/Admin/HomeCursos/${id}`);
  };

  return (
    <div className="MenuAdminContenedor">
      <h1>Centros Disponibles</h1>

      {loading && <p>Cargando centros...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="CentroList">
        {centros.map((centro) => (
          <div 
            key={centro.idcentro} 
            className="CentroCard" 
            onClick={() => handleVerInformacion(centro.idcentro)}
          >
            <div className="CentroInfo">
              <h3 className="CentroNombre">{centro.nombreCentro}</h3>
              <p>ID Admin: {centro.idUsrAdmin}</p>
              <p>Usuario: {centro.adminNombre}</p>
            </div>
            {centro.logoCentro ? (
              <img 
                src={centro.logoCentro} 
                alt="Logo del centro" 
                className="CentroImagen"
              />
            ) : (
              <div className="CentroImagenPlaceholder">Sin logo</div>
            )}
          </div>
        ))}

        {/* Botón de añadir centro */}
        <button 
          className="BotonAñadirCentro" 
          onClick={() => navigate("/AdminSupremo/añadirCentro")}
        >
          Añadir Centro
        </button>
      </div>
    </div>
  );
}