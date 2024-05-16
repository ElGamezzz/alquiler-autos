<template>
    <body>
        <div class="Contenedor">
            <h1></h1>
            <div class="tarjetas" v-for="vehiculos in v_data":key = "vehiculos"  >
                <h1>{{vehiculos.Categoria}}</h1>
                <h3>{{vehiculos.marca}}</h3>
                <h3>{{vehiculos.modelo}}</h3>
                <h3>{{vehiculos.precio}}</h3>
                <button @click="$router.push({ path: `/mapEx/${vehiculos.idVehiculos}`,query:{QID:vehiculos.idVehiculos} })">Alquilar</button>
            </div>
        </div>
     </body>
</template>
<script setup>
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';

const v_data = ref("");
console.log(v_data)


async function cargar_vehiculos() {

    try {
      const response = await axios.get('http://localhost:4000/vehiculos', {
      });
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

onBeforeMount(
cargar_vehiculos
)

</script>
<style >

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
    border-radius: 10%;
    width: 70%;
}

</style>