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

axiosInstance.interceptors.response.use((response) => response,
    (error) => {
        if (error.response.status === 403) {
            if (!window.location.pathname.includes('login')) {
                Cookies.remove('sv_token')
                Cookies.remove("sv_user");
                Cookies.remove("sv_user_id")
                Promise.reject({ error: 'Session Expired, please Login again to continue' });
                setTimeout(() => window.location.href = `${window.location.origin}/login`, 3000)
            }

        }
        return Promise.reject(error);
    })

export default axiosInstance
