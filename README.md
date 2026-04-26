````md
# Cómo ejecutar este proyecto

## Requisitos

Antes de comenzar, se deberá tener instalado:

- Node.js (versión LTS recomendada)

Podrá comprobarse ejecutando:

```bash
node -v
npm -v
````

Si no estuviera instalado, se podrá instalar siguiendo los pasos indicados a continuación.

---

## Instalación de Node.js mediante NVM

Se recomienda utilizar **NVM (Node Version Manager)** para instalar Node.js.

### 1. Instalar NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

Después se deberá cargar NVM:

```bash
source ~/.bashrc
```

Si se utiliza zsh:

```bash
source ~/.zshrc
```

---

### 2. Instalar la versión LTS de Node.js

```bash
nvm install --lts
```

---

### 3. Verificar instalación

```bash
node -v
npm -v
```

Si se muestran versiones, la instalación se habrá realizado correctamente.

---

## 1. Clonar el repositorio

Se deberá clonar el repositorio y acceder a la carpeta del proyecto:

```bash
git clone <url del repositorio>
cd nombre-del-proyecto
```

---

## 2. Instalar dependencias

Se deberá ejecutar el siguiente comando:

```bash
npm install
```

Este comando instalará automáticamente todas las dependencias definidas en el archivo `package.json`.

---

## 3. Ejecutar el servidor de desarrollo

Para iniciar el proyecto, se deberá ejecutar:

```bash
npm run dev
```

El proyecto se ejecutará normalmente en:

```txt
http://localhost:3000
```

---

## Notas importantes

* No será necesario instalar Next.js de forma global.
* Todas las dependencias se instalarán automáticamente mediante `npm install`.
* El proyecto utiliza la API proporcionada para la práctica.
* Todas las peticiones a la API incluyen la cabecera obligatoria `x-nombre`.
* Las rutas privadas requieren token JWT almacenado en cookies.

---

# Breve explicación del desarrollo del proyecto

## Metodología seguida

He desarrollado el proyecto siguiendo una estructura modular, separando claramente las responsabilidades en distintos directorios:

* `components/` → componentes reutilizables de la interfaz.
* `lib/` → funciones encargadas de realizar las llamadas a la API.
* `types/` → definición de los tipos TypeScript según el schema de Swagger.
* `app/` → páginas y rutas de la aplicación.

Esto me ha permitido mantener el código organizado, reutilizable y más fácil de mantener.

---

## Estructura de la navegación

La navegación se ha estructurado utilizando el sistema de rutas de Next.js con App Router.

Las rutas principales del proyecto son:

* `/login` → página de inicio de sesión y registro.
* `/` → página principal con el timeline de publicaciones.
* `/post/[id]` → página de detalle de una publicación.
* `/profile/[id]` → página de perfil de usuario.

Además, se ha creado un componente común `Header`, incluido en `layout.tsx`, que aparece en todas las páginas.

Este componente contiene:

* El logo de la aplicación.
* Un enlace a la página principal.
* Un enlace al perfil del usuario autenticado.
* Un botón para cerrar sesión.

La protección de rutas se ha gestionado mediante `middleware.ts`, de forma que si no existe token en las cookies, el usuario es redirigido automáticamente a `/login`.

---

## Gestión de autenticación

La página `/login` contiene dos formularios:

* Formulario de inicio de sesión.
* Formulario de creación de cuenta.

Ambos formularios se alternan mediante estado local, sin necesidad de navegar a otra página.

Cuando el usuario inicia sesión o crea una cuenta correctamente, se guarda en cookies:

* `token`
* `userId`
* `username`

Después se redirige automáticamente a la página principal.

---

## Llamadas a la API

He centralizado las peticiones a la API dentro del archivo:

```txt
lib/utils.ts
```

Desde ahí se gestionan funciones como:

* `loginUser`
* `registerUser`
* `getPosts`
* `createPost`
* `getPostById`
* `likePost`
* `retweetPost`
* `createComment`
* `getMyProfile`
* `getProfileById`
* `followUser`

Esto permite que los componentes no tengan que conocer directamente las URLs de la API, manteniendo el código más limpio.

---

## Cabeceras necesarias

La API requiere una cabecera obligatoria:

```txt
x-nombre
```

Por ello, todas las peticiones incluyen esta cabecera.

Además, salvo login y registro, el resto de endpoints requieren autenticación mediante:

```txt
Authorization: Bearer <token>
```

El token se obtiene desde las cookies y se añade automáticamente en las peticiones protegidas.

---

## Problemas con los datos anidados de la API

Uno de los principales problemas fue que la API devuelve datos anidados.

Por ejemplo, un post no devuelve directamente el nombre del usuario, sino que lo incluye dentro de la propiedad `autor`:

```ts
post.autor.username
```

También ocurre con los comentarios, donde cada comentario contiene su propio autor:

```ts
comentario.autor.username
```

Para resolver esto, adapté los tipos TypeScript al schema real de Swagger.

Por ejemplo:

```ts
export type PostResponse = {
  _id: string;
  contenido: string;
  autor: {
    _id: string;
    username: string;
  };
  likes: string[];
  retweets: Retweet[];
  comentarios: Comentario[];
  createdAt: string;
  updatedAt: string;
};
```

De esta forma, pude acceder correctamente a los datos sin usar propiedades incorrectas como `post.user`, `post.text` o `post.comments`.

---

## Adaptación de los tipos al schema de Swagger

Los tipos se definieron en función de las respuestas reales de la API:

* `UserResponse`
* `AuthResponse`
* `Comentario`
* `PostResponse`
* `HomeResponse`
* `ProfileResponse`
* `FollowResponse`

Esto permitió evitar errores de `undefined` y mostrar correctamente:

* El contenido de los posts.
* El nombre del autor.
* El número de likes.
* El número de retweets.
* Los comentarios.
* Los datos del perfil.

---

## Página principal

La página principal representa el timeline de la red social.

En ella se implementó:

* Carga de publicaciones desde `/api/home`.
* Sistema de paginación.
* Formulario para publicar un nuevo post.
* Listado de publicaciones.
* Botones de like y retweet.

Cada publicación permite acceder al detalle del post y al perfil del autor.

---

## Detalle del post

La ruta utilizada es:

```txt
/post/[id]
```

Esta vista muestra:

* Autor del post.
* Fecha de publicación.
* Contenido completo.
* Número de likes.
* Número de retweets.
* Listado de comentarios.
* Formulario para añadir un comentario.

Los comentarios también trabajan con datos anidados, accediendo al autor mediante:

```ts
comentario.autor.username
```

---

## Página de perfil

La ruta utilizada es:

```txt
/profile/[id]
```

Esta página muestra:

* Nombre de usuario.
* Email.
* Estadísticas de seguidores y seguidos.
* Botón para seguir o dejar de seguir.
* Listado de publicaciones del usuario.

Al pulsar el botón de seguir, se llama al endpoint correspondiente y posteriormente se vuelve a solicitar el perfil para actualizar los datos mostrados.

---

## Componentes principales

He dividido la interfaz en componentes reutilizables:

* `Header` → cabecera común de la aplicación.
* `LoginComponent` → formulario de inicio de sesión.
* `CreateAccountComponent` → formulario de registro.
* `MainComponent` → página principal con timeline y creación de posts.
* `PostComponent` → tarjeta individual de cada publicación.
* `ProfileComponent` → vista del perfil de usuario.

Esta separación permite que cada componente tenga una responsabilidad concreta.

---

## Interacción con publicaciones

Cada post permite realizar varias acciones:

* Dar like.
* Hacer retweet.
* Entrar al detalle del post.
* Acceder al perfil del autor.

Los botones cambian visualmente según el estado del post. Por ejemplo, si una publicación tiene likes, el corazón aparece resaltado.

---

## Problemas encontrados y soluciones aplicadas

### 1. Error con los campos del post

Al principio intenté acceder a campos como:

```ts
post.text
post.user
post.comments
```

Pero la API realmente devuelve:

```ts
post.contenido
post.autor
post.comentarios
```

La solución fue adaptar los tipos y los componentes al schema real de Swagger.

---

### 2. Problemas con el usuario autenticado

El usuario no aparecía correctamente en la cabecera porque la respuesta de la API venía anidada de forma distinta.

La solución fue obtener el perfil mediante `/api/users/me` y cargarlo en el componente `Header`.

---

### 3. Problemas al cerrar sesión

Al cerrar sesión, era necesario borrar correctamente las cookies y redirigir al login.

La solución fue eliminar `token`, `userId` y `username`, y después redirigir a:

```txt
/login
```

---

### 4. Problemas con el botón de publicar

El endpoint de creación de posts espera el campo:

```ts
contenido
```

Por eso la petición se corrigió para enviar:

```ts
{ contenido }
```

---

### 5. Problemas con seguidores y seguidos

Después de seguir a un usuario, el contador no se actualizaba automáticamente.

La solución fue volver a solicitar el perfil tras ejecutar la acción de seguir o dejar de seguir.

---

## Conclusión

He desarrollado el proyecto siguiendo una arquitectura modular basada en componentes reutilizables, rutas dinámicas y consumo de una API REST protegida con JWT.

Durante el desarrollo he trabajado conceptos como:

* Autenticación con JWT.
* Cookies en Next.js.
* Middleware para proteger rutas.
* Consumo de API REST.
* Rutas dinámicas con App Router.
* Renderizado de datos anidados.
* Gestión de formularios.
* Paginación.
* Separación de responsabilidades.
* Tipado con TypeScript según Swagger.

Esto ha permitido construir una aplicación funcional similar a una red social, manteniendo el código organizado y adaptado a la estructura real de la API.

```
```
