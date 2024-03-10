import React, { createContext, useState } from 'react'
import { useContext } from 'react'
import useFetch from '../../Hooks/useFetch';
import ApiRequest from '../../Services/Axios/Config';

const BookmarkContext = createContext()

const BookmarkProvider = ({children}) => {
     const [currentBookmark , setCurrentBookmark] = useState("")
    const [isLoadingCurrentBookmark , setIsLoadingCurrentBookmark] = useState(false)
    const { data: bookmarks , isLoading } = useFetch("bookmarks", '');
    async function getBookmark(id) {
      setIsLoadingCurrentBookmark(true)
        const getHotelData = await ApiRequest(`bookmark/${id}`)
        .then(response => {
          setCurrentBookmark(response.data)
          setIsLoadingCurrentBookmark(false)
        })
        .catch((error) =>{
            if(error){
              setCurrentBookmark("")
              setIsLoadingCurrentBookmark(false)
            }
           })
    }
  return (
    <BookmarkContext.Provider value={{bookmarks , isLoading , currentBookmark , getBookmark, isLoadingCurrentBookmark}}>
        {children}
    </BookmarkContext.Provider>
  )
}

export default BookmarkProvider

export const useBookmarks = () => {
   return useContext(BookmarkContext)
}