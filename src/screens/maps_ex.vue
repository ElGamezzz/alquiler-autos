<template>
    <div id="Mainconte">
        <div id="CarINFO">
          <h1 v-if="veh_estado == 'True' ">El Vehiculo esta disponible</h1>
          <h1 v-else>Este vehiculo ya esta reservado o no esta disponible</h1>
        </div>
        <capacitor-google-map id="map" ></capacitor-google-map>
    </div>
</template>


<style scoped>
  capacitor-google-map {
    display: inline-flex;
    width: 50%;
    height: 30rem;
  }
  .Mainconte{
    display:flex;
    align-items: center;
    align-self: center;
    align-content: center;
  }
  .CarINFO{
    display:flex;
    align-items: center;
    align-self:flex-end;
    align-content: center;
  }
  
</style>

<script setup>
import { useRoute } from 'vue-router';
import { GoogleMap } from '@capacitor/google-maps';
import { onBeforeMount, onMounted, ref } from 'vue';
import axios from 'axios';

const route = useRoute();
const v_ub_LAT = ref("");
const v_ub_LONG = ref("");
const veh_estado = ref("");
const error = ref("");
const Id_Vquery = route.query.QID;


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