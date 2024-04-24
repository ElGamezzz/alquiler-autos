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

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
            error: ''
        };
    },
    methods: {
        async login() {
            this.error = '';
            if (this.email && this.password) {
                try {
                    const response = await axios.post('http://localhost:4000/login', {
                        email: this.email,
                        password: this.password
                    });
                    // Si la respuesta es exitosa, redirige al usuario a la página principal
                    if (response.status === 200) {
                        // Almacenar el token en el localStorage
                        localStorage.setItem('token', response.data.token);
                        // Redirigir al usuario a la página principal, por ejemplo:
                        this.$router.push('/'); // Reemplaza '/ 'con la ruta real de tu página principal
                    } else {
                        this.error = 'Error al iniciar sesión';
                    }
                } catch (error) {
                    this.error = error.message;
                }
            } else {
                this.error = 'Todos los campos son requeridos';
            }
        }
    }
};
</script>

<style>
.body {
    background-color: #8a9fff;
}
.boton-login {
    background-color: #019B7A;
    color: black;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 30px;
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
