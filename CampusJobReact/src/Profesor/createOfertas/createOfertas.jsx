import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Style/CreateOfertas.css";

function FormOfertas() {
  const navigate = useNavigate();
  const { cursoId } = useParams();
  const centroId = localStorage.getItem("idCentro"); // ✅ Corregido: sin `const { centroId }`
  const idUsuario = localStorage.getItem("idUsuario");
  const nivelUsuario = localStorage.getItem("nivelUsuario");

  const [formData, setFormData] = useState({
    titoloferta: "",
    descripciooferta: "",
    tipusjornada: "",
    horessetmanals: "",
    numplacesvacants: "",
    presencial: true,
    salariesperat: "",
    fechafin: "",
    idusrpublica: idUsuario,
    requisitos: [],
    imgoferte: null,
    documentadjunto: null
  });
  const [requirementsInput, setRequirementsInput] = useState("");
  const [previewImg, setPreviewImg] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleAddRequirement = (e) => {
    if (e.key === "Enter" && requirementsInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        requisitos: [...prev.requisitos, requirementsInput.trim()]
      }));
      setRequirementsInput("");
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files || !files[0]) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      setFormData((prev) => ({ ...prev, [name]: base64 }));
      if (name === "imgoferte") setPreviewImg(base64);
      if (name === "documentadjunto") setPreviewDoc(base64.split(",")[1]);
    };
    reader.onerror = () => alert("Error al leer el archivo");
    reader.readAsDataURL(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!centroId || !cursoId) {
      alert("ID del centro o curso no encontrado");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/centro/curso/${cursoId}/crearOferta`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();
      if (data.success) {
        alert("Oferta creada exitosamente");
        navigate(`/Empresa/`);
      } else {
        alert("Error al crear la oferta: " + (data.message || "Desconocido"));
      }
    } catch (error) {
      console.error("Error al enviar la oferta:", error);
      alert("Hubo un problema al conectar con el servidor");
    }
  };
  return (
    <div className="ContainerFormOfertas">
      <h1 className="tituloOfertas">AÑADIR OFERTA DE TRABAJO</h1>
      <div className="continerformOfertasCentral">
        <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: "flex", gap: "2em", width: "100%" }}>
          {/* IZQUIERDA: campos originales */}
          <div className="formOfertasLeft">
            <label htmlFor="titoloferta">Título de puesto *</label>
            <input
              type="text"
              id="titoloferta"
              name="titoloferta"
              value={formData.titoloferta}
              onChange={handleChange}
              required
            />

            <label htmlFor="descripciooferta">Descripción *</label>
            <textarea
              id="descripciooferta"
              name="descripciooferta"
              value={formData.descripciooferta}
              onChange={handleChange}
              required
              style={{ resize: "none", height: "150px" }}
            />

            <label htmlFor="tipusjornada">Jornada *</label>
            <select
              id="tipusjornada"
              name="tipusjornada"
              value={formData.tipusjornada}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona jornada</option>
              <option value="completa">Completa</option>
              <option value="parcial">Parcial</option>
              <option value="nocturna">Nocturna</option>
            </select>

            <label htmlFor="horessetmanals">Horas semanales *</label>
            <input
              type="number"
              id="horessetmanals"
              name="horessetmanals"
              value={formData.horessetmanals}
              onChange={handleChange}
              required
            />

            <label>
              Experiencia mínima: {formData.experiencia || 0}
            </label>
            <input
              type="range"
              id="experiencia"
              name="experiencia"
              min="0"
              max="20"
              step="1"
              value={formData.experiencia || 0}
              onChange={handleChange}
            />
          </div>

          {/* CENTRO: requisitos y archivos */}
          <div className="formOfertasCenter">
            <label>Requisitos (presiona Enter para añadir)</label>
            <input
              type="text"
              value={requirementsInput}
              onChange={(e) => setRequirementsInput(e.target.value)}
              onKeyDown={handleAddRequirement}
              placeholder="Escribe un requisito"
            />
            <div className="requisitos-list">
              {formData.requisitos.map((req, index) => (
                <div key={index} className="requisito-item">
                  {req}{" "}
                  <button type="button" onClick={() => handleRemoveRequirement(index)}>
                    ×
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="PerfilEmpresaBtnCambiarFoto"
              onClick={() => document.getElementById("imgoferte").click()}
            >
              Subir foto de oferta
            </button>
            {formData.imgoferte && <p className="file-name">{formData.imgoferte.name}</p>}
            <input
              type="file"
              id="imgoferte"
              name="imgoferte"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {previewImg && <img src={previewImg} alt="Vista previa" />}

            <button
              type="button"
              className="PerfilEmpresaBtnCambiarFoto"
              onClick={() => document.getElementById("documentadjunto").click()}
            >
              Subir documentación
            </button>
            {formData.documentadjunto && <p className="file-name">{formData.documentadjunto.name}</p>}
            <input
              type="file"
              id="documentadjunto"
              name="documentadjunto"
              accept=".pdf,.doc,.docx,.txt"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {previewDoc && <p>Documento adjunto (base64)</p>}
          </div>

          {/* DERECHA: num plazas, presencial y fecha */}
          <div className="formOfertesRight">
            <label htmlFor="numplacesvacants">Num plazas vacantes *</label>
            <input
              type="number"
              id="numplacesvacants"
              name="numplacesvacants"
              value={formData.numplacesvacants}
              onChange={handleChange}
              required
            />

            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                style={{ transform: "scale(3)" }}
                type="checkbox"
                id="presencial"
                name="presencial"
                checked={formData.presencial}
                onChange={handleChange}
              />
              <label htmlFor="presencial" style={{ marginLeft: "0.5em" }}>
                Presencial
              </label>
            </div>

            <label htmlFor="salariesperat">
              Salario esperado: {formData.salariesperat || 0}
            </label>
            <input
              type="range"
              id="salariesperat"
              name="salariesperat"
              min="0"
              max="100000"
              step="500"
              value={formData.salariesperat}
              onChange={handleChange}
            />

            <label htmlFor="fechafin">Fecha límite *</label>
            <input
              type="date"
              id="fechafin"
              name="fechafin"
              value={formData.fechafin}
              onChange={handleChange}
              required
            />

            <div className="botonesOfertas">
              <button type="submit">CREAR OFERTA</button>
              <button type="button" onClick={() => navigate(-1)}>
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