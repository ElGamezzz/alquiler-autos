<template>
    <body>
        <div class="Contenedor">
            <h1></h1>
            <div class="tarjetas" v-for="vehiculos in v_data":key = "vehiculos"  >
                <h2>{{vehiculos.Categoria}}</h2>
                <h3>{{vehiculos.marca}}</h3>
                <h1>{{vehiculos.precio}}</h1>
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
    width: 40%;
    height: 80%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: row;
    background-color: rgb(26, 26, 26);

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
    }
</style>