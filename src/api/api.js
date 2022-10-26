import Axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = Axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },data:{}
})

// axiosInstance.interceptors.request.use((config) => {
//     if (Cookies.get('sv_token')) {
//         config.headers.Authorization = 'Bearer ' + Cookies.get('sv_token');
//     }
//     console.log(config)
//     return config
// })

export default axiosInstance
