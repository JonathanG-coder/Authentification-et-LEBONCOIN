import axios from 'axios' ;


// Mis sous Cookie, plus pro.
//Resumer : Appel du back, ensuite va vers services : auth.services.js => lespages qui appel le fornt comme par exemple register ou login appelerons ce service avec les endpoints respectifs
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default api



// Garder ce code, si je veux mettre en localstorage, plus facile mais moins pro.
// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
// });

// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token')
//     if (token) {
//         config.headers.Authorization= `Bearer ${token}`;
        
//     } return config;
//    }, (error) => {
//     return Promise.reject(error);
// });

// export default api