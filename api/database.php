<?php
$host = $_ENV['DB_HOST'];
$dbname = $_ENV['DB_NAME'];
$username = $_ENV['DB_USER'];
$password = $_ENV['DB_PASS'];
$charset = $_ENV['DB_CHARSET'];

global $pdo;

// Data Source Name (DSN)
$dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";

// PDO options
$options = [
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
  // Create a new PDO instance
  global $pdo;
  $pdo = new PDO($dsn, $username, $password, $options);
} catch (PDOException $e) {
  // Handle connection errors
  die("Connection failed: " . $e->getMessage());
}
?>