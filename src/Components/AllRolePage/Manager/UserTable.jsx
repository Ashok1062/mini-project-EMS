import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserTable({ onEdit, search }) {
  const [users, setUsers] = useState([]);

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

  // Filter based on search term
  const filtered = users
    .filter((u) => u.role?.toLowerCase() === 'hr')
    .filter(
      (u) =>
        u.userId?.toLowerCase().includes(search.toLowerCase()) ||
        u.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        u.lastName?.toLowerCase().includes(search.toLowerCase()) ||
        u.department?.toLowerCase().includes(search.toLowerCase())
    );

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`http://localhost:3002/users/${id}`).then(() => {
        setUsers(users.filter((user) => user.id !== id));
      });
    }
  };

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto mt-4 rounded-lg shadow-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">DOB</th>
              <th className="px-4 py-2">Joining</th>
              <th className="px-4 py-2">Dept</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((u) => (
                <tr key={u.id} className="border-t text-center bg-purple-300">
                  <td className="px-4 py-2">{u.userId}</td>
                  <td className="px-4 py-2">{u.firstName} {u.lastName}</td>
                  <td className="px-4 py-2">{u.role}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">{u.phone}</td>
                  <td className="px-4 py-2">{u.dob}</td>
                  <td className="px-4 py-2">{u.joiningDate}</td>
                  <td className="px-4 py-2">{u.department}</td>
                  <td className="px-4 py-2">
                    <button
                      className="text-blue-600 mr-2 hover:bg-blue-700 hover:text-white px-2 py-1 rounded"
                      onClick={() => onEdit(u)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:bg-red-600 hover:text-white px-2 py-1 rounded"
                      onClick={() => deleteUser(u.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-4 mt-4">
        {filtered.length > 0 ? (
          filtered.map((u) => (
            <div key={u.id} className="bg-purple-200 p-4 rounded-lg shadow-lg text-sm">
              <p><strong>User ID:</strong> {u.userId}</p>
              <p><strong>Name:</strong> {u.firstName} {u.lastName}</p>
              <p><strong>Role:</strong> {u.role}</p>
              <p><strong>Email:</strong> {u.email}</p>
              <p><strong>Phone:</strong> {u.phone}</p>
              <p><strong>DOB:</strong> {u.dob}</p>
              <p><strong>Joining:</strong> {u.joiningDate}</p>
              <div className="mt-2 flex justify-end gap-3">
                <button
                  className="text-blue-600 hover:bg-blue-700 hover:text-white px-3 py-1 rounded"
                  onClick={() => onEdit(u)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:bg-red-600 hover:text-white px-3 py-1 rounded"
                  onClick={() => deleteUser(u.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
}

export default UserTable;
