import Axios from "axios"



const authAxiosInstance = Axios.create({
    baseURL: 'https://sv-kb.herokuapp.com/',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
})

export const login = (body) => authAxiosInstance.post('/auth/login', body)