
import { Toaster } from 'react-hot-toast'
import Header from './Components/Header/Header'
import LocationList from './Components/LocationList/LocationList'
import { Route, Routes } from 'react-router-dom'
import AppLayout from './Components/Layout/AppLayout'
import Hotels from './Components/Hotels/Hotels'



function App() {

  return (
    <>
     <Toaster />
            <Header />
            <Routes>
              <Route path='/' element={<LocationList />} />
              <Route path='/hotels' element={<AppLayout />}>
                <Route index element={<Hotels />}/>
                <Route path=':id' element={<div>single hotel</div>}/>
              </Route>
            </Routes>
            
    </>
  )
}

export default App
