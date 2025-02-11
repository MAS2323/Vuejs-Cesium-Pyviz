# demo_temp

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Trabajar con sesium y vueJs en juntos

#### Paso uno: Hay dos formas de trabajar con Cesium y vue

[link cesium para instalarlo en vuejs](https://cesium.com/platform/cesiumjs/)

```sh
# una forma es instalando cesium con el siguiente comando en tu terminal
npm install cesium

# Otras froma es descargando un archivo zip que contiene todo el programa de sesion

```

#### Paso dos: en este tutorial trabajaremos con el archivo de cesium

--- Al descargarlo temos de descomprimirlo en la carpeta public
--- crear un archivo index.html

```sh
# En el header de este archivo haremos las siguientes importaciones
 <!-- Hay que hacer el import de este style y script-->
    <script src="./Cesium-1.126/Build/Cesium/Cesium.js"></script>
    <style>
      @import url(./Cesium-1.126/Build/Cesium/Widgets/widgets.css);
    </style>
```

--- Despues tenemos que agregar la siguiente dependencia a nuestro package.json

```sh
 "globals": {
    "Cesium": true
  }
# vlvemos a instalar las en node pakage module npm 
npm install 
```
