import React from "react";
import Map from "../../Map/Map";
import { Outlet } from "react-router-dom";
import { useBookmarks } from "../../Context/BookmarkListContext";

const BookmarkLayout = () => {
  const {bookmarks } = useBookmarks()
  return (
    <section className="container">
      <div className="grid grid-cols-12 gap-3 border border-gray-600 rounded-xl p-2">
        <div className="col-span-12 md:col-span-5 flex flex-col gap-5 p-2">
          <Outlet />
        </div>
        <aside className="col-span-12 md:col-span-7">
          <Map markerLocation={bookmarks} />
        </aside>
      </div>
    </section>
  );
};

export default BookmarkLayout;
