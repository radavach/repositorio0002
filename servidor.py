from flask import Flask, request, make_response, jsonify
import mysql.connector
from dueno import Dueno
from registro import Registro
from salon import Salon
from usuario import Usuario

conexion = mysql.connector.connect(user="root",password="",database="salones")
cursor = conexion.cursor()

app = Flask(__name__)

@app.route("/home/")
def hello():
    respuesta = make_response("Hello Wolrd!")
    respuesta.headers.add('Access-Control-Allow-Origin','*')
    return respuesta

#/login/?usuario=correro&password=contraseña
#devuelve id
@app.route("/login/", methods=['GET'])
def login():
	usuario = request.args.get('usuario')
	password = request.args.get('password')
    
	print('ingresando')
	userBD = Usuario(conexion,cursor)
	respuesta = userBD.login(usuario, password)
	
	print(respuesta)
	
	return jsonify(respuesta)

#mostrar todos los salones con ubicacion y costo
#/salones/
@app.route("/salones/", methods=['GET'])
def salones():

	sal = Salon(conexion, cursor)
	
	print('mostrando todos los salones')
	resultado = sal.recuperar()
	print(resultado)

	return jsonify(resultado)

#mostrar salones de un duenño
#/salonesD/?id_usuario=id_usuario
@app.route("/salonesD/", methods=['GET'])
def salonesD():
	id_usuario = request.args.get('id_usuario')

	print('mostrando salones de un dueño')
	due = Dueno (conexion, cursor)
	resultado = due.buscarSalones(id_usuario)
	
	return jsonify(resultado)

#mostrar un salon especifico
#/salon/?id_Salon=id_Salon
@app.route("/salon/", methods=['GET'])
def salon():
	id_Salon = request.args.get('id_Salon')
	
	print('mostrando salon especifico')
	sal = Salon(conexion, cursor)
	respuesta = sal.buscarSalon(id_Salon)
	
	return jsonify(respuesta)	

#mostrar historial de salones rentados
#/historial/?usuario=correo
@app.route("/historial/", methods=['GET'])
def historial():
	usuario = request.args.get('usuario')

	print('mostrando historial')
	us = Usuario(conexion, cursor)
	resultado = us.historialDeRentas(usuario)
	print(resultado)

	return jsonify(resultado)

#rentar un salon 
#/rentar/?usuario=correo&salon=id_Salon&horas=horas
@app.route("/rentar/", methods=['GET'])
def rentar():
	usuario = request.args.get('usuario')
	salon = request.args.get('salon')
	horas = request.args.get('horas')

	print('rentando salon')
	us = Usuario(conexion, cursor)
	resultado = make_response(str(us.rentarSalon(usuario, salon, horas)))
    
	return resultado

#registrar un usuario
#/registrarU/?nombre=nombre&apellidos=apellidos&telefono=telefono&correo=correo&password=password&tipo=tipo
@app.route("/registrarU/", methods=['GET'])
def crearU():
	nombre = request.args.get('nombre')
	apellidos = request.args.get('apellidos')
	telefono = request.args.get('telefono')
	correo = request.args.get('correo')
	password = request.args.get('password')
	tipo = request.args.get('tipo')
	
	print("registrando usuario")
	us = Usuario(conexion,cursor)
	resultado = make_response(str(us.crear(nombre, apellidos, telefono, correo, password, tipo)))
	
	return resultado

#registrar un dueño
#/registrarD/?usuario=correo&password=password&numCuenta=numero_Cuenta
@app.route("/registrarD/", methods=['GET'])
def crearD():
	correo = request.args.get('usuario')
	password = request.args.get('password')
	numero_Cuenta = request.args.get('numCuenta')
	
	print("registrando duenio")
	due = Dueno(conexion, cursor)
	resultado = make_response(str(due.crear(correo, numero_Cuenta, password)))
	
	return resultado
	
#registrar un salon	
#/registrarS/?nombre=nombre&ubicacion=ubicacion&cp=codigoPostal&id=id_Dueno&costo=costo
@app.route("/registrarS/", methods=['GET'])
def crearS():
	nombre = request.args.get('nombre')
	ubicacion = request.args.get('ubicacion')
	cp = request.args.get('cp')
	id = request.args.get('id')
	costo = request.args.get('costo')
	
	print('registrando salon')
	sal = Salon(conexion, cursor)
	resultado = make_response(str(sal.crear(nombre, ubicacion, cp, id, costo)))
	
	return resultado
	

app.run(debug=True)
