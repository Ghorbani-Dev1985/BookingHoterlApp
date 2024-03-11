import React, { createContext, useEffect, useState } from 'react'
import { useContext } from 'react'
import ApiRequest from '../../Services/Axios/Config';
import toast from 'react-hot-toast';

const BookmarkContext = createContext()

const BookmarkProvider = ({children}) => {
     const [currentBookmark , setCurrentBookmark] = useState("")
    const [bookmarks , setBookmarks] = useState([])
    const [isLoading , setIsLoading] = useState(false)

   useEffect(() => {
      async function getBookmarkList() {
        setIsLoading(true)
        await ApiRequest("bookmarks")
        .then(response => {
          setBookmarks(response.data)
          setIsLoading(false)
        })
        .catch((error) =>{
              setIsLoading(false)
           })
      }
      getBookmarkList()
   }, [])

    async function getBookmark(id) {
      setIsLoading(true)
      setCurrentBookmark("")
        await ApiRequest(`bookmarks/${id}`)
        .then(response => {
          setCurrentBookmark(response.data)
          setIsLoading(false)
        })
        .catch((error) =>{
              setCurrentBookmark("")
              setIsLoading(false)
            
           })
    }
    async function createBookmark(newBookmark) {
      setIsLoading(true)
        await ApiRequest.post('bookmarks' , newBookmark)
        .then(response => {
          console.log(response.data)
          setCurrentBookmark(response.data)
          setBookmarks(prev => [...prev , response.data])
          setIsLoading(false)
          toast.success("New location added to bookmark list")
        })
        .catch((error) =>{
             toast.error(error.message)
              setIsLoading(false)
           })
    }

    async function deleteBookmark(id) {
      setIsLoading(true)
        await ApiRequest.delete(`bookmarks/${id}`)
        setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id))
        

        .catch(error => {
          toast.error(error.message)
          setIsLoading(false)
        })
    
    }

  return (
    <BookmarkContext.Provider value={{bookmarks , isLoading , currentBookmark , getBookmark , createBookmark , deleteBookmark}}>
        {children}
    </BookmarkContext.Provider>
  )
}

export default BookmarkProvider

export const useBookmarks = () => {
   return useContext(BookmarkContext)
}