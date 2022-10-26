import Axios from "axios"
import Cookies from 'js-cookie'

const authAxiosInstance = Axios.create({
    baseURL: 'https://sv-kb.herokuapp.com/',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
})

authAxiosInstance.interceptors.request.use((config) => {
    if (Cookies.get('sv_token')) {
        config.headers.Authorization = 'Bearer ' + Cookies.get('sv_token');
    }
    return config
})


export const login = (body) => authAxiosInstance.post('/auth/login', { ...body })

export const createUser = (body) => authAxiosInstance.post('/auth/signup', { ...body })