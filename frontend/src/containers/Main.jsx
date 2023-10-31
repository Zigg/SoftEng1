import React from "react";
import TopNavbar from "./components/main/TopNavbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/main/navbar/pages/HomePage";
import MenuPage from "./components/main/navbar/pages/MenuPage";
import FeaturedPage from "./components/main/navbar/pages/FeaturedPage";
import ContactsPage from "./components/main/navbar/pages/ContactsPage";

// FIXME: The routes for menubar, featured, and contacts are not working
export const Main = () => {
  return (
    <main>
      <TopNavbar />
      <Routes>
      <Route index element={<HomePage />} />
      <Route path="menu" element={<MenuPage />} />
      <Route path="featured" element={<FeaturedPage />} />
      <Route path="contacts" element={<ContactsPage />} />
    </Routes>
    </main>
  );
};
