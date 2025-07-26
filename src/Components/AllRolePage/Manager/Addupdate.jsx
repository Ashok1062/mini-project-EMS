import React, { useState } from 'react';
import UserForm from './UserFrom';
import UserTable from './UserTable';
import { FcSearch } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';

function Addupdate() {
  const [editUser, setEditUser] = useState(null);
 
  const [search, setSearch] = useState('');
  const navigate = useNavigate(); 

  const handleEdit = (user) => setEditUser(user);

  const handleRefresh = () => {
    setEditUser(null);

  };

  const handleBackClick = () => {
    navigate('/manager');
  };

  return (
    <div className='flex flex-col items-center min-h-screen p-4 bg-purple-100 relative'>
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className='self-start mb-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700'
      >
         Back
      </button>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4 text-purple-800">Add & Update</h1>

      {/* Search Box with Icon */}
      <div className="relative w-full max-w-xl mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-200 placeholder-gray-600"
        />
        <FcSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl" />
      </div>

      {/* Form and Table */}
      <UserForm onSave={handleRefresh} editUser={editUser} isHRPage={false} />
      <UserTable onEdit={handleEdit} onDelete={handleRefresh} search={search}  />
    </div>
  );
}

export default Addupdate;
