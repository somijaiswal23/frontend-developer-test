import axios from "axios"

const token = window.localStorage.getItem('AUTH_TOKEN')
if(token){
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
} 
const DEFAULT_SERVER_CONFIG = {
    headers:{
        'accept':'application/json',
        'Content-Type':'application/json'
    }
}
 const httpRequest = async({method="get", url, headers=DEFAULT_SERVER_CONFIG, data=null})=>{
    try{
        const response = axios[method](url, data, headers)
        return response
    } catch(error){
        return error
    }
}

export default httpRequest