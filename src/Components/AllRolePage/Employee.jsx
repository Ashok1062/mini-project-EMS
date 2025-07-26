import React, { useState } from 'react';
import logo from '../logo.jpg';
import { MdMenuOpen } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import Logout from '../Logout';
import { useNavigate } from 'react-router-dom';
import LeaveApplyForm from './Employee/LeaveApplyForm';
import LeaveStatusView from '../LeaveStatusView';


function Employee() {
  const [open, setOpen] = useState(window.innerWidth >= 768); // collapsed on mobile
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [showLeaveStatus, setShowLeaveStatus] = useState(false);
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    <div className="flex">
      {/* Sidebar */}
      <nav className={`shadow-md bg-purple-700 text-white flex flex-col fixed z-50 duration-300 h-screen ${open ? 'w-60' : 'w-0 md:w-16'} overflow-hidden`}>
        {/* Logo & Toggle */}
        <div className='px-3 py-2 h-20 flex justify-between items-center'>
          <img src={logo} alt="logo" className={`rounded-2xl transition-all ${open ? 'w-10' : 'w-0'}`} />
          <MdMenuOpen
            size={30}
            className={`cursor-pointer transition-transform ${!open && 'rotate-180'}`}
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

        {/* Logout */}
        {open && (
          <div className="mt-auto mb-5 px-4">
            <Logout />
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className={`w-full p-6 min-h-screen bg-purple-100 transition-all ${open ? 'ml-60' : 'ml-16'}`}>
        <div className='flex justify-between items-center'>
          <h1 className="text-2xl font-bold text-purple-800">
            Welcome, {loggedInUser?.firstName} {loggedInUser?.lastName}
          </h1>

          {!open && (
            <div>
              <Logout />
            </div>
          )}
        </div>

        {/* Announcements */}
        <button
          onClick={() => navigate('/announcements')}
          className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600"
        >
          View Announcements
        </button>

        {/* Leave Apply */}
        <button
          onClick={() => setShowLeaveForm(!showLeaveForm)}
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 block"
        >
          {showLeaveForm ? "Close Leave Form" : "Leave Apply"}
        </button>

        {/* Leave Status */}
        <button
          onClick={() => setShowLeaveStatus(true)}
          className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 block"
        >
          View Leave Status
        </button>

        {/* Leave Apply Form */}
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

export default Employee;
