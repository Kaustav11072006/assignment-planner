// frontend/src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect targeted coordinates fallback to dashboard
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Authentication rejected.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50/50 px-4">
      <div className="w-full max-w-md bg-white p-8 border border-gray-100 rounded-2xl shadow-sm">
        <div className="text-center mb-6">
          <span className="text-3xl">🔑</span>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight mt-2">Welcome Back</h2>
          <p className="text-xs text-gray-400 mt-1">Sign in to track your upcoming deadlines</p>
        </div>

        {error && (
          <div className="mb-4 p-3 text-xs font-semibold text-red-700 bg-red-50 border border-red-100 rounded-xl">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@university.edu"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 text-sm font-semibold text-white rounded-lg transition-colors mt-2 ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-sm'}`}
          >
            {loading ? 'Verifying Account...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-gray-50 text-xs text-gray-500">
          New user?{' '}
          <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-700">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;