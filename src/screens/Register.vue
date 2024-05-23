<template>
    <div class="container mt-50">
        <div class="columnas">
            <div class="column is-6 is-offset-3">
                <h3 class="title">Registrate Llenando estos datos</h3><hr>
                <form action="#" @submit.prevent="register">

                    <div class="field">
                        <label class="h2">Nombre</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Alex Smith" v-model="name">
                        </div>
                    </div>

                    <div class="field">
                        <label class="h2">Correo Electronico</label>
                        <div class="control">
                            <input class="input" type="email" placeholder="alexsmith@gmail.com" v-model="email">
                        </div>
                    </div>

                    <div class="field">
                        <label class="h2">Contraseña</label>
                        <div class="control">
                            <input class="input" type="password" placeholder="********" v-model="password">
                        </div>
                    </div>

                    <div class="field">
                        <label class="h2">Ubicación</label>
                        <div class="control">
                            <input class="input" type="ubicacion" placeholder="Ubicación" v-model="ubicacion">
                        </div>
                    </div>

                    <div class="field">
                        <label class="h2">Cédula</label>
                        <div class="control">
                            <input class="input" type="cedula" placeholder="Cédula" v-model="cedula">
                        </div>
                    </div>

                    <button type="submit" class="boton-registro">Registrarse</button>
                </form>
                <div class="notification is-danger mt-10" v-if="error">
                    {{ error }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const ubicacion = ref('');
const cedula = ref('');
const error = ref('');

const register = async () => {
  error.value = '';
  if (name.value && email.value && password.value && ubicacion.value && cedula.value) {
    try {
      const response = await axios.post('http://localhost:4000/signup', {
        name: name.value,
        email: email.value,
        password: password.value,
        ubicacion: ubicacion.value,
        cedula: cedula.value
      });
      console.log(response.data);  // Puedes mostrar una confirmación o hacer otras acciones después de registrar al usuario
      router.push('/login');
    } catch (err) {
      error.value = 'Error al registrar usuario';
      console.error(err);
    }
  } else {
    error.value = 'Todos los campos son requeridos';
  }
}
</script>

<style>
.body {
    background-color: #8a9fff;
}
.boton-registro{
    background-color: #ffffff;
    color: black;
    border: none;
    border-radius: 1rem;
    padding: 1.5rem;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 2rem; /* Ajusta este valor según lo que necesites */
}
.title{
    color:#000000;
}
.h2{
    color:#000000;
}
.input{
    background-color: #778894;
    border-color: #004aad;
    border-radius: 35px;
    border: 4px;
}
</style>
