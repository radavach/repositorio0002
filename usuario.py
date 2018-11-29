import hashlib

class Usuario:
	def __init__(self,conexion, cursor):
		self.conexion = conexion
		self.cursor = cursor
		
	def crear(self, nombre, apelidos, telefono, correo, password, tipo):
		intertar = ("INSERT INTO Usuario(nombre, apellidos, telefono, correo, password, tipo) VALUES (%s,%s,%s,%s,%s,%s)")
		h = hashlib.new('sha25', bytes(password, 'utf-8'))
		h = h.hexdigest()
		self.cursor.execute(insertar, (nombre, apellidos, telefono, correo, h, tipo))
		self.conexion.commit()
	
	def login(self, correo, password):
		select = ("SELECT * FROM Usuario WHERE correo = %s AND password = %s")
		h = hashlib.new('sha256', bytes(password, 'utf-8'))
		h = h.hexdigest()
		self.cursor.execute(select, (correo, password))
		
		resultado = self.cursor.fetchall()
		
		if (resultado):
			print(resultado)
			return True
		else:
			return False
	
	def rentarSalon(self, usuario, id_Salon, horas):
		try:
			precio = 0.0
			self.cursor.execute("SELECT * FROM salon WHERE id = %s ", (id_Salon,))
			resultado = self.cursor.fetchall()
			print(resultado)
			if (resultado):
				precio = resultado[0][5] * int(horas)
			print("hola")
			self.cursor.execute("SELECT id FROM usuario WHERE correo = %s", (usuario,))
			print("hola de nuevo")
			id_Usuario = self.cursor.fetchall()
			print (id_Usuario[0][0])
			insertar = ('INSERT INTO salon_cliente(id_Usuario, id_Salon, horas, precio) VALUES (%s,%s,%s,%s)')
			self.cursor.execute(insertar, (id_Usuario[0][0], id_Salon, horas, precio))
			self.conexion.commit()	
			return True
			
		except:
			print("Ocurrio algo inesperado al rentar el salon para el cliente")
			return False
			
	def historialDeRentas(self, correo):
		salones = []
		self.cursor.execute("SELECT id FROM usuario WHERE correo = %s", (correo,))
		id = self.cursor.fetchall()
		
		if (id):
			select = ("SELECT id_Salon FROM Salon_Cliente WHERE id_Usuario = %s")
			self.cursor.execute(select, (id[0][0],))
			
			for i in self.cursor.fetchall():
				self.cursor.execute("SELECT * FROM Salon WHERE id = %s", (i[0],))
				salon_Object = self.cursor.fetchone()
				salon = {
					'id': salon_Object[0],
					'nombre': salon_Object[1],
					'ubicacion': salon_Object[2],
					'cp': salon_Object[3],
					'id_Dueno': salon_Object[4],
					'costo': salon_Object[5]
				}
				salones.append(salon)
			
		return salones
