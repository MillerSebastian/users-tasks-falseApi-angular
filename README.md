# UserTaskFakeApi

Este proyecto fue generado usando [Angular CLI](https://github.com/angular/angular-cli) versión 20.3.2.

## Requisitos previos

- Node.js (versión 18 o superior)
- npm o yarn
- Angular CLI

## Instalación

1. Clona el repositorio
2. Instala las dependencias:

```bash
npm install
```

## Levantar el proyecto

### 1. Iniciar JSON Server (Base de datos fake)

Este proyecto utiliza JSON Server para simular una API REST. Debes iniciarlo en una terminal separada:

```bash
npx json-server --watch public/Database/db.json --port 3000
```

La API estará disponible en `http://localhost:3000` con los siguientes endpoints:

- `GET/POST/PUT/DELETE /users` - Gestión de usuarios
- `GET/POST/PUT/DELETE /tasks` - Gestión de tareas
- `GET/POST/PUT/DELETE /role` - Gestión de roles

### 2. Iniciar el servidor de desarrollo de Angular

En otra terminal, ejecuta:

```bash
ng serve
```

Una vez que el servidor esté ejecutándose, abre tu navegador y navega a `http://localhost:4200/`. La aplicación se recargará automáticamente cuando modifiques cualquier archivo fuente.

**Nota:** Es importante que ambos servidores (JSON Server en puerto 3000 y Angular en puerto 4200) estén ejecutándose simultáneamente para que la aplicación funcione correctamente.

## Generación de código

Angular CLI incluye herramientas poderosas para generar código. Para generar un nuevo componente, ejecuta:

```bash
ng generate component component-name
```

Para una lista completa de esquemas disponibles (como `components`, `directives`, o `pipes`), ejecuta:

```bash
ng generate --help
```

## Construcción del proyecto

Para construir el proyecto ejecuta:

```bash
ng build
```

Esto compilará tu proyecto y almacenará los artefactos de construcción en el directorio `dist/`. Por defecto, la construcción de producción optimiza tu aplicación para rendimiento y velocidad.

## Ejecutar pruebas unitarias

Para ejecutar pruebas unitarias con el ejecutor de pruebas [Karma](https://karma-runner.github.io), usa el siguiente comando:

```bash
ng test
```

## Ejecutar pruebas end-to-end

Para pruebas end-to-end (e2e), ejecuta:

```bash
ng e2e
```

Angular CLI no viene con un framework de pruebas end-to-end por defecto. Puedes elegir uno que se adapte a tus necesidades.

## Recursos adicionales

Para más información sobre el uso de Angular CLI, incluyendo referencias detalladas de comandos, visita la página [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
