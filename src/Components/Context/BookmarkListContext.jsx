import React, { createContext, useEffect, useReducer, useState } from 'react'
import { useContext } from 'react'
import ApiRequest from '../../Services/Axios/Config';
import toast from 'react-hot-toast';

const BookmarkContext = createContext()


const initialState = {
  bookmarks : [],
  isLoading : false,
  currentBookmark : "",
  error: ""
}

function BookmarkReducer(state = initialState, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      }
    case "bookmarks/loaded":
      return {
        ...state,
        isLoading : false,
        bookmarks : action.payload
      }
    case "bookmark/loaded":
      return {
        ...state,
        currentBookmark : action.payload
      }
      case "bookmark/created":
      return {
        ...state,
        currentBookmark : action.payload
      }
      case "bookmark/deleted":
      return {
        ...state,
        currentBookmark : action.payload
      }
      case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      throw new Error("Unknown action")
  }
}



const BookmarkProvider = ({children}) => {
    //  const [currentBookmark , setCurrentBookmark] = useState("")
    // const [bookmarks , setBookmarks] = useState([])
    // const [isLoading , setIsLoading] = useState(false)
 
   const [{bookmarks , isLoading , currentBookmark} , dispatch] = useReducer(BookmarkReducer , initialState)

   useEffect(() => {
      async function getBookmarkList() {
        dispatch({type : "loading"})
        await ApiRequest("bookmarks")
        .then(response => {
          dispatch({type : "bookmarks/loaded" , payload : response.data})
        })
        .catch((error) =>{
            dispatch({type : "rejected" , payload: error.message})
           })
      }
      getBookmarkList()
   }, [])

    async function getBookmark(id) {
      dispatch({type : "loading"})
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