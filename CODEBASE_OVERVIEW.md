# Descripción del código (ENCF)

## Panorama general
Este repositorio contiene una aplicación **Shiny** para analizar distancias dentales intercaninas y estimar sexo biológico con modelos logísticos a partir de medidas odontométricas.

El punto de entrada es `app_v2.0/app.R`, que carga:

- configuración global y dependencias (`R/globals.R`),
- interfaz (`ui/main_ui.R`),
- lógica de servidor (`server/main_server.R`).

## Estructura principal

- `app_v2.0/R/globals.R`
  - Carga librerías de Shiny, visualización (`plotly`, `DT`), análisis de datos (`tidyverse`) y ML (`caret`, `yardstick`), además de constantes de dominio para medidas dentales.
- `app_v2.0/ui/main_ui.R`
  - Construye la navegación principal con `navbarPage` y pestañas modulares:
    - muestra de referencia,
    - descripción general,
    - descripción de distancias,
    - estimación de sexo,
    - resultados.
- `app_v2.0/server/main_server.R`
  - Orquesta la lógica cargando secciones del servidor desde `server/sections/*`.
- `app_v2.0/server/sections/core_server_setup.R`
  - Descarga datos desde una hoja pública de Google Sheets,
  - define reactivos base y salidas simples,
  - implementa observadores para mostrar imágenes en modales,
  - conecta un botón de navegación hacia resultados.
- `app_v2.0/server/sections/descriptive_outputs.R`
  - Genera tablas y gráficos descriptivos (pastel, boxplots, dispersión),
  - calcula resúmenes estadísticos por sexo para varias medidas.
- `app_v2.0/server/sections/sex_estimation_logic.R`
  - Define combinaciones de variables (2 a 6 medidas),
  - evalúa compatibilidad de las medidas ingresadas,
  - ejecuta modelos logísticos y construye los textos/resultados de predicción.

## Flujo funcional
1. El usuario selecciona zona/tratamiento y visualiza estadística descriptiva.
2. El usuario introduce una o más medidas odontométricas.
3. El servidor determina el grupo de modelo aplicable.
4. Se calcula la probabilidad y clasificación (male/female).
5. La app presenta interpretación textual y métricas de exactitud del modelo.

## Recursos estáticos
- Imágenes en `app_v2.0/www/images/`.
- JavaScript auxiliar en `app_v2.0/www/js/message-handler.js`.

## Nota de diseño
El proyecto está modularizado por archivos de UI y secciones de servidor, lo que facilita mantenimiento incremental; sin embargo, la lógica de `sex_estimation_logic.R` es extensa y podría beneficiarse de refactorización adicional en funciones más pequeñas.
