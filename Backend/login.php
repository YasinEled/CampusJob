<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permitir solicitudes desde cualquier origen
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Permitir métodos específicos
header('Access-Control-Allow-Headers: Content-Type'); // Permitir encabezados específicos

// Configuración de conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "campusjob"; // modificar al que toqui

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos JSON del cuerpo de la solicitud
    $input = json_decode(file_get_contents('php://input'), true);
    $username = $input['username'];
    $password = $input['password'];

    
    $stmt = $conn->prepare("SELECT * FROM usuario WHERE nomUsuari = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    // Verificar si el usuario existe y la contraseña es correcta
    if ($user && $password === $user['password'] && $user['activo'] == 1) {
        echo json_encode(["success" => true, "message" => "Login successful."]);
    } else {
        echo json_encode(["success" => false, "message" => "Username or password not correct, or account not activated."]);
    }
}
?>