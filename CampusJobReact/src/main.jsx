import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import i18next from "i18next";

import App from "./App.jsx";
import MenuHome from "./mainHome.jsx";
import MainBusqueda from "./Components/MenuHome/MainBusqueda/MainBusqueda";
import PerfilPropio from "./Components/PerfilUsuario/perfilPropio.jsx";
import PerfilMod from "./Components/PerfilUsuario/perfilModificable.jsx";
import FormOfertas from "./Components/createOfertas/createOfertas.jsx";
import PerfilEmpresa from "./Components/PerfilEmpresa/PerfilEmpresa.jsx";
import CreatorUsers from "./Components/CreadorUser/Page/CreatorUsers.js";
import SeachUser from "./Components/BuscadorPerfil/SeachUser.js";
import PrimerInicio from "./Components/PrimerInici/PrimerIniciUsuari.jsx"; // Importa el componente PrimerInicio
import MenuCentros from "./Components/MenuCentros/MenuCentros.jsx";
import AñadirUsuario from "./Components/MenuAdmin/AñadirUsuario.jsx";
import MenuProfesor from "./Components/MenuProfesor/MenuProfesor.jsx";
import MenuCursos from "./Components/MenuCursos/MenuCursos.jsx";
import AñadirCentro from "./Components/MenuAdmin/AñadirCentro.jsx";
import AñadirCurso from "./Components/creadorCursos/createCursos.js";
import GestionarCursos from "./Components/MenuCursos/GestionCursos.jsx";
// import BuscadorPerfil from "./Components/BuscadorPerfil/BuscadorPerfil.jsx";
import PerfilTeacher from "./Components/PerfilTeacher/PerfilTeacher.jsx";
// Import language files
import global_es from "./TRADUCCIONES/es/global.json";
import global_en from "./TRADUCCIONES/en/global.json";
import global_cat from "./TRADUCCIONES/cat/global.json";
// Import NotFound component
import NotFound from "./NotFound.jsx"; // Importa el componente NotFound

// Inicializar i18next
await i18next.init({
  interpolation: { escapeValue: false },
  lng: "cat",
  resources: {
    es: { global: global_es },
    en: { global: global_en },
    cat: { global: global_cat },
  },
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <Router>
        <Routes>
          //ruta publica de login
          <Route path="/" element={<App />} />

          //pagina para todos pero tienes q hacer login
          //menu para elegir Curso
          <Route path="MenuCursos" element={<MenuCursos />} />
          //ruta de menu alumno y empresa en un curso
            <Route path="/mainHome" element={<MenuHome />}>
            //BuscadorOfertas
            <Route path="busqueda" element={<MainBusqueda />} />
            //perfil Alumno
            <Route path="perfil" element={<PerfilPropio />} />
            //perfil Empresa
            <Route path="PerfilEmpresa" element={<PerfilEmpresa />} />
            
            //Buscador de perfil pero De este querre hacer varios con la misma pagina. De normal los usuarios normales solo podran buscar los de su curso. Pero si soy admindeCentro podre buscar de todo mi centro y si soy Admin, que somos los de la aplicacion, Podre ver TODOS los usuarios en el buscadro entonces alomejor hay q hacer vairas rutas
            <Route path="BuscadorPerfil" element={<SeachUser />} />
            
            //Perfil de Profesor
            <Route path="PerfilTeacher" element={<PerfilTeacher />} />

            </Route>


          //Pagina para 0,2,3 y 4
          
          //Pagina para rellenar info si es tu primera vez en al aplicacion si eres alumno/Profe
            <Route path="PrimerInicio" element={<PrimerInicio />} />


          //pagina para 1,2,3 y 4

          //Creador de ofertas de trabajo
            <Route path="formOfertes" element={<FormOfertas />} />


          //Solo para 2,3 y 4

          //Menu para los profesores 
            <Route path="MenuProfesor" element={<MenuProfesor />} />

            //Pagina para crear Usuarios. Estaria guay enviar un codigo para decir que tipo de usr 1=Alumno,2=empresa,3=Profesor
            <Route path="CreatorUsers" element={<CreatorUsers />} />

            //Pagina para añadir usuarios  Logicamente que si eres profe no podras crear mas profes
            <Route path="AñadirUsuario" element={<AñadirUsuario />} />


          //Solo para 3 y 4

          //Menu para elgir centros
          <Route path="MenuCentros" element={<MenuCentros />} />
          //pagina Crear Curso
          <Route path="AñadirCurso" element={<AñadirCurso />} />         
          //pagina para gestionar un Curso
          <Route path="GestionarCursos" element={<GestionarCursos />} />  



          //Solo para 4
          //Pagina de añadir Centro
          <Route path="AñadirCentro" element={<AñadirCentro />} />



          {/* Rutas de Admin con anidación */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </I18nextProvider>
  </StrictMode>
);
