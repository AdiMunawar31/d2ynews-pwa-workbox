import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import BookmarkPage from "./pages/BookmarkPage";

const Router = () => (
  <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:url" element={<Detail />} />
      <Route path="/bookmarks" element={<BookmarkPage />} />
    </Routes>
  </>
);

export default Router;
