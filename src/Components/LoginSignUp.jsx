import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const baseURL = "http://localhost:3002/users";

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const res = await axios.get(`${baseURL}?email=${form.email.trim()}&password=${form.password.trim()}`);
      if (res.data.length > 0) {
        const user = res.data[0];

        
        await axios.patch(`${baseURL}/${user.id}`, { isLoggedIn: true });

        localStorage.setItem("loggedInUser", JSON.stringify({ ...user, isLoggedIn: true }));
        setForm({ email: '', password: '' });

        
          
          switch (user.role) {
            case 'Admin':
              navigate('/admin');
              break;
            case 'Employee':
              navigate('/employee');
              break;
            case 'Hr':
              navigate('/hr');
              break;
            case 'Manager':
              navigate('/manager');
              break;
            default:
              setError("Unknown user role.");
          }
        ;
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className='grid w-full h-screen place-items-center bg-cyan-400'>
      <div className='w-[430px] bg-white p-8 rounded-2xl shadow-lg'>
        <h2 className='text-3xl font-semibold text-center mb-6'>Login</h2>

        <form className='space-y-4' onSubmit={handleSubmit} autoComplete="off">
          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className='w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400'
            required
          />

          {/* 👁 Password Field with Eye Icon Toggle */}
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              autoComplete="off"
              value={form.password}
              onChange={handleChange}
              className='w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400'
              required
            />
            <span
              className="absolute right-4 top-3.5 text-xl cursor-pointer text-gray-500"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </div>

          <div className='text-right'>
            <p className='text-cyan-600 hover:underline cursor-pointer'>Forget Password?</p>
          </div>

          {error && <p className='text-red-500 text-sm text-center'>{error}</p>}

          <button type="submit" className='w-full p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 text-white rounded-full text-lg font-medium hover:opacity-90 transition'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
