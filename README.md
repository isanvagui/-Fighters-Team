# Documentación del Proyecto
# Introducción
El proyecto es una aplicación para gestionar productos y reseñas asociadas a los mismos. 
Permite a los usuarios seguir a otros y tener seguidores, permite crear nuevos productos, buscar productos, calificar y reseñar productos, 
así como ver detalles y calificaciones promedio.

# Instalación
1. Clona el repositorio desde GitHub:git clone https://github.com/isanvagui/-Fighters-Team
2. Instala las dependencias del proyecto:npm install
3. Instalar la libreria react-router-dom para la gestión de rutas
4. Instala la biblioteca JWT para decodificar token
5. Instala la libreria axios para hacer solicitudes HTTP desde el servidor usando node.js
6. Instala MongoDB en tu sistema.
7. Inicia la aplicación:npm start

# Uso
1. Inicia sesión con tus credenciales.
2. Crea nuevos productos proporcionando la información requerida.
3. Busca productos por nombre, descripción, etiquetas, calificación o fecha.
4. Califica y deja reseñas en los productos que desees.
5. Consulta los detalles de un producto, incluyendo calificaciones y reseñas asociadas.
6. Muestra mejores producto calificados
7. Muestra los ultimos productos ingresados
8. Muestra los usuarios seguidos y seguidores en el perfil del usuario

# Arquitectura
El proyecto sigue una arquitectura basada en React  para el frontend y utiliza Bootstrap para el diseño y Node.js 
con MongoDB para el backend, utilizando Express para el servidor y Mongoose para interactuar con la base de datos.

# Base de Datos
El proyecto utiliza una base de datos MongoDB para almacenar los datos. Se definen los siguientes modelos:

# Usuarios
- *_id: Identificador único generado por MongoDB.
- *username: Nombre de usuario único.
- *email: Dirección de correo electrónico del usuario.
- *password: Contraseña del usuario (se recomienda almacenarla de forma segura, como un hash).
- *bio: Biografía o descripción del usuario.
- *avatar: URL de la imagen de perfil del usuario.
- *createdAt: Fecha de creación del usuario.
- *updatedAt: Fecha de última actualización del usuario.

# Productos
- *_id: Identificador único generado por MongoDB.
- *name: Nombre del producto.
- *description: Descripción del producto.
- *url: URL del producto.
- *tags: Lista de etiquetas o categorías del producto.
- *userId: Referencia al usuario que publicó el producto.
- *createdAt: Fecha de creación del producto.
- *updatedAt: Fecha de última actualización del producto.

# Reseñas
- *_id: Identificador único generado por MongoDB.
- *productId: Referencia al producto asociado a la reseña.
- *userId: Referencia al usuario que creó la reseña.
- *content: Contenido de la reseña.
- *createdAt: Fecha de creación de la reseña.
- *updatedAt: Fecha de última actualización de la reseña.

# API
La API del proyecto consta de los siguientes endpoints:

# Peticiones
- *POST (http://localhost:3001/api/v1/security/login): Inicia sesión con usuario existente
- *GET (http://localhost:3001/api/v1/product/getComments/): Obtiene los comentarios
- *POST (http://localhost:3001/api/v1/product/): Crear nuevos productos
- *GET('http://localhost:3001/api/v1/product/buscar'): Obtener productos con opciones de filtrado.
- *GET (http://localhost:3001/api/v1/product/getDetail/): Obtiene detalles de un producto específico.
- *GET (http://localhost:3001/api/v1/product/getRateAverage/): Obtiene la calificación promedio de un producto.
- *POST (http://localhost:3001/api/v1/review/new/): Crea la reseña y contenido de la reseña
- *POST (http://localhost:3001/api/v1/security/follow/): Sigue un usuario
- *POST (http://localhost:3001/api/v1/security/unfollow/): Deja de seguir usuarios
- *GET (http://localhost:3001/api/v1/security/followers/): Obtiene los seguidores
- *GET (http://localhost:3001/api/v1/security/users): Obtiene todos los usuarios
- *POST (http://localhost:3001/api/v1/security/register): Registra nuevos usuarios
- *GET (http://localhost:3001/api/v1/security/followedUsers/): Obtiene los usuairos seguidos
- *DELETE (http://localhost:3001/api/v1/product/_id): Eliminar productos existentes

# Contribución
Si deseas contribuir, sigue estos pasos:
1. Realiza un fork del repositorio.
2. Crea una nueva rama para tu contribución:
- *git checkout -b nueva-funcionalidad
3. Realiza los cambios necesarios y haz commit:
- *git commit -am 'Agrega nueva funcionalidad'
4. Sube los cambios a tu fork:
- *git push origin nueva-funcionalidad
5. Crea una solicitud de extracción en GitHub.
