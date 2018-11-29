CREATE DATABASE SALONES;
USE SALONES;

CREATE TABLE Usuario(
	id INT PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(30) NOT NULL,
	apellidos VARCHAR(50),
	telefono VARCHAR(15),
	correo VARCHAR(128) NOT NULL,
	password VARCHAR(64) NOT NULL,
	tipo INT NOT NULL
);

CREATE TABLE Dueno(
	id INT PRIMARY KEY AUTO_INCREMENT,
	id_Usuario INT,
	numero_Cuenta VARCHAR(16) NOT NULL,
	FOREIGN KEY (id_Usuario) REFERENCES Usuario(id)
);

CREATE TABLE Salon(
	id INT PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(30) NOT NULL,
	ubicacion VARCHAR(50) NOT NULL,
	codigo_Postal INT,
	id_Dueno INT,
	costo FLOAT,
	FOREIGN KEY (id_Dueno) REFERENCES Usuario(id)
);


CREATE TABLE Salon_Cliente(
	id_Usuario INT,
	id_Salon INT,
	horas INT,
	precio FLOAT,
	FOREIGN KEY(id_Usuario) REFERENCES Usuario(id),
	FOREIGN KEY(id_Salon) REFERENCES Salon(id)
);
