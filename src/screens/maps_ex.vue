<template>
    <div id="Mainconte">
        <capacitor-google-map id="map"></capacitor-google-map>
        <h1>{{ veh_estado }}</h1>
    </div>
</template>


<style scoped>
  capacitor-google-map {
    display: inline-flex;
    width: 70%;
    height: 30rem;
  }
  .Mainconte{
    display:flex;
    align-items: center;
    align-self: center;
    align-content: center;
  }
  
</style>

<script setup>
import { useRoute } from 'vue-router';
import { GoogleMap } from '@capacitor/google-maps';
import { onBeforeMount, onMounted,ref} from 'vue';


const route =useRoute();
const v_ub_LAT = ref("");
const v_ub_LONG = ref("");
const Id_Vquery = route.query.QID;
// const veh_estado = ref("");



const createMap = async () => {
  const mapRef = document.getElementById('map');

    const newMap = await GoogleMap.create({
      id: 'my-map', // Unique identifier for this map instance
      element: mapRef, // reference to the capacitor-google-map element
      apiKey: 'AIzaSyCc9kjbaLqan7C5zh_l55zpFR2E8lzEQ4w', // Your Google Maps API Key
      config: {
        center: {
          // The initial position to be rendered by the map
          lat: v_ub_LAT.value,
          lng: v_ub_LONG.value,
        },
        zoom: 15, // The initial zoom level to be rendered by the map
      },
    });
  };
  console.log(Id_Vquery)

  // const busqueda_V = async () => {
  //   try {
  //        const response = await axios.post('http://localhost:4000/ubicacion_v', {
  //           }
  //         );
  //       }
  //   catch (err) {
  //       error.value = err.message;
  //      }   
  //   }


  onMounted(
    createMap
  )
</script>