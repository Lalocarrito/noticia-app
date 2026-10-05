# noticia-app — Tablero de noticias

> Aplicación web para publicar **noticias/avisos** y **comentarlos** en tiempo real.

Hecha con **React 18** y **Firebase Firestore**, con estilos de **Tailwind CSS**. Cada
noticia se publica con título, contenido y grupo; y cada una tiene su propia sección de
comentarios que se actualiza en vivo.

![React](https://img.shields.io/badge/React-18-61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38BDF8)
![CRA](https://img.shields.io/badge/Create%20React%20App-5-09D3AC)

---

## Tabla de contenido

- [Características](#características)
- [Stack tecnológico](#stack-tecnológico)
- [Requisitos](#requisitos)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Modelo de datos (Firestore)](#modelo-de-datos-firestore)
- [Despliegue](#despliegue)
- [Autor](#autor)

---

## Características

- **Publicar noticias** (título, contenido y grupo) en Firestore.
- **Listado** de todas las noticias.
- **Comentarios por noticia** en **tiempo real** (`onSnapshot`), con formulario plegable.
- **Tema claro/oscuro** con un botón (por defecto, oscuro).
- **Actualización** del listado al publicar una noticia.

## Stack tecnológico

| Capa            | Tecnología                          |
|-----------------|-------------------------------------|
| UI              | React 18 (Create React App)         |
| Backend / DB    | Firebase Firestore (SDK v11)        |
| Estilos         | Tailwind CSS 3                      |
| Hosting         | Firebase Hosting                    |
| Pruebas         | Testing Library, Jest               |

## Requisitos

- **Node.js 18+** y **npm**.
- Un **proyecto de Firebase** con **Firestore** habilitado.

## Instalación y ejecución

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar las credenciales de Firebase

Copia el archivo de ejemplo y coloca tus datos:

```bash
cp .env.example .env.local
```

Variables usadas (Create React App solo expone las que empiezan con `REACT_APP_`):

| Variable                                   | Descripción                    |
|--------------------------------------------|--------------------------------|
| `REACT_APP_FIREBASE_API_KEY`               | API key del proyecto           |
| `REACT_APP_FIREBASE_AUTH_DOMAIN`           | Dominio de autenticación       |
| `REACT_APP_FIREBASE_PROJECT_ID`            | ID del proyecto                |
| `REACT_APP_FIREBASE_STORAGE_BUCKET`        | Bucket de almacenamiento       |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`   | Sender ID de mensajería        |
| `REACT_APP_FIREBASE_APP_ID`                | ID de la app web               |
| `REACT_APP_FIREBASE_MEASUREMENT_ID`        | ID de medición (Analytics)     |

> `.env.local` está ignorado por Git. La configuración se lee en
> [`src/firebase.js`](src/firebase.js).

### 3. Levantar la app

```bash
npm start
```

Abre [http://localhost:3000](http://localhost:3000).



## Modelo de datos (Firestore)

```text
noticias/{noticiaId}
├── titulo     : string
├── contenido  : string
├── grupo      : string
├── fecha      : timestamp
└── comentarios/{comentarioId}
    ├── usuario : string
    ├── texto   : string
    └── fecha   : timestamp
```

## Despliegue

El proyecto usa **Firebase Hosting** (carpeta `build` y rewrite tipo SPA):

```bash
npm run build
firebase deploy
```

## Autor

**Josué Martínez** — [@Lalocarrito](https://github.com/Lalocarrito)
