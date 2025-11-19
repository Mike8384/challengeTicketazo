# Challenge Ticketazo
Automatización de pruebas end-to-end para la plataforma Ticketazo, desarrollada con Cypress.

Este repositorio contiene los tests funcionales que validan los flujos principales del sistema basados en el Documento Funcional y el Manual de Testing. El objetivo es asegurar la calidad del producto mediante la ejecución de pruebas automatizadas, manteniendo una estructura clara, comandos reutilizables y datos de prueba organizados.

### Incluye
- Casos de prueba E2E
- Fixtures y datos mock
- Comandos personalizados
- Configuración completa de Cypress
- Guías de instalación y ejecución
***

##### Plan de pruebas: 
##### Diseño casos de pruebas: 

***
### Requisitos Previos

Asegúrate de tener instalado:

- Node.js v16 o superior
- npm (incluido con Node)
- Verificar versiones: node -v  |  npm -v


### Instalación

1. Clonar el repositorio:

``` 

git clone https://github.com/QAGrupo3/challengeTicketazo.git 

```

2. Ingresar al proyecto:

```

cd challengeTicketazo

```

3. Instalar dependencias:

```

npm install

```

4. Instalar dependencias:

```

npx cypress open



```

### Estructura del proyecto

```
cypress/
│── e2e/                # Casos de prueba (specs)
│── fixtures/           # Datos JSON de prueba
│── support/
│     ├── commands.js   # Comandos personalizados
│     └── e2e.js        # Configuración global
│── downloads/          # Descargas generadas por pruebas
cypress.config.js        # Configuración principal de Cypress
package.json             # Scripts npm y dependencias


```

<img src="https://github.com/user-attachments/assets/2b340cd4-cfbf-4880-a435-c39e68f888c2" width="400">







