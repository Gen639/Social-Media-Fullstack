# Introducción

En este proyecto de fullstack, se integrarán los conocimientos en las tecnologías Node.js y Express, junto con MongoDB/Mongoose en el backend. Y React + Vite, Redux en el frontend. El objetivo principal es desarrollar una applicacion web para una red social.

# Tecnologías

NodeJS, Express, Mongoose, React + Vite, Redux

# Instalación

Clonar el repositorio y instalar las dependencias. Hay que ir a cada carpeta y ejecutar `npm install`, como en Frontend tanto en Backend.

Para ejecutar este proyecto, deberás agregar las siguientes variables de entorno a tu archivo .env. Se proporciona un ejemplo en .env.example en la carpeta Backend.
PORT, MONGO_URI, JWT_SECRET

Para levantar el servidor -`cd` a backend, ejecuta `npm pun serve`.
Para lanzar la applicacion, `cd` a frontend, ejecuta `npm run dev`.

# Frontend

La navegación se gestiona desde el componente TheHeader, donde dependiendo del rol del usuario (Usuario o Administrador), se proporcionan las opciones de enlaces. El Usuario puede ver su perfil, ver las publicaciones y los comentarios a las publicaciones. Mientras que el Administrador también puede ver la lista de usuarios y eliminarlos.

En el encabezado se integra la búsqueda de publicaciones, que busca publicaciones por título.

Cada publicación tiene una página separada que se renderiza dinámicamente, con la información sobre la publicación y los comentarios.

El proyecto no está completamente diseñado, en algunos casos separados se utilizan elementos de Ant Design.
Redux está compartiento los estados de Auth(users), Posts, Comments.
Como medida de seguridad adicional, se implementaron Guards para las áreas de inicio de sesión y administración. Estos Guards aseguran que solo los usuarios autorizados puedan acceder a las áreas protegidas, proporcionando una capa adicional de seguridad para la aplicación.

Además, en caso de que se acceda a una ruta que no existe, la página 404 será renderizada. Esto mejora la experiencia del usuario al proporcionar una respuesta clara y amigable cuando se intenta acceder a una página que no está disponible.

# Backend

Abajo hay una lista de los endpoint disponibles.
Condiciones de Validación:Las condiciones de validación están indicadas en el modelo correspondiente.

## Rutas para Usuarios

### Crear Usuario

- **Endpoint:** `/users`
- **Método:** `POST`
- **Descripción:** Registra un nuevo usuario.
- **Requiere Autenticación:** No
- **Roles Permitidos:** Todos
- **Controlador:** `UserController.create`

### Iniciar Sesión

- **Endpoint:** `/users/login`
- **Método:** `POST`
- **Descripción:** Inicia sesión y genera un token de acceso.
- **Requiere Autenticación:** No
- **Roles Permitidos:** Todos
- **Controlador:** `UserController.login`

### Obtener Usuario por ID

- **Endpoint:** `/users/id/:_id`
- **Método:** `GET`
- **Descripción:** Obtiene información de un usuario por su ID.
- **Requiere Autenticación:** Sí
- **Roles Permitidos:** Administrador
- **Controlador:** `UserController.getUserByID`

### Obtener Usuario Conectado

- **Endpoint:** `/users/connected`
- **Método:** `GET`
- **Descripción:** Obtiene información del usuario conectado.
- **Requiere Autenticación:** Sí
- **Roles Permitidos:** Todos
- **Controlador:** `UserController.getUserConnected`

### Cerrar Sesión

- **Endpoint:** `/users/logout`
- **Método:** `DELETE`
- **Descripción:** Cierra la sesión del usuario conectado.
- **Requiere Autenticación:** Sí
- **Roles Permitidos:** Todos
- **Controlador:** `UserController.logout`

## Rutas para Posts

### Crear Post

- **Endpoint:** `/posts`
- **Método:** `POST`
- **Descripción:** Crea un nuevo post.
- **Requiere Autenticación:** Sí
- **Roles Permitidos:** Todos
- **Controlador:** `PostController.create`

### Actualizar Post

- **Endpoint:** `/posts/id/:_id`
- **Método:** `PUT`
- **Descripción:** Actualiza un post existente.
- **Requiere Autenticación:** Sí
- **Roles Permitidos:** Autor del Post
- **Controlador:** `PostController.update`

### Eliminar Post

- **Endpoint:** `/posts/id/:_id`
- **Método:** `DELETE`
- **Descripción:** Elimina un post existente.
- **Requiere Autenticación:** Sí
- **Roles Permitidos:** Autor del Post
- **Controlador:** `PostController.delete`

### Obtener Todos los Posts

- **Endpoint:** `/posts/getAll`
- **Método:** `GET`
- **Descripción:** Obtiene todos los posts con usuarios y comentarios.
- **Requiere Autenticación:** No
- **Roles Permitidos:** Todos
- **Controlador:** `PostController.getAll`

### Dar Like a un Post

- **Endpoint:** `/posts/like/:_id`
- **Método:** `PUT`
- **Descripción:** Da un "Like" a un post.
- **Requiere Autenticación:** Sí
- **Roles Permitidos:** Todos
- **Controlador:** `PostController.like`

### Quitar Like a un Post

- **Endpoint:** `/posts/unlike/:_id`
- **Método:** `DELETE`
- **Descripción:** Quita un "Like" de un post.
- **Requiere Autenticación:** Sí
- **Roles Permitidos:** Todos
- **Controlador:** `PostController.unlike`

## Rutas para Comentarios

### Crear Comentario

- **Endpoint:** `/comments`
- **Método:** `POST`
- **Descripción:** Crea un nuevo comentario.
- **Requiere Autenticación:** Sí
- **Roles Permitidos:** Todos
- **Controlador:** `CommentController.create`

### Actualizar Comentario

- **Endpoint:** `/comments/id/:_id`
- **Método:** `PUT`
- **Descripción:** Actualiza un comentario existente.
- **Requiere Autenticación:** Sí
- **Roles Permitidos:** Autor del Comentario
- **Controlador:** `CommentController.update`

### Obtener Todos los Comentarios

- **Endpoint:** `/comments/getAll`
- **Método:** `GET`
- **Descripción:** Obtiene todos los comentarios con usuarios.
- **Requiere Autenticación:** Sí
- **Roles Permitidos:** Todos
- **Controlador:** `CommentController.getAll`

### Eliminar Comentario

- **Endpoint:** `/comments/id/:_id`
- **Método:** `DELETE`
- **Descripción:** Elimina un comentario existente.
- **Requiere Autenticación:** Sí
- **Roles Permitidos:** Autor del Comentario
- **Controlador:** `CommentController.delete`

# Middlewares

## Authentication

Authentication incluye comprobacion del usario con el token en req.headers.authorization. El token está creado en momento de creación del usario.
Middleware de authentication tambien incluye comprobaciones:

- isAdmin. Comprobacion de rol del usario.
- isAuthorPost. Comprobacion de la autoria de post.
- isAuthorComment. Comprobacion de la autoria de comment.

## Errors

Gestiona errores específicos relacionados con la validación de datos y procesamiento de solicitudes en la aplicación:
handleValidationError Function:

- Formatea mensajes de error de validación.
- Envía una respuesta 400 con mensajes de error formateados.
  typeError Middleware:
- Maneja errores de validación y duplicación de claves únicas.
- Responde con mensajes específicos según el tipo de error.
  Este middleware proporciona respuestas adaptadas a diferentes tipos de errores, como validación de datos y duplicación de claves únicas.
  Valida

# Ideas para funcionalidades adicionales

- Implementa el middleware multer para poder adjuntar imágenes al crear o actualizar posts, usarios, commentarios.
- Implementación de followers: que puedas seguir a otros usuarios, que puedas dejar de seguir a otros usuarios.
- Validación en el login: si no has confirmado tu correo no puedes conectarte.
- Comments. Dar un like a un comentario, quitar like a un comentario

# Autor

[Gen639](https://github.com/Gen639)
