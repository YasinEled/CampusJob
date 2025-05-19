import "./Style/perfilTeacher.css";
import fotoProfesor from '../../assets/yasin.jpg';
import fondoProfesor from '../../assets/yasinfondo.jpg';
import { useState } from "react";

function PerfilTeacher() {
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [nombre, setNombre] = useState("Yasin Ahmed");
  const [ubicacion, setUbicacion] = useState("Barcelona, Cataluña, España");
  const [especialidad, setEspecialidad] = useState("Desarrollo Web y Bases de Datos");
  const [experienciaDesde, setExperienciaDesde] = useState("2015");
  const [telefono, setTelefono] = useState("+34 654321098");
  const [email, setEmail] = useState("yasin.profesor@ejemplo.com");
  const [biografia, setBiografia] = useState("Profesor comprometido con la innovación en el aula, especializado en tecnologías web y metodologías activas de enseñanza.");

  const handleGuardar = () => {
    setMostrarPopup(false);
  };

  const handleEnviarMensaje = () => {
    console.log("Mensaje enviado:", mensaje);
    setMensaje("");
    setMostrarMensaje(false);
  };

  return (
    <main className="perfilTeacherContainer">
      <div className="PerfilTeacher">
        <div className="fondoTeacher">
          <img src={fondoProfesor} alt="Fondo Profesor" />
          <img className="fotoProfesor" src={fotoProfesor} alt="Foto Profesor" />
        </div>
        <div className="InfoTeacherContainer">
          <div className="infoPerfilTeacher">
            <h2>{nombre}</h2>
            <p>{ubicacion}</p>
            <p><strong>Especialidad:</strong> {especialidad}</p>
            <p><strong>Experiencia desde:</strong> {experienciaDesde}</p>
            <p><strong>Teléfono:</strong> {telefono}</p>
            <p><strong>Email:</strong> {email}</p>
            <p>{biografia}</p>

            <button className="btnEditarPerfilTeacher" onClick={() => setMostrarPopup(true)}>Modificar perfil</button>
            <button className="btnMensajeTeacher" onClick={() => setMostrarMensaje(true)}>Enviar mensaje</button>
          </div>
        </div>
      </div>

      {mostrarPopup && (
        <div className="popupOverlay">
          <div className="popupContenido">
            <h3>Editar Perfil del Profesor</h3>
            <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre completo" />
            <input value={ubicacion} onChange={e => setUbicacion(e.target.value)} placeholder="Ubicación" />
            <input value={especialidad} onChange={e => setEspecialidad(e.target.value)} placeholder="Especialidad" />
            <input value={experienciaDesde} onChange={e => setExperienciaDesde(e.target.value)} placeholder="Desde (año)" />
            <input value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="Teléfono" />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <textarea value={biografia} onChange={e => setBiografia(e.target.value)} placeholder="Biografía" />
            <button onClick={handleGuardar}>Guardar</button>
            <button onClick={() => setMostrarPopup(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {mostrarMensaje && (
        <div className="popupOverlay">
          <div className="popupContenido">
            <h3>Enviar mensaje al profesor</h3>
            <textarea
              placeholder="Escribe tu mensaje aquí..."
              value={mensaje}
              onChange={e => setMensaje(e.target.value)}
            />
            <button onClick={handleEnviarMensaje}>Enviar</button>
            <button onClick={() => setMostrarMensaje(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default PerfilTeacher;
