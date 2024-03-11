import axios from "axios";
import toast from "react-hot-toast";



const ApiRequest = axios.create({
    baseURL: 'https://bookinghotelappapii.vercel.app/',
    
})

ApiRequest.interceptors.request.use(
    (config) => {return config},
    (error) => {return Promise.reject(error)}
    )

ApiRequest.interceptors.response.use(
    (response => {
        return response
    }),
    (error) => {
        // if(!axios.isCancel()){
        //     toast.error(`${error.response.data.error}`)
        // }
      
        return Promise.reject(error)
    }
)

export default ApiRequest