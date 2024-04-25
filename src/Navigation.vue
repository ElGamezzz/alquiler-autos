<template>
    <router-link class="header" to="/">
        <h1 class="title">Carsharing</h1>
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
                <router-link class="ButtonHome" to="/signup">
                    <strong>Registrarse</strong>
                </router-link>
                <router-link class="ButtonHome" to="/login">
                    Iniciar Sesión
                </router-link>
            </template>
            </div>
        
    </div>
    </nav>

</template>

<script>


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
    //     async checkAuth() {
    //                 try {
    //             const token = localStorage.getItem('token');
    //             if (!token) {
    //                 throw new Error('Token no encontrado en el localStorage');
    //             }

    //             const response = await axios.get('http://localhost:4000/checkAuth', {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             });

    //             if (response.data.authenticated) {
    //                 this.user = response.data.user;
    //             } else {
    //                 this.user = null;
    //                 localStorage.removeItem('token');
    //                 this.$router.push('/');
    //             }
    //         } catch (error) {
    //             console.error(error);
    //             this.user = null;
    //             localStorage.removeItem('token');
    //             this.$router.push('/login');
    //         }
    //     }
    // },
    // created() {
    //     this.checkAuth(); 
     }
};
</script>

<style>
body {
    background-color: #000000;
}
.header{
    background-color: #000000 !important;
}
.title {
    font-size: 90px; /* Tamaño de fuente */
    margin: 0; /* Eliminar el margen para centrar */
    line-height: 1; /* Ajustar el espacio entre líneas */
    text-align: center; /* Centrar el texto */
    color: #ffffff !important; /* Color del texto */
    margin-bottom: 2rem;
}
/* Estilos generales para la barra de navegación */
.navbar {
    align-items: center;
    padding: 20; /* Espaciado interno */
    background-color: transparent !important ;
}

.navbar-brand {
    display: flex;
    align-items: center;
}

.navbar-burger {
    border: none;
    background-color: transparent;
    cursor: pointer;
}

.navbar-menu {
    align-items: center;
    flex-direction: column;
    background-color: #000000;
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
.ButtonHome{
    background-color: #ffffff;
    color: #000;
    margin-left: 1rem;
    margin-top: 1rem;
    border-radius: 2rem;
    padding: 1.5rem;
}

</style>
