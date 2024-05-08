<template>
    <body>
        <div class="Contenedor">
            <h1></h1>
            <div class="tarjetas" v-for="vehiculos in v_data":key = "vehiculos">
                <h3>{{v_data}}</h3>
            </div>
        </div>
     </body>
</template>
<script setup>
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';

const v_data = ref("");

async function cargar_vehiculos() {

    try {
      const response = await axios.get('http://localhost:4000/vehiculos', {
      });
     v_data.value=response.data;
     console.log(response.data);
    } catch (err) {
      error.value = 'Error al cargar datos de vehiculo';
      console.error(err);
    }
}

onBeforeMount(
cargar_vehiculos
)

</script>
<style>
</style>