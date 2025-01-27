<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="./ASSETS/CampusJobBorderLogo.png" type="image/x-icon">
    <link rel="stylesheet" href="./CSS/index.css">
    <title>CampusJob</title>    
</head>
<body>
    <div class="marginHeader"></div>
    <div class="container">
        <div class="d-flex flex-column flex-lg-row justify-content-center align-items-center">
            <div class= "col-12 col-lg-6 mr-4">
                <img src="./ASSETS/CampusJob.png" class="logoMini" alt="Logo">
            </div>
            <div class= "col-12 col-lg-6 ml-4">
                <form action="./PHP/login.php" method="POST">
                    <div class="form-group">
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" placeholder="Username">
                        <input type="password" class="form-control" id="exampleInputPassword1" name="password" placeholder="Password">
                    </div>
                    <button type="submit" class="btn-login">Iniciar Sesión</button>
                </form>
                <p class="p-login">¿ Eres un nuevo centro estudiantil ?</p>
                <a href="#loginModal" class="btn-crear-cuenta">Contactanos</a>
            </div>
        </div>
    </div>
    <footer class="col-12 text-center">
        <div class = "footer-links">
            <a href="#">Informació</a>
            <a href="#">Ayuda</a>
            <a href="#">política de cookies</a>
            <a href="#">Política de privacidad</a>
            <a href="#">Condiciones de servicio</a>
            <a href="#">Accesibilitat</a>
        </div>
        <div>
            <p class="p-footer">© 2025 Anonims Corp.</p>
        </div>
    </footer>
</body>
</html>