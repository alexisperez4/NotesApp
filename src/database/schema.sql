CREATE TABLE nota (
    id SERIAL PRIMARY KEY,
    titulo TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT LOCALTIMESTAMP
);

CREATE  TABLE user (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    contrasena TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT LOCALTIMESTAMP
);

INSERT INTO nota (titulo, descripcion)
VALUES ("value_a", "value_b");