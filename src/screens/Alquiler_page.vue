<template>
  <div>
    <header></header>
    <h1 class="tittle">Lista de Vehiculos</h1>
    <div class="filtros">
      <div class="filtro">
        <label for="categoria">Filtrar por Categoría:</label>
        <select id="categoria" v-model="categoriaSeleccionada" @change="filtrarVehiculos">
          <option value="">Todas</option>
          <option v-for="categoria in categorias" :key="categoria" :value="categoria">
            {{ categoria }}
          </option>
        </select>
      </div>
      <div class="filtro">
        <label for="precio">Ordenar por Precio:</label>
        <select id="precio" v-model="precioSeleccionado" @change="filtrarVehiculos">
          <option value="">Sin Orden</option>
          <option value="menor">Menor a Mayor</option>
          <option value="mayor">Mayor a Menor</option>
        </select>
      </div>
    </div>
    <div class="Contenedor">
      <div class="tarjetas" v-for="vehiculo in vehiculosFiltrados" :key="vehiculo.idVehiculos">
        <h1>Categoria: {{ vehiculo.Categoria }}</h1>
        <h3>Marca: {{ vehiculo.marca }}</h3>
        <h3>Modelo: {{ vehiculo.modelo }}</h3>
        <h3>Color: {{ vehiculo.color }}</h3>
        <h3>Precio de alquiler: {{ vehiculo.precio }} COP</h3>
        <img :src="vehiculo.imagen">
        <button @click="$router.push({ path: `/mapEx/${vehiculo.idVehiculos}`, query: { QID: vehiculo.idVehiculos, Img: vehiculo.imagen } })">Alquilar Vehiculo</button>
      </div>
    </div>
    <header></header>
  </div>
</template>

<script setup>
import axios from 'axios';
import { computed, onBeforeMount, ref } from 'vue';

const v_data = ref([]);
const categoriaSeleccionada = ref("");
const precioSeleccionado = ref("");
const categorias = ref([]);

const vehiculosFiltrados = computed(() => {
  let filtrados = v_data.value;

  if (categoriaSeleccionada.value) {
    filtrados = filtrados.filter(vehiculo => vehiculo.Categoria === categoriaSeleccionada.value);
  }

  if (precioSeleccionado.value) {
    filtrados = filtrados.slice().sort((a, b) => {
      if (precioSeleccionado.value === 'menor') {
        return a.precio - b.precio;
      } else if (precioSeleccionado.value === 'mayor') {
        return b.precio - a.precio;
      }
      return 0;
    });
  }

  return filtrados;
});

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

    // Obtener categorías únicas
    const categoriasSet = new Set(v_data.value.map(vehiculo => vehiculo.Categoria));
    categorias.value = Array.from(categoriasSet);

  } catch (err) {
    console.error('Error al cargar datos de vehiculo', err);
  }
}

function filtrarVehiculos() {
  // Esta función se llama cuando se selecciona una categoría o un criterio de ordenación
  // El filtrado se realiza automáticamente a través del 'computed' vehiculosFiltrados
}

onBeforeMount(cargar_vehiculos);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jacquard+12&display=swap');

.filtros {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.filtro {
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #ea1212;
}

select {
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  background-color: #1a1a1a;
  color: #fff;
}

select:focus {
  outline: none;
  border-color: #ea1212;
}

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

.Contenedor {
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

button {
  color: black;
  background-color: aliceblue;
  width: 70%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #ccc;
}

img {
  border-radius: 1rem;
  gap: 1rem;
  -webkit-transform: scale(1, 1);
  -webkit-transition-timing-function: ease-out;
  -webkit-transition-duration: 550ms;
  -moz-transform: scale(1, 1);
  -moz-transition-timing-function: ease-out;
  -moz-transition-duration: 500ms;
}

img:hover {
  border-radius: 0%;
  -webkit-transform: scale(1.12, 1.12);
  -webkit-transition-timing-function: ease-out;
  -webkit-transition-duration: 500ms;
  -moz-transform: scale(1.5, 1.5);
  -moz-transition-timing-function: ease-out;
  -moz-transition-duration: 500ms;
}

.tittle {
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
