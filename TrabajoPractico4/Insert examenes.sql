select alumnos.id_alumno, alumnos.nombre, materias.nombre, materias.curso, examenes.nota, examenes.fecha
from alumnos INNER JOIN materias ON alumnos.id_carrera = materias.id_carrera
INNER JOIN examenes on examenes.id_alumno = alumnos.id_alumno
where alumnos.id_alumno = 1