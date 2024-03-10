
import { Toaster } from 'react-hot-toast'
import Header from './Components/Header/Header'
import LocationList from './Components/LocationList/LocationList'
import { Route, Routes } from 'react-router-dom'
import AppLayout from './Components/Layout/AppLayout'
import Hotels from './Components/Hotels/Hotels'
import HotelsProvider from './Components/Context/HotelsProvider'
import SingleHotel from './Components/SingleHotel/SingleHotel'
import Bookmark from './Components/Bookmark/Bookmark'



function App() {

  return (
    <>
    <HotelsProvider>
     <Toaster />
            <Header />
            <Routes>
              <Route path='/' element={<LocationList />} />
              <Route path='/hotels' element={<AppLayout />}>
                <Route index element={<Hotels />}/>
                <Route path=':id' element={<SingleHotel />}/>
              </Route>
              <Route path="/bookmark" element={<Bookmark />} />
            </Routes>      
    </HotelsProvider>
    </>
  )
}

export default App
