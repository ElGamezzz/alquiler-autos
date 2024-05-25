<template>
    <div>
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <div>
          <label>Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
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
  const iduser =ref("");

  

  const login = async () => {
    error.value = '';
    try {
      const response = await axios.post('http://localhost:4000/login', {
        email: email.value,
        password: password.value,
      }
    );

      iduser.value=response.data.userId;
      const userData = response.data;

      localStorage.setItem('userId', iduser.value);
      localStorage.setItem('authToken', userData.token);
      router.push('/alquiler'); // Redirigir a la ruta /alquiler después del login exitoso
    } catch (err) {
      error.value = 'Error al iniciar sesión';
      console.error(err);
    }
  };

  </script>
  
<style scoped>
.error {
    color: red;
  }

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
