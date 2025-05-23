import React, { useState } from "react";
import "./Style/CreateOfertas.css";

function FormOfertas() {
  const [formData, setFormData] = useState({
    titoloferta: "",
    descripciooferta: "",
    tipusjornada: "",
    horessetmanals: "",
    numplacesvacants: "",
    presencial: true,
    salariesperat: "",
    fechafin: "",
    imgoferte: "", // opcional
    documentadjunto: "", // opcional
    idusrpublica: 1, // este valor deberías obtenerlo del login
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://campusjobbackend.onrender.com/api/crearOferta",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert("Oferta creada con éxito");
      } else {
        alert("Error al crear la oferta: " + data.message);
      }
    } catch (error) {
      console.error("Error al enviar la oferta:", error);
      alert("Hubo un error al enviar la oferta.");
    }
  };

  return (
    <div className="ContainerFormOfertas">
      <h1 className="tituloOfertas">AÑADIR OFERTA DE TRABAJO</h1>
      <div className="continerformOfertasCentral">
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", gap: "2em", width: "100%" }}
        >
          <div className="formOfertasLeft">
            <label htmlFor="titulo">Título de puesto *</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "44%" }}>
                <label htmlFor="telefono">Teléfono de contacto *</label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={{ width: "44%" }}>
                <label htmlFor="ubicacion">Ubicación *</label>
                <input
                  type="text"
                  id="ubicacion"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "44%" }}>
                <label htmlFor="sector">Jornada *</label>
                <select
                  id="sector"
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  required
                >
                  <option value="">Tipus jornada</option>
                  <option value="completa">completa</option>
                  <option value="completa">Mitjana</option>
                  <option value="Nocturno">Nocturno</option>
                </select>
              </div>
              <div style={{ width: "44%" }}>
                <label htmlFor="telefono">Hores Setmanals *</label>
                <input
                  type="number"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <label htmlFor="descripcion">Descripción de la oferta *</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              style={{ resize: "none", height: "227px" }}
            ></textarea>

            <label htmlFor="experiencia">Experiencia mínima</label>
            <input
              type="range"
              id="experiencia"
              name="experiencia"
              min="0"
              max="50"
              step="1"
              value={formData.experiencia}
              onChange={handleChange}
            />
          </div>

          <div className="formOfertasCenter">
            <label htmlFor="Salario">Salario</label>
            <input
              type="range"
              id="Salario"
              name="Salario"
              min="0"
              max="50"
              step="1"
              value={formData.salariesperat}
              onChange={handleChange}
            />
            <label htmlFor="requisitos">Requisitos</label>
            <input
              type="text"
              id="requisitos"
              name="requisitos"
              value={formData.requisitos}
              onChange={handleChange}
              required
            />
            <div style={{ display: "flex", justifyContent: "space-between",alignContent:"center",justifyItems:"center" }}>
              <div style={{ width: "75%" }}>
                <label htmlFor="extras">Num plaçes vacants</label>
                <input
                  type="number"
                  id="extras"
                  name="extras"
                  value={formData.extras}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={{ alignContent:"end",justifyItems:"end" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    style={{transform: "scale(3)"}}
                    type="checkbox"
                    id="precencial"
                    name="precencial"
                    checked={formData.precencial}
                    onChange={handleChange}
                  />
                  <label htmlFor="precencial" style={{ marginLeft: "0.5em" }}>
                    Precencial
                  </label>
                </div>
              </div>
            </div>

            <label htmlFor="fechaLimite">Fecha Límite para Postularse</label>
            <input
              type="date"
              id="fechaLimite"
              name="fechaLimite"
              value={formData.fechaLimite}
              onChange={handleChange}
              required
            />
            <button
              className="PerfilEmpresaBtnCambiarFoto"
              style={{ width: "100%", marginTop: "2.9em" }}
              // onClick={() => fileInputRef.current.click()}
            >
              Subir foto de oferta
            </button>
            <input
              type="file"
              accept="image/*"
              // ref={fileInputRef}
              // onChange={handleCambiarFoto}
              style={{ display: "none" }}
            />

            <button
              className="PerfilEmpresaBtnCambiarFoto"
              style={{ width: "100%", marginTop: "1em" }}
              onClick={() =>
                document.getElementById("documentacionInput").click()
              }
            >
              Subir documentación
            </button>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              id="documentacionInput"
              name="documentacion"
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </div>

          <div className="formOfertesRight">
            <div className="botonesOfertas">
              <button type="submit">CREAR OFERTA</button>
              <button type="button" onClick={() => alert("Cancelar acción")}>
                CANCELAR
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormOfertas;
