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
import ShiftsPage from "./pages/shifts/ShiftsPage";
import ShiftDetailsPage from "./pages/shifts/ShiftDetailsPage";
function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/shifts" element={<ShiftsPage />} />
        <Route path="/shifts/:shiftId" element={<ShiftDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
