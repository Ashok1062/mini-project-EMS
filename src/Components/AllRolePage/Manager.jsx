import React, { useEffect, useState } from 'react';
import logo from '../logo.jpg';
import { MdMenuOpen } from "react-icons/md";
import { FaRegUserCircle, FaUserAlt, FaIdCard } from "react-icons/fa";
import { GrBladesVertical } from "react-icons/gr";
import { IoPersonAdd } from "react-icons/io5";
import { FcLeave } from "react-icons/fc";
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';
import Logout from '../Logout';
import NotificationBadge from './Manager/NotificationBadge';

const menuItems = [
  { icons: <FaRegUserCircle size={20} />, label: 'Post Event', path: '/manager/post-announcement' },
  { icons: <IoPersonAdd size={20} />, label: 'Add & Update', path: '/addupdate' },
  { icons: <FcLeave size={20} />, label: 'Leave Request', path: '/manager/leave-approval' },
  
];

function Manager() {
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');
  const navigate = useNavigate();
  const baseURL = "http://localhost:3002/users";
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(baseURL);
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const uniqueDepartments = [...new Set(user.map(emp => emp.department).filter(Boolean))];
  const roles = ['Employee', 'Admin', 'Hr'];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <nav className={`shadow-md bg-purple-700 text-white duration-300 flex flex-col fixed z-50 ${open ? 'w-60' : 'w-16'} min-h-screen`}>
        {/* Header with Logo & Toggle */}
        <div className='relative px-3 py-4 flex justify-between items-center border-b border-purple-500'>
          {/* Logo */}
          <img
            src={logo}
            alt="logo"
            className={`rounded-full transition-all duration-300 ${open ? 'w-10' : 'w-0'} ${open ? 'block' : 'hidden'} md:block`}
          />

          {/* Toggle Button */}
          <MdMenuOpen
            size={30}
            className={`cursor-pointer absolute md:relative left-3 top-3 md:top-0 md:left-0 z-50 text-white transition-transform ${!open && 'rotate-180'}`}
            onClick={() => setOpen(!open)}
          />
        </div>

        {/* Menu Items */}
        <ul className='flex-1 px-2 py-4'>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className='mb-3 p-2 hover:bg-purple-600 rounded-md cursor-pointer flex items-center gap-3'
              onClick={() => navigate(item.path)}
            >
              {item.icons}
              <span className={`${!open && 'hidden'} transition-all text-sm`}>
                {item.label === 'Leave Request' ? <NotificationBadge label="Leave" /> : item.label}
              </span>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className='px-4 py-4 border-t border-purple-500 flex gap-3 items-center'>
          <FaRegUserCircle size={40} />
          <div className={`${!open && 'hidden'} transition-all`}>
            <p className='font-semibold'>{loggedInUser?.firstName} {loggedInUser?.lastName}</p>
            <p className='text-sm'>{loggedInUser?.email}</p>
            <p className='uppercase text-xs'>{loggedInUser?.role}</p>
          </div>
        </div>
        <Logout />
      </nav>

      {/* Main Content */}
      <div className={`flex flex-col w-full p-6 min-h-screen bg-gradient-to-r from-purple-300 via-purple-600 to-purple-800 ${open ? 'ml-60' : 'ml-16'}`}>
        <h1 className="text-2xl font-bold text-purple-800 mb-4">
          Welcome, {loggedInUser?.firstName} {loggedInUser?.lastName}
        </h1>

        {/* Counts */}
        <div className="text-purple-700 text-lg space-y-2 mb-6">
          <p>👥 Total Users: {user.length}</p>
          <p>🏢 Unique Departments: {uniqueDepartments.length}</p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map(role => {
            const filtered = user.filter(u => {
              const roleMatch = (u.role?.toLowerCase?.() || u.roll?.toLowerCase?.()) === role.toLowerCase();
              const deptMatch = role === 'Employee' ? (selectedDept ? u.department === selectedDept : true) : true;
              return roleMatch && deptMatch;
            });

            return (
              <div key={role} className="bg-gradient-to-r from-blue-300 via-cyan-600 to-cyan-800 text-white rounded-lg text-lg font-medium hover:opacity-90 transition p-4 shadow border">
                <h2 className="text-xl font-bold text-purple-700 mb-2">{role}s: {filtered.length}</h2>

                {/* Department Filter for Employees */}
                {role === 'Employee' && (
                  <div className="mb-2">
                    <label className="text-sm text-gray-600">Filter by Department: </label>
                    <select
                      value={selectedDept}
                      onChange={e => setSelectedDept(e.target.value)}
                      className="ml-2 border rounded px-2 py-1 text-sm bg-cyan-800"
                    >
                      <option value="">All</option>
                      {uniqueDepartments.map(dep => (
                        <option key={dep} value={dep} className='bg-cyan-600'>{dep}</option>
                      ))}
                    </select>
                  </div>
                )}

                {filtered.map(person => (
                  <div key={person.id} className="text-sm text-gray-700 border-t py-2">
                    <p className='flex gap-1 items-center'><strong><FaUserAlt /></strong> {person.firstName || person.name} {person.lastName || ''}</p>
                    <p className='flex gap-1 items-center'><strong><FaIdCard /></strong> {person.userId || person.userid}</p>
                    <p className='flex gap-1 items-center'><strong><GrBladesVertical /></strong> {person.department || 'N/A'}</p>
                    <p className={`font-semibold ${person.isLoggedIn ? 'text-green-600' : 'text-red-600'}`}>
                      {person.isLoggedIn ? '🟢 Logged In' : '🔴 Logged Out'}
                    </p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Nested Components */}
        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Manager;
