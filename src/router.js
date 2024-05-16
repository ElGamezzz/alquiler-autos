import { createRouter, createWebHashHistory } from "vue-router";
import Login from './screens/Login.vue';
import Register from './screens/Register.vue';
import Home from './screens/Home.vue';
import Alquiler_page from "./screens/Alquiler_page.vue";
import maps_ex from "./screens/maps_ex.vue";

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Register', component: Register },
  { path: '/alquiler', name: 'alquiler', component: Alquiler_page },
  { path: '/mapEx/:id', name: 'map', component: maps_ex }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})


export default router;