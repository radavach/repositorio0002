

class Salon:
	def __init__(self, conexion, cursor):
		self.conexion = conexion
		self.cursor = cursor
		
	def crear(self, nombre, ubicacion, codigo_Postal, id_Dueno, costo):
		try:
			insertar = ("INSERT INTO Salon(nombre, ubicacion, codigo_Postal, id_Dueno, costo) VALUES (%s, %s, %s, %s, %s)")
			self.cursor.execute(insertar, (nombre, ubicacion, codigo_Postal, id_Dueno, costo))
			self.conexion.commit()
			return True
		except:
			print("Ocurrio algo inesperado al insertar el Salon")
			return False
	
	def recuperar(self):
		select = ("SELECT * FROM Salon")
		self.cursor.execute(select)
		resultados = self.cursor.fetchall()
		
		return resultados