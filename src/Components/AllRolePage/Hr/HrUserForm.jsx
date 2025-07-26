import React, { useEffect, useState } from 'react';
import axios from 'axios';

const departments = ['IT', 'Developer', 'Frontend', 'Telecalling', 'Testing'];
const roles = ['Employee', 'Admin']; // Allow HR to choose both

function HrUserForm({ editUser, onSave, isHRPage }) {
  const [form, setForm] = useState({
    userId: '', firstName: '', lastName: '', email: '', phone: '', password: '',
    role: '', dob: '', joiningDate: '', department: '', gender: ''
  });

  useEffect(() => {
    if (editUser) setForm(editUser);
  }, [editUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editUser) {
        await axios.put(`http://localhost:3002/users/${editUser.id}`, form);
      } else {
        await axios.post("http://localhost:3002/users", form);
      }
      setForm({
        userId: '', firstName: '', lastName: '', email: '', phone: '',
        password: '', role: '', dob: '', joiningDate: '', department: '', gender: ''
      });
      onSave();
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-purple-800 text-white p-4 rounded-md shadow mb-6 w-full max-w-4xl">
      <div className="grid border p-8 grid-cols-2 gap-4 bg-purple-600 rounded-lg">
        <input type="text" name="userId" placeholder="User ID" className='border p-2 rounded-xl shadow-2xl bg-purple-400 text-black' value={form.userId} onChange={handleChange} required />
        <input type="text" name="firstName" placeholder="First Name" className='border p-2 rounded-xl shadow-2xl bg-purple-400 text-black' value={form.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" className='border p-2 rounded-xl shadow-2xl bg-purple-400 text-black' value={form.lastName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className='border p-2 rounded-xl shadow-2xl bg-purple-400 text-black' value={form.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" className='border p-2 rounded-xl shadow-2xl bg-purple-400 text-black' value={form.phone} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className='border p-2 rounded-xl shadow-2xl bg-purple-400 text-black' value={form.password} onChange={handleChange} required />
        
        <div className='border p-2 rounded-xl shadow-2xl bg-purple-400 text-black flex justify-between'>
          <label>DOB</label>
          <input type="date" name="dob" className='px-9 hover:cursor-pointer' value={form.dob} onChange={handleChange} required />
        </div>
        <div className='border p-2 rounded-xl shadow-2xl bg-purple-400 text-black flex justify-between'>
          <label>Joining Date</label>
          <input type="date" name="joiningDate" className='px-9 hover:cursor-pointer' value={form.joiningDate} onChange={handleChange} required />
        </div>

        
        {/* Department Dropdown */}
        {isHRPage && (
          <select name="department" value={form.department} onChange={handleChange} className='border p-2 rounded-xl shadow-2xl bg-purple-400 text-black' required>
            <option value="">Select Department</option>
            {departments.map(dep => <option key={dep}>{dep}</option>)}
          </select>
        )}

        {/* Role Dropdown */}
        <select name="role" value={form.role} onChange={handleChange} className='border p-2 rounded-xl shadow-2xl bg-purple-400 text-black' required>
          <option value="">Select Role</option>
          {roles.map(role => <option key={role}>{role}</option>)}
        </select>

        {/*  Gender Radio Buttons */}
        <div className='flex gap-8 items-center px-4'>
          <label className="text-white font-semibold border p-2 rounded-xl shadow-2xl bg-purple-400">Gender:</label>
          <label className="flex items-center gap-2 text-black border p-2 rounded-xl shadow-2xl bg-purple-400">
            <input type="radio" name="gender" value="Male" checked={form.gender === "Male"} onChange={handleChange} />
            Male
          </label>
          <label className="flex items-center gap-2 border p-2 rounded-xl shadow-2xl bg-purple-400 text-black">
            <input type="radio" name="gender" value="Female" checked={form.gender === "Female"} onChange={handleChange} />
            Female
          </label>
        </div>

      </div>


      <button className="mt-4 bg-purple-500 border w-full hover:bg-purple-950 hover:cursor-pointer text-white px-4 py-2 rounded">
        {editUser ? "Update" : "Add"} User
      </button>
    </form>
  );
}

export default HrUserForm;
