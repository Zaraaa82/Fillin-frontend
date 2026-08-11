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
import WorkerRoute from "./guards/WorkerRoute";
import { useAuth } from "./context/AuthContext";
import ProfilePage from "./pages/profile/ProfilePage";
import ProfileFormPage from "./pages/profile/ProfileFormPage";
import WorkerDetailsPage from './pages/profile/WorkerDetailsPage'
import BusinessDetailsPage from './pages/profile/BusinessDetailsPage'
import ProfileCompleteRoute from './guards/ProfileCompleteRoute'

import ShiftsPage from "./pages/shifts/ShiftsPage";
import ShiftDetailsPage from "./pages/shifts/ShiftDetailsPage";
import CreateShiftPage from "./pages/business/CreateShiftPage";
import EditShiftPage from "./pages/business/EditShiftPage";
import BusinessDashboardPage from "./pages/business/BusinessDashboardPage";
import BusinessShiftsPage from "./pages/business/BusinessShiftsPage";
import ShiftApplicationsPage from "./pages/business/ShiftApplicationsPage";
import WorkerApplicationsPage from "./pages/worker/WorkerApplicationsPage";
import ApplicationDetailsPage from "./pages/applications/ApplicationDetailsPage";
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
        <Route path="/shifts" element={<ShiftsPage />} />
        <Route path="/shifts/:shiftId" element={<ShiftDetailsPage />} />
        <Route path="/shifts/create" element={<BusinessRoute><CreateShiftPage /></BusinessRoute>} />
        <Route path="/shifts/:shiftId/edit" element={<BusinessRoute><EditShiftPage /></BusinessRoute>} />
        <Route path="/shifts/:shiftId/applications" element={<BusinessRoute><ShiftApplicationsPage /></BusinessRoute>} />
        <Route path="/business/dashboard" element={<BusinessRoute><BusinessDashboardPage /></BusinessRoute>} />
        <Route path="/business/shifts" element={<BusinessRoute><BusinessShiftsPage /></BusinessRoute>} />
        <Route path="/applications/me" element={<WorkerRoute><WorkerApplicationsPage /></WorkerRoute>} />
        <Route path="/applications/:applicationId" element={<ProtectedRoute><ApplicationDetailsPage /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
