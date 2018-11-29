import hashlib

class Dueno:
	def __init__(self, conexion, cursor):
		self.conexion = conexion
		self.cursor = cursor
		
	def crear(self, correo, numero_Cuenta, password):
		select = ("SELECT * FROM Usuario WHERE correo = %s AND password = %s")
		insertar = ("INSERT INTO Dueno(id_Usuario, numero_Cuenta) VALUES (%s, %s)")
		h = hashlib.new('sha256', bytes(password, 'utf-8'))
		h = h.hexdigest()
		self.cursor.execute(select, (correo, h))
		usuario = self.cursor.fetchall()	
		
		if(usuario):
			self.cursor.execute("SELECT * FROM Dueno WHERE id_Usuario = %s", (usuario[0][0],))
			resultado = self.cursor.fetchall()
			
			if (resultado):
				print("El usuario ya esta registrado como dueño")
				return False
			else:
				self.cursor.execute(insertar, (usuario[0][0], numero_Cuenta))
				self.conexion.commit()
				return True
		else:
			print("El usuario no existe")
			return False
			
	def buscarSalones(self, id_Dueno):
		select = ("SELECT * FROM Salon WHERE id_Dueno = %s")
		self.cursor.execute(select, (id_Dueno,))
		resultado = self.cursor.fetchall()
		
		return resultado
			
	