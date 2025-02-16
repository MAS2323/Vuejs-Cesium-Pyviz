<template>
  <div class="control-panel">
    <h3>Acciones</h3>
    <button @click="emitStartMeasurement">Medir Distancia</button>
  </div>
</template>

<script setup>
const emit = defineEmits(["start-measurement"]);

function emitStartMeasurement() {
  emit("start-measurement");
}
</script>

<style scoped>
.control-panel {
  position: absolute;
  top: 50px;
  right: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 15px;
  color: black;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.control-panel h3 {
  margin: 0 0 10px;
  font-size: 16px;
}

.control-panel button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.control-panel button:hover {
  background-color: #0056b3;
}
</style>
