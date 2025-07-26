import React, { useEffect, useState } from 'react';
import axios from 'axios';

const departments = ['IT', 'Developer', 'Frontend', 'Telecalling', 'Testing'];
const role = ['Hr'];

function UserForm({ editUser, onSave, isHRPage }) {
  const [form, setForm] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    role: '',
    dob: '',
    joiningDate: '',
    department: '',
    gender: '',
  });

  useEffect(() => {
    if (editUser) setForm(editUser);
  }, [editUser]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editUser) {
      await axios.put(`http://localhost:3002/users/${editUser.id}`, form);
    } else {
      await axios.post('http://localhost:3002/users', form);
    }
    setForm({
      userId: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      role: '',
      dob: '',
      joiningDate: '',
      department: '',
      gender: '',
    });
    onSave();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-purple-800 text-white p-4 rounded-md shadow mb-6 w-full max-w-4xl mx-auto"
    >
      <div className="p-4 sm:p-6 md:p-8 border grid grid-cols-1 md:grid-cols-2 gap-4 bg-purple-600 rounded-lg">
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          className="border p-2 rounded-xl shadow-2xl bg-purple-400 text-black"
          value={form.userId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="border p-2 rounded-xl shadow-2xl bg-purple-400 text-black"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="border p-2 rounded-xl shadow-2xl bg-purple-400 text-black"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="border p-2 rounded-xl shadow-2xl bg-purple-400 text-black"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="border p-2 rounded-xl shadow-2xl bg-purple-400 text-black"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 rounded-xl shadow-2xl bg-purple-400 text-black"
          value={form.password}
          onChange={handleChange}
          required
        />

        {/* Date of Birth */}
        <div className="border p-2 rounded-xl shadow-2xl bg-purple-400 text-black flex justify-between items-center">
          <label className="mr-2">DOB:</label>
          <input
            type="date"
            name="dob"
            className="px-2 hover:cursor-pointer"
            value={form.dob}
            onChange={handleChange}
            required
          />
        </div>

        {/* Joining Date */}
        <div className="border p-2 rounded-xl shadow-2xl bg-purple-400 text-black flex justify-between items-center">
          <label className="mr-2">Joining Date:</label>
          <input
            type="date"
            name="joiningDate"
            className="px-2 hover:cursor-pointer"
            value={form.joiningDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Gender Radio Buttons */}
        <div className="border p-2 rounded-xl shadow-2xl bg-purple-400 text-black flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4">
          <label>Gender:</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={form.gender === 'Male'}
                onChange={handleChange}
                required
              />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={form.gender === 'Female'}
                onChange={handleChange}
              />
              Female
            </label>
          </div>
        </div>

        {/* Department Dropdown */}
        {isHRPage && (
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            className="border p-2 rounded-xl shadow-2xl bg-purple-400 text-black"
            required
          >
            <option value="">Select Department</option>
            {departments.map((dep) => (
              <option key={dep}>{dep}</option>
            ))}
          </select>
        )}

        {/* Role Dropdown */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border p-2 rounded-xl shadow-2xl bg-purple-400 text-black"
          required
        >
          <option value="">Select Role</option>
          {role.map((rol) => (
            <option key={rol}>{rol}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="mt-6 bg-purple-500 w-full hover:bg-purple-950 hover:cursor-pointer text-white px-4 py-3 rounded"
      >
        {editUser ? 'Update' : 'Add'} User
      </button>
    </form>
  );
}

export default UserForm;
