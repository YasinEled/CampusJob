
function App() {
  return (
    <main>
      <div class="marginHeader"></div>
      <div class="container">
        <div class="d-flex flex-column flex-lg-row justify-content-center align-items-center">
          <div class= "col-12 col-lg-6 mr-5 ml-5">
            <img class="logoMini" src="/src/assets/Logo/CampusJob.png" alt="Logo" />
          </div>
            <div class= "col-12 col-lg-6 ml-5 mr-5">
              <form action="./PHP/login.php" method="POST">
                <div class="form-group">
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" placeholder="Username"/>
                  <input type="password" class="form-control" id="exampleInputPassword1" name="password" placeholder="Password"/>
                </div>
                <button type="submit" class="btn-login">Iniciar Sesión</button>
              </form>
              <p class="p-login">¿ Eres un nuevo centro estudiantil ?</p>
              <a href="#loginModal" class="btn-crear-cuenta">Contactanos</a>
            </div>
        </div>
      </div>
    <div class="marginFooter"></div>
    <footer class="col-12 text-center">
        <div class = "footer-links">
            <a href="#">Informació</a>
            <a href="#">Ayuda</a>
            <a href="#">política de cookies</a>
            <a href="#">Política de privacidad</a>
            <a href="#">Accesibilitat</a>
            <a href="#">Condiciones de servicio</a>
        </div>
        <div>
            <p class="p-footer">© 2025 Campus Job.</p>
        </div>
    </footer>
    </main>
  )
}

export default App
