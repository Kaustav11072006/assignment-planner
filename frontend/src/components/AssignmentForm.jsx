// frontend/src/components/AssignmentForm.jsx
import React, { useState } from 'react';

const AssignmentForm = ({ onAddAssignment }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [weightage, setWeightage] = useState(10);
  const [estimatedHours, setEstimatedHours] = useState(2);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !dueDate) return alert('Title and Due Date are mandatory!');

    setLoading(true);
    const success = await onAddAssignment({
      title,
      description,
      due_date: new Date(dueDate).toISOString(), // Parse to UTC ISO string for Python backend compatibility
      weightage: parseFloat(weightage),
      estimated_hours: parseFloat(estimatedHours)
    });

    if (success) {
      // Clear inputs upon confirmed insertion
      setTitle('');
      setDescription('');
      setDueDate('');
      setWeightage(10);
      setEstimatedHours(2);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 border border-gray-100 rounded-xl shadow-sm mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">➕ Add New Assignment</h2>
      
      <div className="grid grid-cols-1 gap-4">
        {/* Title input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Assignment Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Cryptography Lab 3, CNN Architecture Paper"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            required
          />
        </div>

        {/* Description input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Details & Context</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add assignment specifications, grading criteria or resource URLs..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm h-20 resize-none"
          />
        </div>

        {/* Date / Weight / Hours Constraints row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Deadline Date *</label>
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Grade Weight (%)</label>
            <input
              type="number"
              min="1"
              max="100"
              value={weightage}
              onChange={(e) => setWeightage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Effort Estimate (Hours)</label>
            <input
              type="number"
              step="0.5"
              min="0.5"
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-700"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-2 w-full py-2.5 text-sm font-semibold text-white rounded-lg transition-colors ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-sm'}`}
        >
          {loading ? 'Calculating Priorities...' : 'Prioritize & Save'}
        </button>
      </div>
    </form>
  );
};

export default AssignmentForm;