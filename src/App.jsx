import { useState } from "react";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import SignInPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import { getCurrentUser, logout } from "./services/authService";
import ProtectedRoute from "./guards/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import ProfilePage from "./pages/profile/ProfilePage";
import ProfileFormPage from "./pages/profile/ProfileFormPage";
import WorkerDetailsPage from './pages/profile/WorkerDetailsPage'
import BusinessDetailsPage from './pages/profile/BusinessDetailsPage'
import ProfileCompleteRoute from './guards/ProfileCompleteRoute'

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile/me" element={<ProtectedRoute><ProfileCompleteRoute> <ProfilePage /></ProfileCompleteRoute></ProtectedRoute>} />

        {/* Remember to direct the user to this route when he signs in */}
        <Route path="/profile/form" element={<ProtectedRoute><ProfileFormPage/></ProtectedRoute>} />

        <Route path="/profile/worker/:id" element={<ProtectedRoute><WorkerDetailsPage/></ProtectedRoute>} />
        <Route path="/profile/business/:id" element={<BusinessDetailsPage/>} />
      </Routes>
    </div>
  );
}

export default App;
