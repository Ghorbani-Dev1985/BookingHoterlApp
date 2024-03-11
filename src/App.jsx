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

function App() {
  return (
    <>
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
          <Route path="/bookmark" element={<BookmarkLayout />}>
          <Route index element={<Bookmark />} />
           <Route path=":id" element={<SingleBookmark />} />
            <Route path="add" element={<AddNewBookmark />} />
          </Route>
        </Routes>
      </HotelsProvider>
     </BookmarkProvider>
    </>
  );
}

export default App;
