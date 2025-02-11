<!-- # Componente principal del mapa -->
<template>
  <div class="cesium-container">
    <div id="cesiumContainer" class="h-100 p-0 m-0"></div>
    <DefaultLayout />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { getViewer } from "@/js/cesiumJsConfig.js";
import {
  imageProviderUno,
  imageProviderDos,
  imageProviderTres,
  DateTimeFormatter,
  configureTimeline,
} from "@/js/cesiumJsConfig.js";
onMounted(function () {
  const viewer = new Cesium.Viewer("cesiumContainer", getViewer);
  // Ocultar el logo de Cesium
  viewer._cesiumWidget._creditContainer.style.display = "none";

  // Agregar capas de imágenes
  viewer.imageryLayers.addImageryProvider(imageProviderUno);
  viewer.imageryLayers.addImageryProvider(imageProviderDos);
  viewer.imageryLayers.addImageryProvider(imageProviderTres);

  // Posicionar la cámara en China por defecto
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(103.84, 31.15, 17850000),
  });

  // Configurar la línea de tiempo
  configureTimeline(viewer);
  viewer.timeline.makeLabel = DateTimeFormatter;

  window.viewer = viewer;
  loadscence();
});

async function loadscence() {
  try {
    const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2876903);
    tileset.maximumScreenSpaceError = 2;
    const translation = new Cesium.Cartesian3(0, -5, 0);
    tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
    window.viewer.scene.primitives.add(tileset);
    window.viewer.zoomTo(tileset);
  } catch (error) {
    alert(error);
  }
}
</script>

<style scoped></style>
