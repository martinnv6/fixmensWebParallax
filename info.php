<html>
 <head>
  <title>Prueba de PHP</title>
 </head>
 <body>
 <?php
$host = 'localhost:/ruta/a/su/base_de_datos.gdb';

$gestor_db = ibase_connect($host, $nombre_usuario, $contrasenya);
$sentencia = 'SELECT * FROM nombre_tabla';
$gestor_sent = ibase_query($gestor_db, $sentencia);
while ($fila = ibase_fetch_object($gestor_sent)) {
    echo $fila->email, "\n";
}
ibase_free_result($gestor_sent);
ibase_close($gestor_db);
?>
 </body>
</html>