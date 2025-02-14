<template>
  <div class="cesium-container">
    <!-- Contenedor del mapa de Cesium -->
    <div id="cesiumContainer" class="h-100 p-0 m-0"></div>
    <DefaultLayout />
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { getViewer } from "@/js/cesiumJsConfig.js";
import {
  imageProviderUno,
  imageProviderDos,
  imageProviderTres,
  DateTimeFormatter,
  configureTimeline,
} from "@/js/cesiumJsConfig.js";

// Definir viewer como una referencia reactiva
const viewer = ref(null);

onMounted(() => {
  // Inicializar el Viewer de Cesium
  viewer.value = new Cesium.Viewer("cesiumContainer", getViewer);

  // Ocultar el logo de Cesium
  viewer.value._cesiumWidget._creditContainer.style.display = "none";

  // Agregar capas de imágenes
  viewer.value.imageryLayers.addImageryProvider(imageProviderUno);
  viewer.value.imageryLayers.addImageryProvider(imageProviderDos);
  viewer.value.imageryLayers.addImageryProvider(imageProviderTres);

  // Posicionar la cámara en China por defecto
  viewer.value.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(103.84, 31.15, 17850000),
  });

  // Configurar la línea de tiempo
  configureTimeline(viewer.value);
  viewer.value.timeline.makeLabel = DateTimeFormatter;

  // Cargar la escena
  loadScene();
});

async function loadScene() {
  try {
    const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(43978);
    tileset.maximumScreenSpaceError = 2;
    const translation = new Cesium.Cartesian3(0, -5, 0);
    tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
    viewer.value.scene.primitives.add(tileset);
    viewer.value.zoomTo(tileset);
  } catch (error) {
    alert(error);
  }
}

// Compartir el objeto viewer con otros componentes///
provide("cesiumViewer", viewer);
</script>

<style scoped></style>
