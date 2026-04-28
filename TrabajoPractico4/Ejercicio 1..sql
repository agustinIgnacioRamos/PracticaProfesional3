SELECT 
    materias.id_materia, 
    materias.nombre, 
    COUNT(alumnos.id_alumno) AS cantidad_alumnos
FROM alumnos 
INNER JOIN materias 
    ON alumnos.id_carrera = materias.id_carrera
GROUP BY 
    materias.id_materia, 
    materias.nombre;