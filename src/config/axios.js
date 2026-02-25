import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true
})

// Agregar token del localStorage
const token = localStorage.getItem('AUTH_TOKEN');
if (token) {
    clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Interceptor para agregar el token automáticamente a cada request
clienteAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor para manejar errores de autenticación
clienteAxios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem('AUTH_TOKEN');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});

export default clienteAxios;