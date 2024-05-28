<template>
  <div class="container mt-50">
    <div class="columnas">
      <div class="column is-6 is-offset-3">
        <h3 class="title">Iniciar Sesión</h3>
        <hr>
        <form @submit.prevent="login">
          <div class="field">
            <label class="h2">Correo Electrónico</label>
            <div class="control">
              <input class="input" type="email" placeholder="alexsmith@gmail.com" v-model="email" required>
            </div>
          </div>
          <div class="field">
            <label class="h2">Contraseña</label>
            <div class="control">
              <input class="input" type="password" placeholder="********" v-model="password" required>
            </div>
          </div>
          <button type="submit" class="boton-registro">Iniciar Sesión</button>
        </form>
        <div v-if="error" class="notification is-danger mt-10">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();
const iduser = ref('');

const login = async () => {
  error.value = '';
  try {
    const response = await axios.post('http://localhost:4000/login', {
      email: email.value,
      password: password.value,
    });

    iduser.value = response.data.userId;
    const userData = response.data;

    localStorage.setItem('userId', iduser.value);
    localStorage.setItem('authToken', userData.token);
    router.push('/alquiler'); // Redirigir a la ruta /alquiler después del login exitoso
    
    // Recargar la página después de un breve retraso para asegurar la redirección
    setTimeout(() => {
      window.location.reload();
    }, 100);
  } catch (err) {
    error.value = 'Error al iniciar sesión';
    console.error(err);
  }
};
</script>

<style scoped>
.body {
  background-color: #8a9fff;
}

.boton-registro {
  background-color: #ffffff;
  color: black;
  border: none;
  border-radius: 1rem;
  padding: 1.5rem;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 2rem;
}

.title {
  color: #000000;
}

.h2 {
  color: #000000;
}

.input {
  background-color: #778894;
  border-color: #004aad;
  border-radius: 35px;
  border: 4px;
}
</style>