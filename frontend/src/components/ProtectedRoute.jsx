// frontend/src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Show a loading state placeholder while checking token validity on application boot
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Validating Session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect unauthenticated traffic to login page, saving their intended destination state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If validation confirms user token state exists, securely unlock and inject the child layout
  return children;
};

export default ProtectedRoute;