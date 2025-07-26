import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AnnouncementForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAnnouncement = {
      ...form,
      createdBy: 'manager',
    };

    await axios.post('http://localhost:3002/announcements', newAnnouncement);
    alert('Announcement posted!');
    setForm({
      title: '',
      description: '',
      date: '',
      time: '',
    });
  };
 const navigate = useNavigate(); 

  const handleBackClick = () => {
    navigate('/manager');
  };

  return (

    <div className='bg-purple-600 h-dvh flex items-center mb-30'>
        <button
        onClick={handleBackClick}
        className='self-start mb-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700'  >
         Back
      </button>
    <div className="bg-purple-300 p-6 rounded shadow-md max-w-md mx-auto ">
      <h2 className="text-2xl font-bold mb-4">Post New Announcement</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Event Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded">
          Post Announcement
        </button>
      </form>
    </div>
    </div>
  );
}

export default AnnouncementForm;
