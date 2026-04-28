SELECT 
    carreras.id_carrera, 
   carreras.nombre, 
    COUNT(alumnos.id_alumno) AS cantidad_alumnos
FROM alumnos 
INNER JOIN carreras
    ON alumnos.id_carrera = carreras.id_carrera
GROUP BY 
    carreras.id_carrera, 
    carreras.nombre;