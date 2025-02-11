<!-- # Configuración de usuario -->
<template>
  <div class="explore-container">
    <div class="header">
      <h1>基于PyViz的智能光SDH数字孪生前端技术研究</h1>
    </div>
    <div class="explore-content">
      <h2>Explorar en el mapa</h2>
      <!-- Aquí puedes agregar más contenido, como botones, mapas, o elementos interactivos -->
    </div>
  </div>
  <div>
    <MapViewer />
  </div>
</template>

<script setup>
// Aquí puedes agregar cualquier lógica de Vue.js si es necesario
import MapViewer from "@/components/MapViewer.vue";
</script>

<style scoped>
.explore-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #004d7a; /* Fondo azul */
  color: white; /* Color blanco para el texto */
  height: 100vh;
  justify-content: center;
}

.header h1 {
  font-size: 24px;
  text-align: center;
  margin: 20px;
}

.explore-content {
  text-align: center;
  margin-top: 20px;
}

.explore-content h2 {
  font-size: 20px;
  margin-top: 20px;
}
</style>
