// frontend/src/pages/Dashboard.jsx
import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import AssignmentForm from '../components/AssignmentForm';
import AssignmentCard from '../components/AssignmentCard';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all assignments from the backend
  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/assignments/');
      setAssignments(response.data);
      setError('');
    } catch (err) {
      console.error('Failed to fetch assignments:', err);
      setError('Could not sync assignments from the server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  // Handler: Add a new assignment
  const handleAddAssignment = async (newAssignmentData) => {
    try {
      const response = await api.post('/assignments/', newAssignmentData);
      // Prepend or re-fetch to let the backend sorting logic order it correctly
      setAssignments((prev) => [response.data, ...prev]);
      fetchAssignments(); // Re-fetch ensures perfect dynamic sorting scores
      return true;
    } catch (err) {
      console.error('Error adding assignment:', err);
      alert(err.response?.data?.detail || 'Failed to save assignment.');
      return false;
    }
  };

  // Handler: Toggle complete status
  const handleToggleComplete = async (id, is_completed) => {
    try {
      const response = await api.put(`/assignments/${id}`, { is_completed });
      // Update local state and trigger a subtle re-fetch to adjust priorities
      setAssignments((prev) =>
        prev.map((item) => (item.id === id ? response.data : item))
      );
      fetchAssignments();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  // Handler: Remove an assignment row
  const handleDelete = async (id) => {
    try {
      await api.delete(`/assignments/${id}`);
      setAssignments((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Error deleting assignment:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Workspace Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back! Here are your dynamically sorted priority deadlines.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl">
          ⚠️ {error}
        </div>
      )}

      {/* Grid Layout splitting Form input and Task Streams */}
      <div className="grid grid-cols-1 gap-8">
        <section>
          <AssignmentForm onAddAssignment={handleAddAssignment} />
        </section>

        <section>
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              Priority Execution Stack ({assignments.length})
            </h2>
            <button 
              onClick={fetchAssignments}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
            >
              🔄 Sync Board
            </button>
          </div>

          {loading && assignments.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Compiling prioritization tracks...</p>
            </div>
          ) : assignments.length === 0 ? (
            <div className="text-center py-16 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
              <span className="text-3xl block mb-2">🎉</span>
              <p className="text-sm font-semibold text-gray-700">All caught up!</p>
              <p className="text-xs text-gray-400 mt-0.5">Add a task above to spin up the priority engine.</p>
            </div>
          ) : (
            <div className="space-y-1">
              {assignments.map((assignment) => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;