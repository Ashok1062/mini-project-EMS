import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ViewAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/announcements')
      .then(res => setAnnouncements(res.data.reverse()));
  }, []);

   const navigate = useNavigate(); 

  const handleBackClick = () => {
    navigate('/employee');
  };

  return (
    <div className="p-4 bg-purple-400 h-dvh">
        <button
        onClick={handleBackClick}
        className='self-start mb-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700'  >
         Back
      </button>
      <h2 className="text-xl font-bold mb-4">All Announcements</h2>
      {announcements.length === 0 ? (
        <p>No announcements posted yet.</p>
      ) : (
        announcements.map((a) => (
          <div key={a.id} className="bg-yellow-100 border-l-4 border-yellow-600 p-4 mb-3 rounded shadow">
            <h3 className="text-lg font-semibold">{a.title}</h3>
            <p>{a.description}</p>
            <p><strong>Date:</strong> {a.date}</p>
            <p><strong>Time:</strong> {a.time}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ViewAnnouncements;
