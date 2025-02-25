 
import axios  from 'axios'

const api = axios.create({baseURL:'https://localhost:2005'})

api.interceptors.request.use(

(config)=>{

const token = typeof window !=='undefined' && localStorage.getItem('authToken')

if (token) {
    config.headers.Authorization=`Bearer ${token}`    
}
return config
},
(error)=>Promise.reject(error)
)

export default api