<template>
    <div>
      <header></header>
      <h1 class="tittle">Lista de Vehiculos</h1>
      <div class="Contenedor">
        <div class="tarjetas" v-for="vehiculos in v_data" :key="vehiculos.idVehiculos">
          <h1>Categoria: {{ vehiculos.Categoria }}</h1>
          <h3>Marca: {{ vehiculos.marca }}</h3>
          <h3>Modelo: {{ vehiculos.modelo }}</h3>
          <h3>Color: {{ vehiculos.color }}</h3>
          <h3>Precio de alquiler: {{ vehiculos.precio }} COP</h3>
          <img :src="vehiculos.imagen">
          <button @click="$router.push({ path: `/mapEx/${vehiculos.idVehiculos}`, query: { QID: vehiculos.idVehiculos, Img: vehiculos.imagen } })">Alquilar</button>
        </div>
      </div>
      <header></header>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
import { onBeforeMount, ref } from 'vue';
  
  const v_data = ref("");
  
  async function cargar_vehiculos() {
    try {
      const response = await axios.get('http://localhost:4000/vehiculos');
      v_data.value = response.data.map(item => {
        try {
          if (item.Caracteristicas) {
            const caracteristicasParsed = JSON.parse(item.Caracteristicas);
            return {
              idVehiculos: item.idVehiculos,
              ...caracteristicasParsed
            };
          } else {
            return {
              idVehiculos: item.idVehiculos,
              error: 'Missing characteristics data'
            };
          }
        } catch (parseError) {
          return {
            idVehiculos: item.idVehiculos,
            error: 'Error parsing data'
          };
        }
      });
    } catch (err) {
      error.value = 'Error al cargar datos de vehiculo';
      console.error(err);
    }
  }
  
  onBeforeMount(cargar_vehiculos);
  </script>
<style scoped >

@import url('https://fonts.googleapis.com/css2?family=Jacquard+12&display=swap');

.tarjetas {
    color: aliceblue;
    width: 20%;
    display: flex;
    flex-direction: column;
    background-color: rgb(26, 26, 26);
    justify-content: center;
    align-content: center;
    align-items: center;
}

.Contenedor{  
    align-content: center;
    justify-self: center;
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5rem;

    }
button{
    color: black;
    background-color: aliceblue;
    width: 70%;
}
img{
    border-radius: 1rem;
    gap:1rem;
    -webkit-transform: scale(1,1);
    -webkit-transition-timing-function: ease-out;
    -webkit-transition-duration: 550ms;
    -moz-transform: scale(1,1);
    -moz-transition-timing-function: ease-out;
    -moz-transition-duration: 500ms;
}
img:hover{
    border-radius: 0%;
    -webkit-transform: scale(1.12,1.12);
    -webkit-transition-timing-function: ease-out;
    -webkit-transition-duration: 500ms;
    -moz-transform: scale(1.5,1.5);
    -moz-transition-timing-function: ease-out;
    -moz-transition-duration: 500ms;
}
.tittle{
    font-size: 50px; /* Tamaño de fuente */
    margin: 0; /* Eliminar el margen para centrar */
    line-height: 1; /* Ajustar el espacio entre líneas */
    text-align: center; /* Centrar el texto */
    color: #ea1212 !important; /* Color del texto */
    margin-bottom: 2rem;
    font-family: "Jacquard 12", system-ui;
    font-weight: 400;
    font-style: normal;
}
</style>