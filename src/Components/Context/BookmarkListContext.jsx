import React, { createContext, useEffect, useReducer, useState } from 'react'
import { useContext } from 'react'
import ApiRequest from '../../Services/Axios/Config';
import toast from 'react-hot-toast';

const BookmarkContext = createContext()


const initialState = {
  bookmarks : [],
  isLoading : false,
  currentBookmark : {},
  error: {}
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
        bookmarks : action.payload,
      }
    case "bookmark/loaded":
      return {
        ...state,
        isLoading: false,
        currentBookmark : action.payload,
      }
      case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        bookmarks : [...state.bookmarks , action.payload],
        currentBookmark: action.payload,
      }
      case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks : state.bookmarks.filter((item) => item.id !== action.payload),
        currentBookmark: {},
      }
      case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.error,
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
      if (+id === +currentBookmark?.id) return
      dispatch({type : "loading"})
        await ApiRequest(`bookmarks/${id}`)
        .then(response => {
          dispatch({type: "bookmark/loaded" , payload : response.data})
        })
        .catch((error) =>{
          dispatch({type : "rejected" , payload: error.message})
           })
    }
    async function createBookmark(newBookmark) {
      dispatch({type : "loading"})
        await ApiRequest.post('bookmarks' , newBookmark)
        .then(response => {
          dispatch({type : "bookmark/created" , payload : response.data})
          toast.success("New location added to bookmark list")
        })
        .catch((error) =>{
          dispatch({type : "rejected" , payload: error.message})
           })
    }

    async function deleteBookmark(id) {
      dispatch({type : "loading"})
        await ApiRequest.delete(`bookmarks/${id}`)
        .then(response => {
          dispatch({type : "bookmark/deleted" , payload : id})
          toast.success("Location removed from bookmark list")
        })
        .catch(error => {
          dispatch({type : "rejected" , payload: error.message})
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