<template>
  <div id="app">
    <DefaultLayout />
    <router-view></router-view>
  </div>
</template>

<script>
import DefaultLayout from "./layouts/DefaultLayout.vue";

export default {
  components: {
    DefaultLayout,
  },
};
</script>
