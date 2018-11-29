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
@app.route("/login/", methods=['GET'])
def login():
    usuario = request.args.get('usuario')
    password = request.args.get('password')
    userBD = Usuario(conexion, cursor)
    respuesta = make_response(str(userBD.login(usuario, password)))
    respuesta.headers.add('Access-Control-Allow-Origin', '*')
    return respuesta
	
    #print(userBD.login(usuario, password))
    
    #print(usuario, password)
	#print(request.args)
    #return usuario + " " + password

#mostrar todos los salones con ubicacion y costo
#/salones/
@app.route("/salones/", methods=['GET'])
def salones():

    sal = Salon(conexion, cursor)

    resultado = sal.recuperar()
    print(resultado)

    return jsonify(resultado)

#mostrar historial de salones rentados
#/historial/?usuario=correo
@app.route("/historial/", methods=['GET'])
def historial():
    usuario = request.args.get('usuario')
    us = Usuario(conexion, cursor)

    resultado = us.historialDeRentas(usuario)
    print(resultado)

    return jsonify(resultado)

#rentar un salon 
#/rentar/?usuario=correo&salon=id_salon&horas=horas
@app.route("/rentar/", methods=['GET'])
def rentar():
    usuario = request.args.get('usuario')
    salon = request.args.get('salon')
    horas = request.args.get('horas')

    us = Usuario(conexion, cursor)

    resultado = make_response(str(us.rentarSalon(usuario, salon, horas)))
    
    return resultado


app.run(debug=True)
