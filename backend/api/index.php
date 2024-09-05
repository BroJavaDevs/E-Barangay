<?php
// $allowedOrigins = ['https://barangay82.brojava.com', 'http://localhost:5173', 'http://192.168.2.144:5173','https://special-space-goggles-6rjp54p4rr92475r-5173.app.github.dev/'];
// $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// if (in_array($origin, $allowedOrigins)) {
//   header("Access-Control-Allow-Origin: $origin");
// }
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

require 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
require 'dotenv.php';
require 'database.php';

global $pdo;

Flight::route('POST /login', function() {
  global $pdo;

  $username = Flight::request()->data['username'];
  $password = Flight::request()->data['password'];

  // Fetch user from database
  $stmt = $pdo->prepare('SELECT * FROM tbl_users WHERE username = ?');
  $stmt->execute([$username]);
  $user = $stmt->fetch();

  if (!$user || !password_verify($password, $user['password'])) {
    return Flight::json(['message' => 'Invalid username or password.'], 401);
  }

  // Create JWT payload
  $payload = [
      'iss' => $_ENV['BASE_URL'],  // Issuer
      'sub' => $user['id'],         // Subject
      'iat' => time(),              // Issued at
      'exp' => time() + (60 * 60 * 24 * 3),   // Expiration time (3 days)
      'user' => [
        'id' => $user['id'],
        'username' => $user['username'],
        'position' => $user['position']
      ]
  ];

  // Encode payload to create the JWT
  $jwt = JWT::encode($payload, $_ENV['JWT_SECRET'], 'HS256');

  return Flight::json(['token' => $jwt], 200);
});



Flight::route('/posts', function() {
  global $pdo;
  $stmt = $pdo->prepare('SELECT * FROM tbl_announcements');
  $stmt->execute();

  $posts = $stmt->fetchAll();

  return Flight::json($posts, 200);
});

Flight::route('POST /post', function() {
  $title = Flight::request()->data['title'];
  $body = Flight::request()->data['body'];
  $image = Flight::request()->files['image'];
  $position = Flight::request()->data['position'];

  // Ito yung mga pwedeng MIME types ng image
  $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

  // Kung may file ang file ay hindi image, ibalik ng katayuan sa 400
  if($image && !in_array($image['type'], $allowedMimeTypes)) {
    return Flight::json(['message' => 'Image only.'], 400);
  }

  // Kung may file at ito ay image, i-upload sa ating public folder
  if($image) {
    $extension = pathinfo($image['name'], PATHINFO_EXTENSION); // Get the file extension
    $uniqueFileName = uniqid() . '.' . $extension; // Generate a unique name
    $imagePath = 'public/' . $uniqueFileName; // Set the path
    move_uploaded_file($image['tmp_name'], $imagePath); // Move the file
  }

  global $pdo;
  $stmt = $pdo->prepare('INSERT INTO tbl_announcements (title, body, image, position) VALUES (?, ?, ?, ?)');
  $stmt->execute([
    $title,
    $body,
    $uniqueFileName ? $_ENV['IMAGE_BASE_URL'] . $uniqueFileName : '',
    $position
  ]);

  return Flight::json([
    'title' => $title, // Required
    'body' => $body, // Required
    'image' => $uniqueFileName ?? '', // Optional, the unique file name
    'position' => $position // Required
  ], 200);
});

Flight::start();
?>