import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LeaveApproval() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (e) => {
    e.preventDefault();
    const [leaveRes, userRes] = await Promise.all([
      axios.get("http://localhost:3002/leaveRequests"),
      axios.get("http://localhost:3002/users"),
    ]);

    setLeaveRequests(leaveRes.data);
    setUsers(userRes.data);
  };

  const handleAction = async (id, action) => {
    await axios.patch(`http://localhost:3002/leaveRequests/${id}`, {
      status: action,
    });
    fetchData();
  };

  const calculateLeaveDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start) || isNaN(end)) return 0;
    const diffTime = end - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
  };

  // Combine leave requests with user info and filter roles
  const enhancedRequests = leaveRequests
    .map(req => {
      const user = users.find(u => u.userId === req.userId);
      return user && ["Employee", "Admin", "Hr"].includes(user.role || user.roll) ? {
        ...req,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role || user.roll,
      } : null;
    })
    .filter(req => req !== null);

  const filteredRequests = enhancedRequests
    .filter(req =>
      filterStatus === "All" || req.status === filterStatus
    )
    .filter(req =>
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className='bg-purple-100 min-h-screen py-10'>
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between px-10 gap-4 mb-6'>
        <button
          onClick={() => navigate('/manager')}
          className='text-xl p-2 border hover:bg-purple-400 border-zinc-800 bg-purple-950 text-white w-20 rounded-3xl'
        >
          Back
        </button>

        <div className="flex gap-2">
          {["All", "Pending", "Approved", "Rejected"].map(status => (
            <button
              key={status}
              className={`px-4 py-1 rounded border ${
                filterStatus === status
                  ? "bg-purple-800 text-white"
                  : "bg-white text-purple-800"
              }`}
              onClick={() => setFilterStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search by name, ID, or role..."
          className="px-4 py-2 border rounded w-72 text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="p-6 max-w-2xl text-xl mx-auto bg-purple-300 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center uppercase">
          {filterStatus} Leave Requests
        </h2>

        {filteredRequests.length === 0 ? (
          <p className="uppercase font-bold">
            No {filterStatus.toLowerCase()} leave requests found.
          </p>
        ) : (
          filteredRequests.map((req) => (
            <div key={req.id} className="bg-gray-100 p-4 mb-4 rounded shadow">
              <p><strong>Name:</strong> {req.name}</p>
              <p><strong>Email:</strong> {req.email}</p>
              <p><strong>User ID:</strong> {req.userId}</p>
              <p><strong>Role:</strong> {req.role}</p>
              <p><strong>Leave Type:</strong> {req.leaveType}</p>
              <p><strong>From:</strong> {req.startDate}</p>
              <p><strong>To:</strong> {req.endDate}</p>
              <p><strong>Days of Leave:</strong> {calculateLeaveDays(req.startDate, req.endDate)} days</p>
              <p>
                <strong>Status:</strong>
                <span className={`ml-2 font-semibold ${
                  req.status === 'Approved' ? 'text-green-600' :
                  req.status === 'Rejected' ? 'text-red-600' :
                  'text-yellow-600'
                }`}>
                  {req.status}
                </span>
              </p>

              {req.status === "Pending" && (
                <div className="mt-3 flex gap-3">
                  <button
                    className="bg-green-500 text-white px-4 py-1 rounded"
                    type="button" onClick={() => handleAction(req.id, 'Approved')}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded" type='button'
                    onClick={() => handleAction(req.id, 'Rejected')}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LeaveApproval;
