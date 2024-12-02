
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FarmerDashboard from './pages/FarmerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import HowItWorks from './pages/HowItWorks';
import Login from './pages/Login';
import Register from './pages/Register';
import Schemes from './pages/Schemes';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import StatusCheck from './pages/StatusCheck';
import ProtectedRoute from './components/ProtectedRoute';
import { auth } from './services/api';

function App() {
  const currentUser = auth.getCurrentUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/status" element={<StatusCheck />} />
        <Route path="/register" element={<Register/>}/>
        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            currentUser ? (
              <Navigate to={currentUser.role === 'farmer' ? '/farmer' : '/admin'} />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/register"
          element={
            currentUser ? (
              <Navigate to={currentUser.role === 'farmer' ? '/farmer' : '/admin'} />
            ) : (
              <Register />
            )
          }
        />
        
        {/* Protected Routes */}
        <Route
          path="/farmer/*"
          element={
            <ProtectedRoute role="farmer">
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;