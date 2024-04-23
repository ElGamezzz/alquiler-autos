<template>
    <router-link class="header" to="/">
        <h1 class="h3">Carsharing</h1>
    </router-link>
        <nav class="navbar" role="navigation" aria-label="main navigation">
    <div id="navbarBasicExample" class="navbar-menu">
            <div class="buttons">
        <router-link class="navbar-item" to="/">Inicio</router-link>
            <router-link class="button is-primary" to="/signup">
                <strong>Registrarse</strong>
            </router-link>
            <router-link class="button is-light" to="/login">
                Iniciar Sesión
            </router-link>
            </div>
        
    </div>
    </nav>

</template>

<script>



export default{

}

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
