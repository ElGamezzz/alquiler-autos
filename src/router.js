import { createRouter, createWebHashHistory } from 'vue-router';
import Alquiler from './screens/Alquiler_page.vue'; // Asegúrate de importar el componente
import Home from './screens/Home.vue';
import Login from './screens/Login.vue';
import Register from './screens/Register.vue';
import maps_ex from './screens/maps_ex.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Register', component: Register },
  { 
    path: '/alquiler', 
    name: 'Alquiler', 
    component: Alquiler, 
    meta: { requiresAuth: true }
  },
  { path: '/mapEx/:id', name: 'map', component: maps_ex }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authToken = localStorage.getItem('authToken');
  if (to.matched.some(record => record.meta.requiresAuth) && !authToken) {
    next('/login');
  } else {
    next();
  }
});

export default router;
