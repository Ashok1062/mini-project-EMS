import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LeaveStatusView({ onClose }) {
  const [leaves, setLeaves] = useState([]);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    axios.get("http://localhost:3002/leaveRequests")
      .then(res => {
        const userLeaves = res.data.filter(l => l.userId === user?.userId);
        setLeaves(userLeaves);
      });
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'text-green-600';
      case 'Rejected': return 'text-red-500';
      case 'Pending': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-3xl font-extrabold"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700 uppercase">
          My Leave Status
        </h2>

        {/* Leave Cards */}
        {leaves.length === 0 ? (
          <p className="text-center text-gray-500">No leave requests found.</p>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {leaves.map((leave, index) => (
              <div key={index} className="border border-purple-200 rounded-lg p-4 shadow-sm">
                <p><strong>Type:</strong> {leave.leaveType}</p>
                <p><strong>From:</strong> {leave.startDate}</p>
                <p><strong>To:</strong> {leave.endDate}</p>
                <p><strong>Reason:</strong> {leave.reason}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={`ml-1 font-semibold ${getStatusColor(leave.status)}`}>
                    {leave.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LeaveStatusView;
