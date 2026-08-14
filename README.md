# KeyVault 🔐

Gestor de contraseñas web seguro desarrollado como proyecto formativo del programa **Análisis y Desarrollo de Software** del SENA (Ficha 3235887).

## Descripción

KeyVault permite a los usuarios almacenar, organizar y gestionar sus contraseñas de forma segura. Las contraseñas se cifran antes de guardarse en la base de datos y el acceso está protegido mediante autenticación con JWT.

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML, CSS, JavaScript vanilla |
| Backend | Node.js, Express 4 |
| Base de datos | MySQL, MongoDB |
| Seguridad | bcryptjs, jsonwebtoken |
| Configuración | dotenv |
| Control de versiones | Git, GitHub |

## Estructura del Proyecto

KeyVault/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── usuarioController.js
│   │   └── contraseñaController.js
│   ├── middlewares/
│   │   └── auth.js
│   ├── routes/
│   │   ├── usuarios.js
│   │   └── contraseñas.js
│   ├── .env
│   └── app.js
├── dashboard.html
├── index.html
└── README.md

## Base de Datos MySQL

Base de datos: gestor_contrasenas

| Tabla | Descripción |
|-------|-------------|
| usuario | Usuarios registrados con contraseña cifrada |
| categoria | Categorías para organizar contraseñas |
| entrada_contrasena | Contraseñas almacenadas cifradas |
| auditoria_cambios | Registro de cambios realizados |

## Endpoints de la API

### Usuarios

| Método | Ruta | Descripción | Autenticación |
|--------|------|-------------|---------------|
| POST | /api/usuarios | Registrar usuario | No |
| POST | /api/usuarios/login | Iniciar sesión | No |
| GET | /api/usuarios | Listar usuarios | JWT |
| DELETE | /api/usuarios/:id | Eliminar usuario | JWT |

## Instalación y Uso

1. Clonar el repositorio: git clone https://github.com/IngMonito/KeyVault.git
2. Entrar a la carpeta: cd KeyVault/server
3. Instalar dependencias: npm install
4. Crear archivo .env con las variables de entorno
5. Iniciar el servidor: node app.js

## Variables de Entorno

Crear un archivo .env dentro de la carpeta server/ con las siguientes variables:
DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, PORT, JWT_SECRET

## Autor

Samuel Malaver
Ficha: 3235887
