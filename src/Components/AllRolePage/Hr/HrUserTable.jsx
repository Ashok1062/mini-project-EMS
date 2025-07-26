import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Manager from '../Hr'

function UserTable({ onEdit, search }) {
  const [users, setUsers] = useState([]);

  //  Fetch users whenever `refresh` changes
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3002/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  //  Filter based on search term
  const filtered = users.filter(u =>
  (u.roll === 'Admin' || u.role === 'Employee') && (
    u.userId?.toLowerCase().includes(search.toLowerCase()) ||
    u.firstName?.toLowerCase().includes(search.toLowerCase()) ||
    u.lastName?.toLowerCase().includes(search.toLowerCase()) ||
    u.department?.toLowerCase().includes(search.toLowerCase())
  )
);


  // ✅ Delete user
  const deleteUser =(id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
     
         axios.delete(`http://localhost:3002/users/${id}`).then(()=> {
            setUsers(users.filter((user)=> user.id == id))
         })
         // trigger refresh in parent
       
    }
  };

  return (
    <table className="w-full bg-white shadow rounded">
      <thead>
        <tr className="bg-gray-200 text-center ">
          <th className="px-4 py-2 hover:border">User ID</th>
          <th className="px-4 py-2 hover:border">Name</th>
          <th className="px-4 py-2 hover:border">Role</th>
          <th className="px-4 py-2 hover:border">Email</th>
          <th className="px-4 py-2 hover:border">Phone</th>
          <th className="px-4 py-2 hover:border">DOB</th>
          <th className="px-4 py-2 hover:border">Joining</th>
          <th className="px-4 py-2 hover:border">Dept</th>
          <th className="px-4 py-2 hover:border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filtered.length > 0 ? (
          filtered.map((u) => (
            <tr key={u.id} className="border-t hover:bg-gray-50 text-center bg-purple-300">
              <td className="px-4 py-2">{u.userId}</td>
              <td className="px-4 py-2">{u.firstName} {u.lastName}</td>
              <td className="px-4 py-2">{u.role}</td>
              <td className="px-4 py-2">{u.email}</td>
              <td className="px-4 py-2">{u.phone}</td>
              <td className="px-4 py-2">{u.dob}</td>
              <td className="px-4 py-2">{u.joiningDate}</td>
              <td className="px-4 py-2">{u.department}</td>
              <td className="px-4 py-2">
                <button className="text-blue-600 mr-3 hover:bg-blue-700 px-2.5 hover:text-white hover:rounded-2xl" onClick={() => onEdit(u)}>Edit</button>
                <button className="text-red-600 hover:text-white hover:bg-red-600 px-2.5 hover:rounded-2xl" onClick={() => deleteUser(u.id)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="text-center py-4 text-gray-500">No users found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default UserTable;
