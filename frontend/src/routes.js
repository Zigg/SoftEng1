// routes.js

import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import HomePage from "./containers/components/main/navbar/pages/HomePage";
import MenuPage from "./containers/components/main/navbar/pages/MenuPage";
import FeaturedPage from "./containers/components/main/navbar/pages/FeaturedPage";
import ContactsPage from "./containers/components/main/navbar/pages/ContactsPage";
import { Login } from "./containers/Login";
import Profile from "./containers/components/user-profile/user/pages/Profile";
import Orders from "./containers/components/user-profile/user/pages/Orders";
import OrderHistory from "./containers/components/user-profile/user/pages/OrderHistory";
import Transactions from "./containers/components/user-profile/user/pages/Transactions";
import DashboardOrders from "./containers/components/dashboard/pages/DashboardOrders";
import DashboardUsers from "./containers/components/dashboard/pages/DashboardUsers";
import DashboardProducts from "./containers/components/dashboard/pages/DashboardProducts";
import DashboardRestaurants from "./containers/components/dashboard/pages/DashboardRestaurants";
import DashboardReports from "./containers/components/dashboard/pages/DashboardReports";
import DashboardSettings from "./containers/components/dashboard/pages/DashboardSettings";
import { DashboardAddProducts } from "./containers/components/dashboard/pages/DashboardAddProducts";
import { DashboardAddRestaurants } from "./containers/components/dashboard/pages/DashboardAddRestaurants";
import DashboardAddUsers from "./containers/components/dashboard/pages/DashboardAddUsers";
import MainDashboard from "./containers/components/dashboard/MainDashboard";
import TopNavbar from "./containers/components/main/TopNavbar";
import { Cart } from "./containers/components/user-profile/user/pages/Cart";

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
        <Route path="/cart" element={<Cart />} />

        <Route path="menu" element={<MenuPage />} />
        <Route path="featured" element={<FeaturedPage />} />
        <Route path="contacts" element={<ContactsPage />} />
      </Route>
    </Routes>
  );
}

// TODO: Add the outlet child routes for the dashboard routes
// FIXME: This doesnt properly render the shared components ... need to fix this
function AdminDashboardRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<MainDashboard />}>
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
