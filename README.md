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
