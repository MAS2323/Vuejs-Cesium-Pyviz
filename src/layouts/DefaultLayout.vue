<template>
  <header class="navbar">
    <!-- Sección izquierda -->
    <div class="navbar-left"></div>
    <!-- Sección central (búsqueda) -->
    <div class="search">
      <input
        ref="customSearchInput"
        type="text"
        placeholder="Buscar ubicación"
        @keyup.enter="buscar"
      />
      <button class="search-btn" @click="buscar">
        <i class="fas fa-search"></i> Buscar
      </button>
    </div>
    <!-- Sección derecha -->
    <div class="navbar-right">
      <router-link to="/">Home</router-link>
      <router-link to="/global">Global</router-link>
      <router-link to="/explorar">Herramientas</router-link>
      <router-link to="/analysis">Análisis</router-link>
    </div>
  </header>
</template>

<script>
import { ref, inject, onMounted } from "vue";

export default {
  name: "DefaultLayout",
  setup() {
    const customSearchInput = ref(null); // Referencia al campo de búsqueda personalizado
    const cesiumViewer = inject("cesiumViewer"); // Obtener el objeto viewer compartido

    // Función para buscar ubicaciones
    const buscar = () => {
      if (customSearchInput.value && cesiumViewer?.value) {
        const query = customSearchInput.value.value.trim(); // Obtener el valor del campo personalizado
        if (query) {
          console.log("Buscando en Cesium:", query);
          // Acceder al geocoder de Cesium
          const geocoder = cesiumViewer.value.geocoder;
          if (geocoder) {
            // Simular la entrada de texto en el geocoder
            geocoder.viewModel.searchText = query;
            geocoder.viewModel.search();
          } else {
            console.error("No se encontró el geocoder de Cesium.");
          }
        } else {
          console.warn("El campo de búsqueda está vacío.");
        }
      } else {
        console.error(
          "No se encontró el campo de búsqueda personalizado o el objeto viewer."
        );
      }
    };

    onMounted(() => {
      // Verificar si el objeto viewer está disponible
      if (cesiumViewer?.value) {
        console.log("Objeto viewer de Cesium encontrado:", cesiumViewer.value);
      } else {
        console.warn("No se encontró el objeto viewer de Cesium.");
      }
    });

    return { customSearchInput, buscar };
  },
};
</script>

<style scoped>
/* Estilo global para el encabezado */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #004d7a;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}
.search input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 250px;
  transition: width 0.3s ease;
}
.search input:focus {
  width: 300px;
  border-color: #007bff;
  outline: none;
}
.search-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  margin-left: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}
</style>
