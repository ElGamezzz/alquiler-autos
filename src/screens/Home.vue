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
        <div class="Autos">
        <h1>ya p aqui debería comunicarse con la database para mostrar los autos</h1>
        </div>
    <div class="Autos">
        <h1>ya p aqui debería comunicarse con la database para mostrar los autos x2</h1>
        </div>
        <div class="Autos">
            <h1>he ir añadiendo cuantos más sean necesarios</h1>
            </div>
            <div class="Autos">
                <h1>solo es un ejemplo, no es que vaya a quedar asi oficialmente</h1>
                </div>
                <div class="Autos">
                    <h1>igual que como lo hicieron en el primer trabajo, ya saben</h1>
                    </div>
    </div>
</template>

<script>
export default {};
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
    flex-direction: row ;
    width: 100%;
    flex: auto;
    flex-wrap: wrap;
    display: flex;
}
.Autos{
    background-color: rgb(0, 0, 0);
    height: 100%;
    width: 30%;
    margin: 5px;
    flex-direction: column;
    border-style: dashed;
}
</style>
