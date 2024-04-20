import { createRouter, createWebHashHistory } from "vue-router";
import Login from './screens/Login.vue';
import Register from './screens/Register.vue';
import Home from './screens/Home.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Register', component: Register },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})


export default router;