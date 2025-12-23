import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export async function RegisterAPI(username, email, password) {
    const response = await api.post('/register', {username, email, password})
    return response.data
} 

export async function LoginAPI(email, password) {
    const response = await api.post('/login', {email, password})
    return response.data
}

export async function UserListAPI() {
    const response = await api.get("/users")
    return response.data
}