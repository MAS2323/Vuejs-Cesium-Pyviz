<!-- # Layout para páginas con estadísticas -->
<template>
  <header class="navbar">
    <div class="navbar-left">
      <button class="menu-btn">
        <i class="fas fa-bars"></i>
      </button>
      <div class="logo">
        <!-- <img src="/logo.png" alt="Logo" /> -->
      </div>
    </div>
    <div class="search-bar">
      <input type="text" placeholder="搜索位置" />
      <button class="search-btn">
        <i class="fas fa-search"></i>
      </button>
    </div>
    <div class="navbar-right">
      <router-link to="/global">全球</router-link>
      <router-link to="/explorar">工具</router-link>
      <button class="grid-btn">
        <i class="fas fa-th"></i>
      </button>
      <button class="profile-btn">
        <i class="fas fa-user-circle"></i>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: "DefaultLayout",
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #004d7a;
  color: white;
  padding: 10px 20px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.navbar-left,
.navbar-right {
  display: flex;
  align-items: center;
}

.menu-btn,
.search-btn,
.grid-btn,
.profile-btn {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  margin: 0 10px;
}

.logo img {
  height: 30px;
}

.search-bar {
  display: flex;
  background: #222;
  border-radius: 5px;
  overflow: hidden;
}

.search-bar input {
  border: none;
  padding: 8px;
  background: #222;
  color: white;
  outline: none;
}

.navbar-right a {
  color: white;
  text-decoration: none;
  margin: 0 10px;
}

.content {
  margin-top: 60px; /* Para evitar que el contenido quede detrás del navbar */
}
</style>
