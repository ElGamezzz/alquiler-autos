<template>
  <div id="app-container">
    <Navigation />
    <router-view></router-view>
    
  </div>
</template>

<script >

import Navigation from '@/Navigation.vue'

export default{
  name: 'App',
  components: {
    Navigation
  },
}
</script>

<style lang = "scss">
  @import './scss/App.scss';
  #app-container {
  background-color: #000000;
  color: #ffffff;
  min-height: 100vh; /* Asegura que el contenedor ocupe toda la altura de la ventana */
  padding: 20px; /* Añade un relleno para separar el contenido de los bordes */
}
</style>
