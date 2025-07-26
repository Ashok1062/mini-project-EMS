import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import logo from '../logo.jpg';
import { MdMenuOpen } from "react-icons/md";
import Logout from '../Logout';
import LeaveApplyForm from './Hr/LeaveApplyForm';
import LeaveStatusView from '../LeaveStatusView';

function Hr() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [showLeaveForm, setShowLeaveForm] = useState(false); 
    const [showLeaveStatus, setShowLeaveStatus] = useState(false); 

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleAddEmployee = () => {
    navigate('/hr/add-employee');
  };

  const handleLeave = () => {
    setShowLeaveForm(!showLeaveForm); 
  };

  

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

        {open && (
          <div className="mt-auto mb-5 px-4">
            <Logout />
          </div>
        )}
      </nav>

      {/* Main HR Content */}
      <div className={`flex flex-col w-full p-6 h-dvw bg-purple-100 ${open ? 'ml-60' : 'ml-16'}`}>
        <h2 className="text-2xl font-bold mb-4 text-purple-800">HR Dashboard</h2>

        <div className="bg-white p-4 rounded shadow mb-6">
          <p className="text-gray-700">📢 Announcement: Please make sure to update all employee records this week.</p>
        </div>

        <button
          onClick={handleAddEmployee}
          className="w-fit px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Add Employee
        </button>

        <button
          onClick={handleLeave}
          className="w-fit px-4 py-2 bg-purple-600 text-white rounded mt-6 hover:bg-purple-700"
        >
          {showLeaveForm ? "Close Leave Form" : "Leave Apply"}
        </button>

        {/*  LeaveApplyForm */}
        {showLeaveForm && (
          <div className='mt-1'>
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

export default Hr;
