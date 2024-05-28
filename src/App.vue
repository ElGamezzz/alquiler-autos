<template>
  <div id="app-container">
    <Navigation />
    <router-view></router-view>
    
  </div>
</template>

<script >

import Navigation from '@/Navigation.vue'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    router.push('/');
  }
});

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
