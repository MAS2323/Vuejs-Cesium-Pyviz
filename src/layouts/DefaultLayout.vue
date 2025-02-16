<template>
  <header class="navbar">
    <!-- Botón para abrir el offcanvas -->
    <div class="navbar-left">
      <button
        class="btn btn-primary menu-icon"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

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
      <router-link to="/">全球</router-link>
      <router-link to="/global">Global</router-link>
      <router-link to="/explorar">Herramientas</router-link>
      <router-link to="/analysis">Análisis</router-link>
    </div>
  </header>

  <!-- Offcanvas (Panel Lateral) -->
  <div
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="offcanvasExample"
    aria-labelledby="offcanvasExampleLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Menú Principal</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <ul class="list-group">
        <li class="list-group-item">
          <router-link to="/">Inicio</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/global">Global</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/explorar">Herramientas</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/analysis">Análisis</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, inject } from "vue";

export default {
  name: "DefaultLayout",
  setup() {
    const customSearchInput = ref(null); // Referencia al campo de búsqueda personalizado
    const cesiumViewer = inject("cesiumViewer"); // Obtener el objeto viewer compartido

    // Función para buscar ubicaciones
    const buscar = () => {
      if (!customSearchInput.value) {
        console.error("El campo de búsqueda no está disponible.");
        return;
      }

      if (!cesiumViewer?.value) {
        console.error("El objeto cesiumViewer no está disponible.");
        return;
      }

      const query = customSearchInput.value.value.trim();
      if (!query) {
        console.warn("El campo de búsqueda está vacío.");
        return;
      }

      console.log("Buscando en Cesium:", query);

      const geocoder = cesiumViewer.value.geocoder;
      if (!geocoder) {
        console.error("El geocoder de Cesium no está disponible.");
        return;
      }

      geocoder.viewModel.searchText = query;
      geocoder.viewModel.search();
    };

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

.navbar-left {
  display: flex;
  align-items: center;
}

.menu-icon {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  cursor: pointer;
}

.menu-icon span {
  display: block;
  width: 100%;
  height: 3px;
  background-color: white;
  border-radius: 5px;
}
.offcanvas {
  background-color: #004d7a;
  color: white;
}
</style>
