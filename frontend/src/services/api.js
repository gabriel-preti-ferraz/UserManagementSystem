import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export async function RegisterAPI(username, email, password) {
    const response = await api.post('/register', {username, email, password})
    return response.data
} 

export async function LoginAPI(email, password) {
    const response = await api.post('/login', {email, password})
    return response.data
}