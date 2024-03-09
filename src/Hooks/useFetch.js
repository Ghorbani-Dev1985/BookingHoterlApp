import React, { useEffect } from 'react'
import { useState } from 'react'
import ApiRequest from '../Services/Axios/Config'

const useFetch = (url , query = "") => {
    const [data , setData] = useState([])
    const [isLoading , setIsLoading] = useState(false)
    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        async function fetchData (){
          setIsLoading(true)
          const fetchCharacter = await ApiRequest(`${url}?${query}` , {signal})
          .then((response) => {
            if(response.status === 200){
                setData(response.data)
                setIsLoading(false)
            }
          })
          .catch((error) =>{
           if(error){
            setData([])
            setIsLoading(false)
           }
          })
        }
  
        fetchData()
        return () => {
          controller.abort()
        }
      }, [query])

      return {isLoading , data}

}

export default useFetch