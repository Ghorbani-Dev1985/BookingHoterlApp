import { Toaster } from "react-hot-toast";
import Header from "./Components/Header/Header";
import LocationList from "./Components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./Components/Layout/AppLayout";
import Hotels from "./Components/Hotels/Hotels";
import HotelsProvider from "./Components/Context/HotelsProvider";
import SingleHotel from "./Components/SingleHotel/SingleHotel";
import BookmarkLayout from "./Components/Layout/BookmarkLayout/BookmarkLayout";
import BookmarkProvider from "./Components/Context/BookmarkListContext";
import Bookmark from "./Components/Bookmark/Bookmark";
import SingleBookmark from "./Components/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./Components/AddNewBookmark/AddNewBookmark";
import Login from "./Components/Login/Login";
import AuthProvider from "./Components/Context/AuthProvider";
import ProtectRoute from "./Components/ProtectRoute/ProtectRoute";

function App() {
  return (
    <>
    <AuthProvider>
     <BookmarkProvider>
      <HotelsProvider>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
          <Route path="/bookmark" element={<ProtectRoute> 
          <BookmarkLayout />
          </ProtectRoute>}>
          <Route index element={<Bookmark />} />
           <Route path=":id" element={<SingleBookmark />} />
            <Route path="add" element={<AddNewBookmark />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </HotelsProvider>
     </BookmarkProvider>
    </AuthProvider>
    </>
  );
}

export default App;
