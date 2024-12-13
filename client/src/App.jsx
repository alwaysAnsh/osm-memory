import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Unauthorized from "./pages/Unauthorized";
import VerificationSuccess from "./pages/VerificationSuccess";
import Home from "./pages/Home";
import AuthLogin from "./components/Home/AuthLogin";
import AuthRegister from "./components/Home/AuthRegister";
import AdminLogin from "./components/Home/AdminLogin";
import ProtectedRouteforAdmin from "./components/admin/ProtectedRouteforAdmin";
import AdminDashboard from "./components/admin/AdminDashboard";
import UpdateCategory from "./components/admin/UpdateCategory";
import ProtectedRouteforUser from "./components/user/ProtectedRouteforUser";
import UserDashboardExample from "./components/user/UserDashboardExample";

import ForgotPassword from "./pages/ForgotPassword";
import SetNewPassword from "./pages/SetNewPassword";
import FlashcardProgress from "./components/user/FlashcardProgress";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} /> {/* Hero page */}
        <Route path="/auth-L" element={<AuthLogin />} /> {/* Login page */}
        <Route path="/auth-R" element={<AuthRegister />} />{" "}
        {/* Register page */}
        <Route path="/auth-admin" element={<AdminLogin />} /> {/* Admin page */}
        <Route path="/verification-success" element={<VerificationSuccess />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/reset-password/:userId/:token"
          element={<SetNewPassword />}
        />
        {/* <Route
          path="/reset-password/:userId/:token"
          element={<SetNewPassword />}
        /> */}
        <Route path="*" element={<Unauthorized />} /> {/* protected routess */}
        <Route
          path="/admin-dashboard/:adminId"
          element={
            <ProtectedRouteforAdmin>
              <AdminDashboard />
            </ProtectedRouteforAdmin>
          }
        />
        <Route
          path="/update-category/:categoryId"
          element={
            <ProtectedRouteforAdmin>
              <UpdateCategory />
            </ProtectedRouteforAdmin>
          }
        />
        <Route
          path="/user-dashboard/:userId"
          element={
            <ProtectedRouteforUser>
              <UserDashboardExample />
            </ProtectedRouteforUser>
          }
        />
        <Route
          path="/user-dashboard/:userId/:categoryName/:subcategoryName"
          element={
            <ProtectedRouteforUser>
              <FlashcardProgress />
            </ProtectedRouteforUser>
          }
        />
      </Routes>
    </>
  );
}

export default App;
