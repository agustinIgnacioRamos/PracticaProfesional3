alter table Materias
add nota_aprobacion DECIMAL(1,0) null
check (nota_aprobacion IN (4,6));