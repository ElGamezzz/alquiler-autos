<template>
  <div id="Mainconte">
    <div id="CarINFO">
      <h1 id="title" v-if="veh_estado == 'True'">El Vehiculo esta disponible</h1>
      <h1 id="title" v-else>Este vehiculo ya esta reservado o no esta disponible</h1>
      <img :src="img_query" alt="">
      <button>CONFIRMAR</button>
      <router-link  to="/alquiler">
        Volver
      </router-link>
    </div>
    <capacitor-google-map id="map"></capacitor-google-map>
  </div>
</template>

<style scoped>
  #Mainconte {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  #CarINFO {
    width: 45%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left:2%;
    border-width: 2%;
    border-style: dashed;
    border-radius: 10%;
    border-color: rgba(255, 255, 255, 0.411);
    border-width: 5%;
  }

  capacitor-google-map {
    width: 45%;
    height: 30rem;
    margin-right:2%;
  }

  img {
    max-width: 50%;
    max-height: 35%;
    margin-bottom: 1rem;
  }

  button {
    background-color: aliceblue;
    color: black;
    width: 40%;
    height: 2rem;
    margin-bottom: 1rem;
  }
  #title{
    font-size: 150%;
    color: aliceblue;
  }
</style>

<script setup>
import { GoogleMap } from '@capacitor/google-maps';
import axios from 'axios';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const v_ub_LAT = ref("");
const v_ub_LONG = ref("");
const veh_estado = ref("");
const error = ref("");
const Id_Vquery = route.query.QID;
const img_query = route.query.Img


const busqueda_V = async () => {
  try {
    const response = await axios.post('http://localhost:4000/ubicacion', {
      idVehiculos: Id_Vquery
    });
    v_ub_LAT.value = response.data.latitud;
    v_ub_LONG.value = response.data.longitud;
    veh_estado.value = response.data.estado;
    await createMap(); // Crear el mapa después de recibir la ubicación
  } catch (err) {
    error.value = err.message;
  }
};

const createMap = async () => {
  const mapRef = document.getElementById('map');

  const newMap = await GoogleMap.create({
    id: 'my-map', // Unique identifier for this map instance
    element: mapRef, // Reference to the capacitor-google-map element
    apiKey: 'AIzaSyCc9kjbaLqan7C5zh_l55zpFR2E8lzEQ4w', // Your Google Maps API Key
    config: {
      center: {
        // The initial position to be rendered by the map
        lat: parseFloat(v_ub_LAT.value),
        lng: parseFloat(v_ub_LONG.value),
      },
      zoom: 15, // The initial zoom level to be rendered by the map
    },
  });

  const markerId = await newMap.addMarker({
  coordinate: {
    lat: parseFloat(v_ub_LAT.value),
    lng: parseFloat(v_ub_LONG.value)
  },
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Car_with_Driver-Silhouette.svg',
  iconSize:{
    width:25,
    height:20,
  },
  tintColor:{
    r:255,
    g:0,
    b:211,
  }
});
  
};

onBeforeMount(busqueda_V);

onMounted(() => {
  if (v_ub_LAT.value && v_ub_LONG.value) {
      createMap();
  }
});
</script>