// frontend/src/components/AssignmentCard.jsx
import React from 'react';

const AssignmentCard = ({ assignment, onToggleComplete, onDelete }) => {
  const { id, title, description, due_date, weightage, estimated_hours, priority_level, priority_score, is_completed } = assignment;

  // Format the ISO datetime string into something human-readable
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Helper function to return custom Tailwind style classes based on the calculated priority level
  const getPriorityBadgeClass = (level) => {
    if (is_completed) return 'bg-gray-100 text-gray-500 border-gray-200';
    
    switch (level) {
      case 'Critical':
        return 'bg-red-100 text-red-700 border-red-200 animate-pulse';
      case 'High':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className={`p-5 mb-4 border rounded-xl shadow-sm transition-all duration-200 ${is_completed ? 'bg-gray-50/80 border-gray-200 opacity-75' : 'bg-white border-gray-100 hover:shadow-md'}`}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        {/* Left Section: Title, Info, Description */}
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h3 className={`text-lg font-bold tracking-tight text-gray-800 ${is_completed ? 'line-through text-gray-400' : ''}`}>
              {title}
            </h3>
            <span className={`px-2.5 py-0.5 text-xs font-semibold border rounded-full ${getPriorityBadgeClass(priority_level)}`}>
              {is_completed ? 'Completed' : `${priority_level} (Score: ${priority_score})`}
            </span>
          </div>

          <p className={`text-sm mb-4 leading-relaxed ${is_completed ? 'text-gray-400' : 'text-gray-600'}`}>
            {description || <span className="italic text-gray-300">No details provided.</span>}
          </p>

          {/* Metadata Footers */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-gray-500">
            <div className="flex items-center gap-1.5">
              <span>📅</span> 
              <span className={!is_completed && priority_level === 'Critical' ? 'text-red-600 font-bold' : ''}>
                Due: {formatDate(due_date)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span>⚖️</span> Weight: <strong className="text-gray-700">{weightage}%</strong>
            </div>
            <div className="flex items-center gap-1">
              <span>⏳</span> Effort: <strong className="text-gray-700">{estimated_hours} hrs</strong>
            </div>
          </div>
        </div>

        {/* Right Section: Interactive Action Controls */}
        <div className="flex sm:flex-col items-center justify-end gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
          <button
            onClick={() => onToggleComplete(id, !is_completed)}
            className={`w-full sm:w-28 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              is_completed 
                ? 'bg-white text-gray-600 hover:bg-gray-50 border-gray-300' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 border-transparent'
            }`}
          >
            {is_completed ? 'Undo Done' : 'Mark Done'}
          </button>
          
          <button
            onClick={() => { if(window.confirm('Remove this assignment?')) onDelete(id) }}
            className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;