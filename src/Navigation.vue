<template>
    <router-link class="header" to="/">
        <h1 class="h3">Carsharing</h1>
    </router-link>
        <nav class="navbar" role="navigation" aria-label="main navigation">
    <div id="navbarBasicExample" class="navbar-menu">
            <div class="buttons">
            <template v-if="user">
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                    Usuario
                    </a>
                    <div class="navbar-dropdown">
                    <router-link class="navbar-item" to="/">
                        Home
                    </router-link>
                    <a class="navbar-item is-selected" @click.prevent="logout()">
                        Cerrar Sesion
                    </a>
                    </div>
                </div>
            </template>
            <template v-else>
                <router-link class="button is-primary" to="/signup">
                    <strong>Registrarse</strong>
                </router-link>
                <router-link class="button is-light" to="/login">
                    Iniciar Sesión
                </router-link>
            </template>
            </div>
        
    </div>
    </nav>

</template>

<script>

import axios from 'axios'; 

export default {
    data() {
        return {
            user: null
        };
    },
    methods: {
        async logout() {
            localStorage.removeItem('token'); 
            this.user = null; // Limpia el usuario en la sesión
            this.$router.push('/login'); 
        },
        async checkAuth() {
                    try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token no encontrado en el localStorage');
                }

                const response = await axios.get('http://localhost:4000/checkAuth', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data.authenticated) {
                    this.user = response.data.user;
                } else {
                    this.user = null;
                    localStorage.removeItem('token');
                    this.$router.push('/');
                }
            } catch (error) {
                console.error(error);
                this.user = null;
                localStorage.removeItem('token');
                this.$router.push('/login');
            }
        }
    },
    created() {
        this.checkAuth(); 
    }
};
</script>

<style>
body {
    background-color: #8A9FFF;
}
.header{
    background-color: #8A9FFF;
}
.h3 {
    font-size: 90px; /* Tamaño de fuente */
    margin: 0; /* Eliminar el margen para centrar */
    line-height: 1; /* Ajustar el espacio entre líneas */
    text-align: center; /* Centrar el texto */
    color: #ff3131; /* Color del texto */
}
/* Estilos generales para la barra de navegación */
.navbar {
    align-items: center;
    padding: 20; /* Espaciado interno */
}

.navbar-brand {
    display: flex;
    align-items: center;
}

.navbar-item {
    color: #000000; /* Color del texto */
    text-decoration: none; /* Quitar subrayado */
}

.navbar-burger {
    border: none;
    background-color: transparent;
    cursor: pointer;
}

.navbar-menu {
    align-items: center;
    flex-direction: column;
    background-color: #8A9FFF;
}

.navbar-start{
    display: flex;
    align-items: center;
}
.buttons{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.buttons .button {
    margin-left: 0.5rem;
    margin-top: irem;
}

.buttons .button:hover {
    background-color: #ff000038; /* Color de fondo al pasar el mouse */
}
</style>
