import React, { useState } from 'react';
import '../../Components/ComponentsCSS/CreateOfertas/CreateOfertas.css';

function FormOfertas() {
  const [formData, setFormData] = useState({
    titoloferta: '',
    descripciooferta: '',
    tipusjornada: '',
    fechafin: '',
    idusrpublica: 1, // Debería venir del login
    horessetmanals: '',
    numplacesvacants: '',
    presencial: true,
    salariesperat: '',
    imgoferte: null,
    documentadjunto: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mostrar datos antes de enviar (para debug)
    console.log('Datos a enviar:', formData);

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:4000/api/auth/crearOferta', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();
      if (data.success) {
        alert('Oferta creada con éxito');
        // Opcional: resetear el formulario
        setFormData({
          titoloferta: '',
          descripciooferta: '',
          tipusjornada: '',
          fechafin: '',
          idusrpublica: 1,
          horessetmanals: '',
          numplacesvacants: '',
          presencial: true,
          salariesperat: '',
          imgoferte: null,
          documentadjunto: null,
        });
      } else {
        alert('Error al crear la oferta: ' + data.message);
      }
    } catch (error) {
      console.error('Error al enviar la oferta:', error);
      alert('Hubo un error al enviar la oferta.');
    }
  };

  return (
    <div className="ContainerFormOfertas">
      <h1 className="tituloOfertas">AÑADIR OFERTA DE TRABAJO</h1>
      <form onSubmit={handleSubmit}>
        {/* Título de puesto */}
        <label htmlFor="titoloferta">Título de puesto *</label>
        <input
          type="text"
          id="titoloferta"
          name="titoloferta"
          value={formData.titoloferta}
          onChange={handleChange}
          required
        />

        {/* Descripción de la oferta */}
        <label htmlFor="descripciooferta">Descripción de la oferta *</label>
        <textarea
          id="descripciooferta"
          name="descripciooferta"
          value={formData.descripciooferta}
          onChange={handleChange}
          required
          style={{ resize: 'none', height: '227px' }}
        ></textarea>

        {/* Tipo de jornada */}
        <label htmlFor="tipusjornada">Tipo de jornada *</label>
        <select
          id="tipusjornada"
          name="tipusjornada"
          value={formData.tipusjornada}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione tipo de jornada</option>
          <option value="Completa">Jornada Completa</option>
          <option value="Parcial">Jornada Parcial</option>
          <option value="Flexible">Jornada Flexible</option>
        </select>

        {/* Fecha límite para postularse */}
        <label htmlFor="fechafin">Fecha límite para postularse *</label>
        <input
          type="date"
          id="fechafin"
          name="fechafin"
          value={formData.fechafin}
          onChange={handleChange}
          required
        />

        {/* Campos opcionales */}
        <label htmlFor="horessetmanals">Horas semanales (opcional)</label>
        <input
          type="number"
          id="horessetmanals"
          name="horessetmanals"
          value={formData.horessetmanals}
          onChange={handleChange}
        />

        <label htmlFor="numplacesvacants">Número de plazas vacantes (opcional)</label>
        <input
          type="number"
          id="numplacesvacants"
          name="numplacesvacants"
          value={formData.numplacesvacants}
          onChange={handleChange}
        />

        <label htmlFor="presencial">Presencial</label>
        <input
          type="checkbox"
          id="presencial"
          name="presencial"
          checked={formData.presencial}
          onChange={handleChange}
        />

        <label htmlFor="salariesperat">Salario esperado (opcional)</label>
        <input
          type="number"
          id="salariesperat"
          name="salariesperat"
          value={formData.salariesperat}
          onChange={handleChange}
        />

        {/* Archivos adjuntos */}
        <label htmlFor="imgoferte">Imagen de la oferta (opcional)</label>
        <input
          type="file"
          id="imgoferte"
          name="imgoferte"
          onChange={handleChange}
        />

        <label htmlFor="documentadjunto">Documento adjunto (opcional)</label>
        <input
          type="file"
          id="documentadjunto"
          name="documentadjunto"
          onChange={handleChange}
        />

        {/* Botones */}
        <button type="submit">CREAR OFERTA</button>
        <button type="button" onClick={() => alert('Cancelar acción')}>
          CANCELAR
        </button>
      </form>
    </div>
  );
}

export default FormOfertas;