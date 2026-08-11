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
import BusinessRoute from "./guards/BusinessRoute";
import { useAuth } from "./context/AuthContext";
import ShiftsPage from "./pages/shifts/ShiftsPage";
import ShiftDetailsPage from "./pages/shifts/ShiftDetailsPage";
import CreateShiftPage from "./pages/business/CreateShiftPage";
import EditShiftPage from "./pages/business/EditShiftPage";
import BusinessDashboardPage from "./pages/business/BusinessDashboardPage";
import BusinessShiftsPage from "./pages/business/BusinessShiftsPage";
import ShiftApplicationsPage from "./pages/business/ShiftApplicationsPage";
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
        <Route path="/shifts/create" element={<BusinessRoute><CreateShiftPage /></BusinessRoute>} />
        <Route path="/shifts/:shiftId/edit" element={<BusinessRoute><EditShiftPage /></BusinessRoute>} />
        <Route path="/shifts/:shiftId/applications" element={<BusinessRoute><ShiftApplicationsPage /></BusinessRoute>} />
        <Route path="/business/dashboard" element={<BusinessRoute><BusinessDashboardPage /></BusinessRoute>} />
        <Route path="/business/shifts" element={<BusinessRoute><BusinessShiftsPage /></BusinessRoute>} />
      </Routes>
    </div>
  );
}

export default App;
