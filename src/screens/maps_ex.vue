<template>
  <div id="Mainconte">
    <div id="CarINFO">
      <h1 id="title" v-if="veh_estado == 'True'">El Vehiculo está disponible</h1>
      <h1 id="title" v-else>Este vehiculo ya esta reservado o no esta disponible</h1>
      <img :src="img_query" alt="Imagen del Vehiculo">
      <div class="date-container">
        <h3 v-if="veh_estado == 'True'">Tu reserva comienza ahora {{ fecha.toISOString().slice(0, 16) }} y termina:</h3>
        <input v-if="veh_estado == 'True'" type="datetime-local" v-model="date_alquiler_final" :min="fecha.toISOString().slice(0, 16)" :max="maxDate.toISOString().slice(0, 16)" class="date-input">
      </div>
      <button v-if="veh_estado == 'True'" @click="confirmarAlquiler">CONFIRMAR</button>
      <button v-if="veh_estado == 'True'" @click="mostrarModalPago">Pagar</button>
      <router-link to="/alquiler">Volver</router-link>
      <div class="message" v-if="message">{{ message }}</div>
    </div>
    <capacitor-google-map id="map"></capacitor-google-map>

    <!-- Modal de Pago -->
    <div v-if="mostrarModal" class="modal-overlay">
      <div class="modal">
        <h2>Información de Pago</h2>
        <p>Precio del vehículo: {{ precio_vehiculo }} COP</p>
        <p>Código de pago: {{ codigoPago }}</p>
        <p>Puedes pagar en el punto Efecty más cercano.</p>
        <button @click="cerrarModal">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #Mainconte {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    margin-bottom: 1rem;
  }

  #CarINFO {
    width: 40%;
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
  .date-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
}

.date-input {
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.message{
  color: rgba(0, 255, 170, 0.815);
}
/* Estilos del modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Sombra */
}

.modal-title {
  margin-top: 0;
}

.modal-content {
  margin-bottom: 10px;
}

.modal-close {
  background-color: #ccc;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
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
const message = ref("");
const mostrarModal = ref(false); // Definir mostrarModal aquí

const Id_Vquery = route.query.QID;
const img_query = route.query.Img

const date_alquiler = ref("");
const date_alquiler_final = ref("");

const fecha = new Date();
const maxDate = new Date(fecha.getTime() + 24 * 60 * 60 * 1000);


const userId = localStorage.getItem('userId');


console.log(date_alquiler_final );

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

const generarCodigoPago = () => {
  // Generar un código de 6 dígitos aleatorio
  codigoPago.value = Math.floor(100000 + Math.random() * 900000);
};

const createAlquiler = async () => {
      try {
        date_alquiler.value=fecha.toISOString().slice(0, 16);
        const response = await axios.post('http://localhost:4000/setalquiler', {
          date_alquiler: date_alquiler.value,
          date_alquiler_final: date_alquiler_final.value,
          id_vehiculo_alquilado: Id_Vquery,
          id_user_alquilador: userId,
        });
        message.value = `Alquiler creado con ID: ${response.data.idAlquiler_V}`;
      } catch (error) {
        message.value = `Error: ${error.response ? error.response.data.error : error.message}`;
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
const mostrarModalPago = () => {
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
};

onBeforeMount(busqueda_V);

onMounted(() => {
  if (v_ub_LAT.value && v_ub_LONG.value) {
      createMap();
  }
});
</script>