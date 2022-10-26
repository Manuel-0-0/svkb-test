import Axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = Axios.create({
    baseURL: 'https://sv-kb.herokuapp.com/api/v1/',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

axiosInstance.interceptors.request.use((config) => {
    if (Cookies.get('sv_token')) {
        config.headers.Authorization = 'Bearer ' + Cookies.get('sv_token');
    }
    return config
})

export default axiosInstance
