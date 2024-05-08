<template>
    <div class="container mt-50">
        <div class="columnas">
            <div class="column is-6 is-offset-3">
                <h3 class="title">Iniciar Sesión</h3><hr>
                <form action="#" @submit.prevent="login">

                    <div class="field">
                        <label class="h2">Correo Electrónico</label>
                        <div class="control">
                            <input class="input" type="email" placeholder="correo@example.com" v-model="email">
                        </div>
                    </div>

                    <div class="field">
                        <label class="h2">Contraseña</label>
                        <div class="control">
                            <input class="input" type="password" placeholder="********" v-model="password">
                        </div>
                    </div>

                    <button type="submit" class="boton-login">Iniciar Sesión</button>
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

const email = ref('');
const password = ref('');
const error = ref('');

async function login() {
    error.value = '';
    if (email.value && password.value) {
        try {
            const response = await axios.post('http://localhost:4000/login', {
                email: email.value,
                password: password.value
            });
            if (response.status === 200) {
                // Almacenar el token en el localStorage
                // localStorage.setItem('token', response.data.token);
                // Redirigir al usuario a la página principal, por ejemplo:
                // router.push('/'); // Reemplaza '/ 'con la ruta real de tu página principal
            } else {
                error.value = 'Error al iniciar sesión';
            }
        } catch (err) {
            error.value = err.message;
        }
    } else {
        error.value = 'Todos los campos son requeridos';
    }
}
</script>


<style>
.body {
    background-color: #8a9fff;
    width: 100%;
}
.boton-login {
    color: black;
    border: none;
    border-radius: 1rem;
    padding: 1rem;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 1rem;
    background-color: #ffffff;
    
}
.title {
    color: #ffffff;
}
.h2 {
    color: #ffffff;
}
.input {
    background-color: #778894;
    border-color: #004aad;
    border-radius: 35px;
    border: 4px;
}
</style>
