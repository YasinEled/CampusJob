import '../../Components/ComponentsCSS/CreateOfertas/CreateOfertas.css'


function FormOfertas() {


    return (
      <div className="ContainerFormOfertas">
        <h1 className="tituloOfertas">AÑADIR OFERTA DE TRABAJO</h1>
        <div className="lineageneralFormOfertas">
        </div>
        <div className="continerformOfertasCentral">
          <div className="formOfertasLeft">
            <form action="">
              <label for="titulo">Título de puesto *</label>
              <input type="text" id="titulo" name="titulo" required/>

              <div class="">
                <div style={{display: "flex" , justifyContent: "space-between"}}>
                  <div>
                    <label for="telefono">Teléfono de contacto *</label>
                    <input type="text" id="telefono" name="telefono" required/>
                  </div>
                  <div>
                    <label for="ubicacion">Ubicación *</label>
                    <input type="text" id="ubicacion" name="ubicacion" required/>
                  </div>
                </div>
                

                <label for="sector">Sector *</label>
                <select id="sector" name="sector" required>
                  <option value="">Seleccione un sector</option>
                </select>

                <label for="descripcion">Descripción de la oferta *</label>
                <textarea id="descripcion" name="descripcion" required style={{resize: 'none', height: '227px'}}></textarea>

                <label for="experiencia">Experiencia mínima</label>
                <input type="range" id="experiencia" name="experiencia" min="0" max="50" step="1"/>

              </div>
            </form>
          </div>

          <div className="formOfertasCenter">
            <label for="experiencia">Experiencia mínima</label>
            <input type="range" id="experiencia" name="experiencia" min="0" max="50" step="1"/>

            <label for="ubicacion">Requisitos</label>
            <input type="text" id="ubicacion" name="ubicacion" required/>
            <div style={{ width:"100%", height:"100px", backgroundColor:"#ccc", borderRadius:"5px", marginTop:"10px"}}>
            </div>
            <label for="ubicacion">Extras</label>
            <input type="text" id="ubicacion" name="ubicacion" required/>
            <div style={{ width:"100%", height:"100px", backgroundColor:"#ccc", borderRadius:"5px", marginTop:"10px"}}>
            </div>
            <label for="ubicacion">Fecha Límite para Postularse</label>
            <input type="text" id="ubicacion" name="ubicacion" required/>
          </div>
          <div className="formOfertesRight">

          </div>
        </div>
        
      </div>
    );
  }
  
export default FormOfertas;
  