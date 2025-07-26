import React, { useState } from 'react';
import logo from '../logo.jpg';
import { MdMenuOpen } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import Logout from '../Logout';
import { useNavigate } from 'react-router-dom';
import LeaveApplyForm from './Employee/LeaveApplyForm';
import LeaveStatusView from '../LeaveStatusView';

function Admin() {
  const [open, setOpen] = useState(true);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [showLeaveStatus, setShowLeaveStatus] = useState(false); 
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLeave = () => {
    setShowLeaveForm(!showLeaveForm);
    setShowLeaveStatus(false);
  };

  const handleLeaveStatus = () => {
    setShowLeaveStatus(true);
    setShowLeaveForm(false);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <nav className={`shadow-md h-screen bg-purple-700 text-white flex flex-col fixed z-50 duration-500 ${open ? 'w-60' : 'w-16'}`}>
        {/* Logo & Toggle */}
        <div className='border px-3 py-2 h-20 flex justify-between items-center'>
          <img src={logo} alt="logo" className={`${open ? 'w-10' : 'w-0'} rounded-2xl`} />
          <MdMenuOpen
            size={37}
            className={`cursor-pointer duration-500 ${!open && 'rotate-180'}`}
            onClick={() => setOpen(!open)}
          />
        </div>

        {/* User Info */}
        <div className='mt-10 px-4 flex flex-col items-center gap-3'>
          <FaRegUserCircle size={50} />
          <div className={`${!open && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>
            <p className='text-lg font-bold'>ID: {loggedInUser?.userId}</p>
            <p className='text-lg font-semibold text-white'>
              {loggedInUser?.firstName} {loggedInUser?.lastName}
            </p>
            <p className='text-sm'>{loggedInUser?.email}</p>
            <p className='uppercase'>{loggedInUser?.role}</p>
          </div>
        </div>

        {/* Logout when sidebar open */}
        {open && (
          <div className="mt-auto mb-5 px-4">
            <Logout />
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <div className={`flex flex-col w-full p-6 min-h-screen bg-purple-100 ${open ? 'ml-60' : 'ml-16'}`}>
        <div className='flex justify-between'>
          <h1 className="text-2xl font-bold text-purple-800">
            Welcome, {loggedInUser?.firstName} {loggedInUser?.lastName}
          </h1>

          {/* Logout when sidebar is closed */}
          {!open && (
            <button className="w-25">
              <Logout />
            </button>
          )}
        </div>

        {/* Announcements Button */}
        <button
          onClick={() => navigate('/announcements')}
          className="mt-3 bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 w-fit"
        >
          View Announcements
        </button>

        {/* Leave Apply Button */}
        <button
          onClick={handleLeave}
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-fit"
        >
          {showLeaveForm ? "Close Leave Form" : "Leave Apply"}
        </button>

        {/* View My Leave Status Button */}
        <button
          onClick={handleLeaveStatus}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 w-fit"
        >
          View My Leave Status
        </button>

        {/* Conditional Leave Form */}
        {showLeaveForm && (
          <div className="mt-4">
            <LeaveApplyForm />
          </div>
        )}

        {/* Leave Status View Modal */}
        {showLeaveStatus && (
          <LeaveStatusView onClose={() => setShowLeaveStatus(false)} />
        )}
      </div>
    </div>
  );
}

export default Admin;
