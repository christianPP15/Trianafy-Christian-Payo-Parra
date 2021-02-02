# Trianafy-Christian-Payo-Parra

## API Rest con node, express y mongoose

Dependencias implementadas:
- bcryptjs
- body-parser
- cors
- dotenv
- express
- express-validator
- jsonwebtoken
- mongoose
- morgan
- morgan-body
- passport
- passport-jwt
- passport-local

Pasos para ejecutar el proyecto:
1. Clonar el repositorio
2. Instalar las dependencias con npm start
3. Crear un fichero .env en la raiz del repositorio que contenga las siguientes variables de entorno:
  - PORT=3000 #Puerto de ejecución de express
  - DB_URI=mongodb://localhost/trianafy #URI de conexión a la base de datos de mongo para mongoose
  - JWT_SECRET #Cadena para encryptar el jwt
  - BCRYPT_ROUNDS=12 #Rondas de encryptación de bcrypt
  - JWT_LIFETIME=7d #Tiempo en el que va a caducar el jwt
  - JWT_ALGORITHM=HS256 #Algoritmo de jwt
4. Ejecutar el proyecto con npm start

Importar datos de ejemplo ejecutando los siguientes comandos:
- mongoimport --db trianafy --collection cancions --type json --file cancions.json --jsonArray
- mongoimport --db trianafy --collection usuarios --type json --file usuarios.json --jsonArray
- mongoimport --db trianafy --collection listareproduccions --type json --file listareproduccions.json --jsonArray
Estos comando deberá ejecutarlos en consola en el directorio DataBase.

Para importar el fichero de postman simplemente abrimos la aplicación y en el navbar superior nos da la opción de importar
solo debemos indicar que archivo importar y ya estaría listo para usar.

Contamos con un usuario de ejemplo cuyo nombre de usuarios es "usuario" y su contraseña "1234"

Encontramos los siguientes 4 endpoint:
- /songs
- /list
-/auth
- /list/:id/songs con el id de la playlist

Con las siguientes rutas:

/songs
- get / obtiene todas las canciones
- get /:id obtiene una canción en base a su id
-delete /:id borra una canción en base a su id
-put /:id modifica una canción
-post / agrega una nueva canción

/list
- get / obtiene todas las listas de reproducción
- get /:id obtiene una lista de reproducción en base a su id
- post / crea una nueva lista de reproducción
- put /:id edita una lista de reproducción en base a su id
- delete /:id elimina una lista de producción en base a su id

/auth
- post /login autenticarse 
- post /register registrarse

/list/:id/songs
- get /:id busca una canción en base a su id de la lista de reproducción
- get / busca las canciones de una lista de reproducción
- post /:id agrega una canción a una lista de reproducción
- delete /:id elimina una canción de una lista de reproducción
