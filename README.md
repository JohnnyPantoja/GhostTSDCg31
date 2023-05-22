## GhostTesting

Repositorio creado para que The Software Design Company (TSDC) realice las pruebas sobre el sistema Ghost.
________________
## Wiki

[Wiki](https://github.com/JohnnyPantoja/GhostTSDCg31/wiki)
________________
# Proyecto Pruebas Automatizadas - Grupo 31

## Integrante

| Integrante | Correo|
|--------|--------|
|    Johnny Pantoja    |    jm.pantoja@uniandes.edu.co    |
________________
# Descripción de las funcionalidades de GHOST



ID | Funcionalidad | Descripción | Herramientas 
|--------|--------|--------|--------|
F01 | Crear página | Verificar la correcta creación de una página para el sitio | Playwright & Resemble|
F02 | Editar página | Verificar la correcta edición de una página para el sitio | Playwright & Resemble|
F03 | Crear post | Verificar la correcta creación de un post para el sitio | Playwright & Resemble|
F04 | Editar tag | Verificar la correcta creación de una tag para el sitio | Playwright & Resemble|
F05 | Eliminar tag | Verificar la correcta eliminación de un tag para el sitio | Playwright & Resemble|

# Descripción de los escenarios a comparar con resemble

ID | Escenario | Funcionalidad | Playwriht | Resemble 
|--------|--------|--------|--------|--------|
E01 | Login -> Ir a 'Pages' -> Crear una nueva página -> Agregar título a la página   | F01  |  ✓  |
E02 | Login -> Ir a 'Pages' -> Crear una nueva página -> Agregar título a la página -> Agregar Texto a la página  | F01  |  ✓  |
E03 | ogin -> Ir a 'Pages' -> Crear una nueva página -> Agregar título a la página -> Agregar Texto a la página -> Devolverse al 'Home' -> Buscar titulo de la página -> Ir a la página creada | F01  |  ✓  |
E04 | Login -> Ir a 'Pages' -> Crear una nueva página -> Agregar título a la página -> Agregar Texto a la página -> Publicar la página  |  F01 |  ✓  |
E05 | Login -> Ir a 'Pages' -> Editar una nueva página -> Editar título a la página -> Publicar | F02  |  ✓  |
E06 | Login -> Ir a 'Pages' -> Editar una nueva página -> Agregar título a la página -> Agregar Texto a la página | F02  |  ✓  |
E07 | Login -> Ir a 'Pages' -> Editar una nueva página -> Agregar título a la página -> Agregar Texto a la página | F02  |  ✓  |
E08 | Login -> Ir a 'Pages' -> Editar una nueva página -> Agregar título a la página -> Agregar Texto a la página | F02  |  ✓  |
E09 | Login -> Ir a 'Post' -> Crear post -> Agregar título al post -> Agregar Texto al post -> Publicar | F03  |  ✓  |
E10 | Login -> Ir a 'Post' -> Crear post -> ir ATRAAS -> ir a 'Pages' -> ir a 'Post' -> Crear post -> Agregar título al post -> Agregar Texto a la página | F03  |  ✓  |


## Software utilizado

### Playwright 9.6.6
### Resemble
## Sistema bajo pruebas
### Ghost 5.46.1
### Ghost 3.42


## Pasos para ejecutar 

Se utiliza Playwright para tomar los pantallazos de las diferentes estapas de los escenarios
Despues con los pantallazos obtenidos se utiliza la herramienta RESEMBLE para hallar un indice de similitud entre los pantallazos de la misma pagina en diferentes versiones para este caso es Ghost 5.46 y Ghost 3.42

