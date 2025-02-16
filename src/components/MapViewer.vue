<template>
  <div class="cesium-container">
    <!-- Contenedor del mapa de Cesium -->
    <div id="cesiumContainer"></div>

    <!-- Panel de control -->
    <ControlPanel @start-measurement="startDistanceMeasurement" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ControlPanel from "@/components/ControlPanel.vue"; 
import {
  getViewer,
  imageProviderUno,
  imageProviderDos,
  imageProviderTres,
  configureTimeline,
  DateTimeFormatter,
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

  // Configurar la línea de tiempo
  configureTimeline(viewer.value);
  viewer.value.timeline.makeLabel = DateTimeFormatter;

  // Enfocar la cámara en China con una vista global
  viewer.value.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(103.84, 31.15, 17850000), // Coordenadas de China
  });
});

// Función para iniciar la medición de distancia
function startDistanceMeasurement() {
  setupDistanceCalculator();
}

// Lógica para medir la distancia
function setupDistanceCalculator() {
  let points = [];
  let polylineEntity = null;

  const handler = new Cesium.ScreenSpaceEventHandler(viewer.value.canvas);
  handler.setInputAction((clickEvent) => {
    const cartesian = viewer.value.camera.pickEllipsoid(
      clickEvent.position,
      viewer.value.scene.globe.ellipsoid
    );

    if (cartesian) {
      const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
      const longitude = Cesium.Math.toDegrees(cartographic.longitude);
      const latitude = Cesium.Math.toDegrees(cartographic.latitude);

      points.push({ longitude, latitude });

      // Crear un punto rojo en la posición seleccionada
      viewer.value.entities.add({
        position: cartesian,
        point: {
          pixelSize: 10,
          color: Cesium.Color.RED,
        },
      });

      if (points.length === 2) {
        const cartesianA = Cesium.Cartesian3.fromDegrees(
          points[0].longitude,
          points[0].latitude
        );
        const cartesianB = Cesium.Cartesian3.fromDegrees(
          points[1].longitude,
          points[1].latitude
        );

        // Dibujar una línea entre los dos puntos
        polylineEntity = viewer.value.entities.add({
          polyline: {
            positions: [cartesianA, cartesianB],
            width: 5,
            material: new Cesium.PolylineGlowMaterialProperty({
              glowPower: 0.2,
              color: Cesium.Color.YELLOW,
            }),
          },
        });

        // Calcular la distancia
        const distance = Cesium.Cartesian3.distance(cartesianA, cartesianB);

        // Mostrar la distancia en una etiqueta en el mapa
        const midpoint = Cesium.Cartesian3.fromDegrees(
          (points[0].longitude + points[1].longitude) / 2,
          (points[0].latitude + points[1].latitude) / 2,
          100
        );

        viewer.value.entities.add({
          position: midpoint,
          label: {
            text: `${distance.toFixed(2)} metros`,
            font: "18px sans-serif",
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            showBackground: true,
            backgroundColor: new Cesium.Color(0.1, 0.1, 0.1, 0.8),
          },
        });

        // Reiniciar el array de puntos después de calcular la distancia
        points = [];
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
</script>

<style scoped></style>
