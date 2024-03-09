
import React, { useEffect } from 'react'

const useOutsideClick = (ref , exceptionID , cb) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if(ref.current && !ref.current.contains(event.target) && event.target.id !== exceptionID) {
        cb()
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    // Clean Up
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [ref , cb])
}

export default useOutsideClick