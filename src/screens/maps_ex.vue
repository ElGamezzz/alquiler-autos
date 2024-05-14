<template>
    <div id="Mainconte">
        <capacitor-google-map id="map"></capacitor-google-map>
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
  import { GoogleMap } from '@capacitor/google-maps';
import { onMounted } from 'vue';

  const createMap = async () => {
    const mapRef = document.getElementById('map');

    const newMap = await GoogleMap.create({
      id: 'my-map', // Unique identifier for this map instance
      element: mapRef, // reference to the capacitor-google-map element
      apiKey: 'AIzaSyCc9kjbaLqan7C5zh_l55zpFR2E8lzEQ4w', // Your Google Maps API Key
      config: {
        center: {
          // The initial position to be rendered by the map
          lat: 3.6,
          lng: -7.9,
        },
        zoom: 8, // The initial zoom level to be rendered by the map
      },
    });
  };

  onMounted(
    createMap
  )
</script>