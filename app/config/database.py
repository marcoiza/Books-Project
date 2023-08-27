import mysql.connector

try:
    db_client = mysql.connector.connect(
        host='mysql-db-s',
        port='3306',  # Puerto predeterminado de MySQL
        user='root',
        password='0936',
        database='bookservice',  # Reemplaza con el nombre de tu base de datos
        charset='utf8'  # Opcional: Puedes especificar el conjunto de caracteres adecuado para tu aplicación
    )
    
    print("Conexión exitosa")
    print("Versión del servidor MySQL:", db_client.get_server_info())
except mysql.connector.Error as ex:
    print("Error al conectarse:", ex)