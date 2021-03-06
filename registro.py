

class Registro:
	def __init__(self, conexion, cursor):
		self.conexion = conexion
		self.cursor = cursor
	
	def crear(self, id_Usuario, id_Salon, fecha, horas, precio):
		try:
			insertar = ("INSERT INTO Salon_Cliente(id_Usuario, id_Salon, fecha, horas, precio) VALUES (%s, %s, %s, %s, %s)")
			self.cursor.execute(insertar, (id_Usuario, id_Salon, fecha, horas, precio))
			self.conexion.commit()
			
			return True
		
		except:
			print('No pudo crear el salón')
			return False
		
	#mostrar todos los registros de renta a los usuarios
	def recuperar(self):
		select = ("SELECT * FROM Salon_Cliente")
		self.cursor.execute(select)
		resultados = self.cursor.fetchall()
		
		return resultados
		