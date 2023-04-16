# Descripción
Esta es una aplicación de gestión de tareas que permite realizar operaciones CRUD (crear, leer, actualizar y eliminar) en una base de datos de tareas.

# Dependencias
- Node.js - para la parte del servidor
- Express - para crear el servidor web
- PostgreSQL - para almacenar los datos de las tareas
- Cors - para permitir las solicitudes de origen cruzado (CORS)

# Archivo index.ts
- **`cors`** y **`express`** son importados como dependencias necesarias para el servidor.
- **`createTableIfNotExists`** es una función que se importa desde el módulo db.js y se utiliza para crear la tabla en la base de datos si aún no existe.
- **`taskRouter`** es el router de las rutas específicas de las tareas, se importa desde el módulo tasks.routes.ts.
- Se crea una instancia de la aplicación Express y se establece el número del puerto en el que escuchará el servidor.
- Se utiliza el middleware **`cors`** para permitir solicitudes desde cualquier origen.
- Se utiliza el middleware **`express.json()`** para parsear las solicitudes entrantes con el formato JSON.
- Se establece el prefijo "/api" para todas las rutas manejadas por el **`taskRouter`**.
- Se inicia el servidor y se muestra un mensaje en la consola indicando en qué puerto se está escuchando y se llama a la función **`createTableIfNotExists`** para crear la tabla en la base de datos.

# Archivo config.ts
Este archivo exporta un objeto de configuración con los valores de conexión a la base de datos.

- **`DB_USER`**, **`DB_PASSWORD`**, **`DB_HOST`**, **`DB_PORT`** y **`DB_DATABASE`** son variables de entorno que se utilizan para conectar a la base de datos. Si no se establecen estas variables de entorno, se utilizan valores predeterminados.

# Archivo tasks.routes.ts
Este archivo define un enrutador de Express para manejar las rutas relacionadas con las tareas (tasks) de la aplicación. Importa el módulo Router de Express y las funciones del controlador de tareas (taskCtrl) definidas en otro archivo.

Luego, crea una instancia del enrutador y define las rutas y los controladores de cada una de ellas usando los métodos HTTP correspondientes:

-**`GET`** a **`/tasks`** para obtener todas las tareas.
-**`GET`** a **`/tasks/:id`** para obtener una tarea específica por su ID.
-**`POST`** a **`/tasks`** para crear una nueva tarea.
-**`DELETE`** a **`/tasks/:id`** para eliminar una tarea por su ID.
-**`PUT`** a **`/tasks/:id`** para actualizar una tarea por su ID.
Estas rutas llamarán a las funciones correspondientes en el controlador de tareas definido en el otro archivo.

# Archivo tasks.services.ts
Este archivo exporta funciones que realizan operaciones CRUD en la tabla de tareas en la base de datos.

-**`getServiceTasks`** devuelve todas las tareas existentes en la tabla de tareas.
-**`getServiceTask`** devuelve una tarea específica con el id proporcionado.
-**`existsTitle`** devuelve true si ya existe una tarea con el título proporcionado.
-**`createServiceTask`** crea una nueva tarea en la base de datos y devuelve la tarea creada.
-**`deleteServiceTask`** elimina una tarea específica de la base de datos.
-**`updateServiceTask`** actualiza el título y la descripción de una tarea específica en la base de datos y devuelve la tarea actualizada.

# Archivo tasks.controllers.ts
El código proporcionado en la documentación es un conjunto de controladores para la aplicación web que implementan la funcionalidad CRUD (Crear, Leer, Actualizar, Eliminar) para una lista de tareas.

En primer lugar, se importa el módulo de express y se crea una instancia de la aplicación web. A continuación, se importan los controladores de tareas, que se utilizarán para definir las rutas de la API REST.

Los controladores definen cinco rutas diferentes para manejar diferentes acciones: obtener todas las tareas, obtener una tarea en particular, crear una nueva tarea, eliminar una tarea existente y actualizar una tarea existente.

Cada controlador toma dos parámetros de entrada, una solicitud (Request) y una respuesta (Response), y utiliza los servicios definidos en el archivo **`task.service.ts`** para acceder a la base de datos y realizar las operaciones correspondientes.

Si alguna operación falla, el controlador manejará el error y enviará una respuesta de error adecuada al cliente. Si la operación se realiza correctamente, el controlador devolverá una respuesta exitosa junto con los datos solicitados o un código de estado sin contenido si no hay datos para devolver.

# Archivo db.ts
Este archivo contiene la configuración y creación de la conexión a la base de datos, así como la creación de la tabla 'task' si aún no existe.

Se utiliza el módulo 'pg' para conectarse a PostgreSQL y se importa la configuración del archivo 'config.ts'.

La variable 'pool' contiene la instancia de conexión a la base de datos, que se inicializa utilizando la configuración en 'config.ts'.

La función 'createTableIfNotExists' se encarga de conectarse a la base de datos y crear la tabla 'task' si aún no existe. Se utiliza la extensión "uuid-ossp" para generar UUIDs para la columna 'id'.

Si la tabla ya existe, no se realizará ninguna acción y se imprimirá un mensaje en la consola indicando que la conexión a la base de datos se ha establecido correctamente. En caso de que ocurra algún error durante la creación de la tabla, se imprimirá un mensaje de error en la consola indicando el error.
