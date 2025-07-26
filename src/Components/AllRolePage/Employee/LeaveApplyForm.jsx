// components/Shared/LeaveApplyForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function LeaveApplyForm({ role }) {
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    role: role || '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const leaveData = {
      ...formData,
      status: 'Pending'
    };

    try {
      await axios.post("http://localhost:3002/leaveRequests", leaveData);
      alert("Leave Request Submitted Successfully");
      setFormData({
        userId: '',
        name: '',
        role: role || '',
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: ''
      });
    } catch (error) {
      console.error("Error submitting leave request:", error);
      alert("Failed to submit leave request.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-purple-400 shadow-lg rounded-xl w-full  max-w-lg mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Apply for Leave</h2>


      <input
        type="text"
        name="userId"
        value={formData.userId}
        onChange={handleChange}
        placeholder="User ID"
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <input
        type="text"
        name="role"
        value={formData.role}
        onChange={handleChange}
        placeholder="Your Role"
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <select
        name="leaveType"
        value={formData.leaveType}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      >
        <option className='bg-purple-300' value="">Select Leave Type</option>
        <option className='bg-purple-200' value="Sick">Sick</option>
        <option className='bg-purple-200' value="Casual">Casual</option>
        <option className='bg-purple-200' value="Earned">Earned</option>
      </select>

      <div className='flex items-center mb-3 gap-3 ' >
        <label >Start Date:</label>

      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        className=" p-2 border rounded"
        required
      />
      <label > End Date:</label>
      <input
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        className=" p-2 border rounded"
        required
      /></div>

      <textarea
        name="reason"
        value={formData.reason}
        onChange={handleChange}
        placeholder="Reason for Leave"
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Submit Leave
      </button>
    </form>
  );
}

export default LeaveApplyForm;
