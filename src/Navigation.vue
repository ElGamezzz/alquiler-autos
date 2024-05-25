<template>
  <router-link class="header" to="/">
    <h1 class="title">Carsharing</h1>
  </router-link>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="buttons">
        <template v-if="user">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link" aria-haspopup="true">Usuario</a>
            <div class="navbar-dropdown">
              <router-link class="navbar-item" to="/">Home</router-link>
              <a class="navbar-item is-selected" @click.prevent="logout">Cerrar Sesion</a>
            </div>
          </div>
        </template>
        <template v-else>
          <router-link class="button is-primary" to="/signup">
            <strong>Registrarse</strong>
          </router-link>
          <router-link class="button is-light" to="/login">
            Iniciar Sesión
          </router-link>
          <router-link to="/">
            <button class="button">Inicio</button>
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const user = ref(null);
const router = useRouter();

const checkAuth = () => {
  const authToken = localStorage.getItem('authToken');
  user.value = !!authToken;
};

// Initial check on mount
onMounted(() => {
  checkAuth();
});

// Watch for changes in localStorage
watchEffect(() => {
  const authToken = localStorage.getItem('authToken');
  user.value = !!authToken;
});

const logout = () => {
  try {
    localStorage.removeItem('authToken');
    user.value = null;
    router.push('/login');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
</script>
  <style>
  /* Tu CSS aquí */
  body {
    background-color: #000000;
  }
  .header {
    background-color: #000000 !important;
    width: 100%;
  }
  .title {
    font-size: 90px; /* Tamaño de fuente */
    margin: 0; /* Eliminar el margen para centrar */
    line-height: 1; /* Ajustar el espacio entre líneas */
    text-align: center; /* Centrar el texto */
    color: #ffffff !important; /* Color del texto */
    margin-bottom: 2rem;
  }
  /* Estilos generales para la barra de navegación */
  .navbar {
    align-items: center;
    padding: 10px; /* Espaciado interno */
    background-color: transparent !important;
    width: 100%;
    display: flex;
  }
  
  .navbar-brand {
    display: flex;
    align-items: center;
    width: 100%;
  }
  
  .navbar-burger {
    border: none;
    background-color: transparent;
    cursor: pointer;
    width: 100%;
    display: flex;
  }
  
  .navbar-menu {
    align-items: center;
    flex-direction: column;
    background-color: #000000;
    width: 100%;
  }
  
  .navbar-start {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .buttons {
    display: flex;
    align-items: center;
  }
  .ButtonHome {
    background-color: #ffffff;
    color: #000;
    margin-left: 1rem;
    margin-top: 1rem;
    border-radius: 2rem;
    padding: 1.5rem;
    margin-right: 10px;
  }
  .boton {
    background-color: #ffffff;
    color: rgb(0, 0, 0);
    border: none;
    padding: 1.5em;
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 1rem;
    margin-top: 1rem;
    margin-right: 1rem;
    width: auto;
  }
  </style>
  