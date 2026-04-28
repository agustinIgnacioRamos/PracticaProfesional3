update Alumnos
set fecha_nacimiento =
date_add('1995-01-01', interval floor(rand()*4000) day);