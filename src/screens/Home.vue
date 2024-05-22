<template>
    <div class="h2">Bienvenido a la página donde puedes alquilar autos</div>
    <div class="BoxInfo">
        <div class="text-section">
            <div class="h1">¿Qué es carsharing?</div>
            <div class="h3">El carsharing es un servicio de alquiler de coches por períodos cortos de tiempo, normalmente por horas, aunque también se pueden alquilar por días. Se diferencia del alquiler de coches tradicional en dos aspectos principales:
                El tiempo de alquiler: el carsharing se centra en alquileres cortos, mientras que el alquiler tradicional suele ser para periodos más largos, como días o semanas.
                La propiedad de los coches: en el carsharing, los coches suelen ser propiedad de una empresa, mientras que en el alquiler tradicional pueden pertenecer a la empresa o a particulares.
                El carsharing se considera una opción de transporte más flexible y ecológica que tener un coche propio. Es ideal para desplazamientos puntuales por la ciudad o para aquellos que no necesitan un coche a diario.</div>
        </div>
        <div class="image-section">
            <img class="Imagen" src="https://www.gutschild.de/blog/wp-content/uploads/2014/03/carsharing1.jpg" alt="Descripción de la imagen">
        </div>
    </div>
    <div class="h2">Estos son los autos que tenemos disponibles para alquilar</div>
    <div class="InfoAutos">
        <router-link to="/alquiler">
            <button class="Boton">Aqui tenemos los autos para alquilar</button>
        </router-link>

</div>
</template>
<script setup>
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';

const v_data = ref([]);
const vehiculoSeleccionado = ref({});
const modalVisible = ref(false);
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

onBeforeMount(cargar_vehiculos);
function abrirModal(vehiculos){
    vehiculoSeleccionado.value = vehiculos;
    modalVisible.value = true;
}
function cerrarModal(){
    modalVisible.value = false;
}
</script>

<style>
.h2{
    font-weight: bold;
    font-size: 22px;
    text-align: center;
    color:rgb(252, 250, 250);
    width:100%;
}
.h1{
    font-size: 30px;
    text-align: left;
    color:rgb(252, 250, 250)
}
.h3{
    font-size: 15px;
    text-align: left;
    color:rgb(252, 250, 250)
}
.BoxInfo{
    display: flex;
    margin:10px;
    height: auto;
    background-color: rgb(0, 0, 0);
}
.text-section, .image-section {
    flex: 1;
    margin:10px;
    width:50%;
}
.image-section {
    text-align: center;
}
.Imagen{
    border-radius: 50%;
    width: 60%;
    height: 100%;
}
.InfoAutos{
    background-color: rgb(0, 0, 0);
    height: auto;
    margin: 10px;
    flex-direction: column ;
    width: 100%;
    flex: auto;
    flex-wrap: wrap;
    display: flex;
    align-items: center;
}
.Autos{
    background-color: rgb(0, 0, 0);
    height: 100%;
    width: 30%;
    margin: 5px;
    flex-direction: column;
    border-style: dashed;
}
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
}

.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 80%;
    max-width: 500px;
}
.close {
    cursor: pointer;
    font-size: 18px;
}
.Boton{
    background-color: #ffffff;
    color: rgb(0, 0, 0);
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    width: auto;

}
</style>
