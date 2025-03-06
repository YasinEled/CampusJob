//ESTO HAY QHUE LLAMARLO CUANDO EL ADMIN CREE USUARIOS DONDRE PODRA INDICAR EL NIVEL DEL ROL Y SU NOMBRE Y APELLIDOS

<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permitir solicitudes desde cualquier origen
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Permitir métodos específicos
header('Access-Control-Allow-Headers: Content-Type'); // Permitir encabezados específicos

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "campusjob";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Función para generar una contraseña aleatoria
function generatePassword($length = 10) {
    return bin2hex(random_bytes($length / 2)); // Genera una cadena segura
}

// Función para generar un nombre de usuario con un máximo de 8 caracteres y al menos una letra
function generateUsername() {
    $letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $numbers = '0123456789';
    $username = '';
    
    // Aseguramos que haya al menos una letra
    $username .= $letters[rand(0, strlen($letters) - 1)];
    
    // Rellenamos el resto del nombre de usuario con letras y números
    for ($i = 1; $i < 8; $i++) {
        $username .= (rand(0, 1) ? $letters[rand(0, strlen($letters) - 1)] : $numbers[rand(0, strlen($numbers) - 1)]);
    }
    
    return $username;
}

// Recibir y decodificar el JSON enviado desde el frontend
$data = json_decode(file_get_contents('php://input'), true);
$nombre = $data['nombre'];
$apellido = $data['apellido'];

// Generar usuario y contraseña
$newUsername = generateUsername();
$newPassword = generatePassword();
$hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT); // Hasheamos la contraseña

// Insertar en la base de datos
$stmt = $conn->prepare("INSERT INTO usuari (username, contraseña, nom, cognoms, activo) VALUES (?, ?, ?, ?, 1)");
$stmt->bind_param("ssss", $newUsername, $hashedPassword, $nombre, $apellido);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "username" => $newUsername,
        "password" => $newPassword
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Error al crear el usuario"]);
}

$stmt->close();
$conn->close();
?>
