import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4000/',
    timeout: 10000, 
});

// Manejo global de errores
instance.interceptors.response.use(
    response => response,
    error => {
        console.error('Error en la solicitud:', error);
        return Promise.reject(error);
    }
);

export default instance;