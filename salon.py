

class Salon:
	def __init__(self, conexion, cursor):
		self.conexion = conexion
		self.cursor = cursor
		
	def crear(self, nombre, ubicacion, codigo_Postal, id_Usuario, costo):
		try:
			insertar = ("INSERT INTO Salon(nombre, ubicacion, codigo_Postal, id_Dueno, costo) VALUES (%s, %s, %s, %s, %s)")
			self.cursor.execute("SELECT * FROM Dueno WHERE id_Usuario = %s", (id_Usuario,))
			id_Dueno = self.cursor.fetchone()
			self.cursor.execute(insertar, (nombre, ubicacion, codigo_Postal, id_Dueno[0], costo))
			self.conexion.commit()
			return True
		except:
			print("Ocurrio algo inesperado al insertar el Salon")
			return False
	
	#mostrar todos los salones disponibles
	def recuperar(self):
		select = ("SELECT * FROM Salon")
		self.cursor.execute(select)
		salones = []
		
		for i in self.cursor.fetchall():
			salon = {
				'id': i[0],
				'nombre': i[1],
				'ubicacion': i[2]
			}
			salones.append(salon)
		
		return salones
		
		
	#mostrar un salon en especifico
	def buscarSalon(self, id_Salon):
		salones = []
		select = ("SELECT * FROM Salon WHERE id = %s")
		
		self.cursor.execute(select, (id_Salon,))		
		sal = self.cursor.fetchone()
		
		self.cursor.execute("SELECT * FROM Dueno WHERE id = %s", (sal[4],))
		due = self.cursor.fetchone()
			
		self.cursor.execute("SELECT * FROM Usuario WHERE id = %s", (due[1],))
		usu = self.cursor.fetchone()
			
		salon = {
			'nombre': sal[1],
			'ubicacion': sal[2],
			'cp': sal[3],
			'costo': sal[5],
			'nombreD': usu[1],
			'apellidoD': usu[2],
			'correo': usu[4],
			'telefono': usu[3],
			'numCuenta': due[2]
		}
		
		salones.append(salon)
		
		return salones
		
		