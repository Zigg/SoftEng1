// routes.js

import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

// User Top Nav bar pages
import {
  HomePage,
  MenuPage,
  AboutPage,
  ContactsPage,
} from "./containers/components/main/index.js";

import { Login } from "./containers/index.js";

// User Profile Pages
import {
  Profile,
  Orders,
  OrderHistory,
  Transactions,
  Checkout
} from "./containers/components/user-profile/index.js";


// Dashboard Pages
import {
  DashboardOrders,
  DashboardUsers,
  DashboardProducts,
  DashboardRestaurants,
  DashboardReports,
  DashboardSettings,
  DashboardAddRestaurants,
  DashboardAddUsers,
  DashboardAddProducts
} from "./containers/components/dashboard/pages/index.js";



// Main Pages
import { MainDashboard } from "./containers/components/dashboard/index.js";
import { TopNavbar } from "./containers/components/main/index.js";
import { Footer } from "./containers/components/main/navbar/pages/components/Footer.jsx";
import { MenuItemProductPage } from "./containers/components/main/navbar/pages/MenuItemProductPage.jsx";
// import { Checkout } from "./containers/components/user-profile/user/pages/Checkout.jsx";

function MainPageRoutes() {
  return (
    <Routes>
      {/* TODO: 404 Page doesn't work properly */}
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route path="/login" element={<Login />} />
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}

function UserProfileRoutes() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/order-history" element={<OrderHistory />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  );
}

function MainPageTopNavbarRoutes() {
  return (
    <Routes>
      <Route
        element={
          <>
            <TopNavbar />
            <Outlet />
          </>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="menu/:id" element={<MenuItemProductPage />} />
        <Route path="checkout" element={<Checkout />} />

        <Route path="featured" element={<AboutPage />} />
        <Route path="contacts" element={<ContactsPage />} />
      </Route>
    </Routes>
  );
}



// TODO: Add the outlet child routes for the dashboard routes
function AdminDashboardRoutes() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<MainDashboard />}>
        <Route path="orders" element={<DashboardOrders />} />
        <Route path="users" element={<DashboardUsers />} />
        <Route path="products" element={<DashboardProducts />} />
        <Route path="restaurants" element={<DashboardRestaurants />} />
        <Route path="reports" element={<DashboardReports />} />
        <Route path="settings" element={<DashboardSettings />} />
      </Route>
    </Routes>
  );
}

// TODO: Add the outlet child routes for the dashboard routes
// TODO: Fix the routing compoennt rendering
function AdminDashboardAddRoutes() {
  return (
    <Routes>
      <Route
        path="/dashboard/products/add"
        element={<DashboardAddProducts />}
      />
      <Route
        path="/dashboard/restaurants/add"
        element={<DashboardAddRestaurants />}
      />
      <Route path="/dashboard/users/add" element={<DashboardAddUsers />} />
    </Routes>
  );
}

// Export your route components

export {
  MainPageRoutes,
  UserProfileRoutes,
  MainPageTopNavbarRoutes,
  AdminDashboardRoutes,
  AdminDashboardAddRoutes,
};

export default function AllRoutes() {
  return (
    <>
      <MainPageRoutes />
      <UserProfileRoutes />
      <MainPageTopNavbarRoutes />
      <AdminDashboardRoutes />
      <AdminDashboardAddRoutes />
    </>
  );
}
