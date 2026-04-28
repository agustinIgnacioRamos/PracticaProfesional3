<?php

include("db.php");

$sql = "SELECT id, nombre, correo FROM usuarios LIMIT 2";
$resultado = $conn->query($sql);

if ($resultado->num_rows > 0) {
    while ($fila = $resultado->fetch_assoc()) {
        echo "ID: " . $fila["id"] . "<br>";
        echo "Nombre: " . $fila["nombre"] . "<br>";
        echo "Correo: " . $fila["correo"] . "<br>";
        echo "<hr>";
    }
} else {
    echo "No hay usuarios";
}

$conn->close();

?>