import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CgLogOut } from "react-icons/cg";
import axios from 'axios';

function Logout() {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = async (e) => {
   e.preventDefault();
    if (loggedInUser && loggedInUser.id) {
      try {
        //  Set isLoggedIn to false in db.json
        await axios.patch(`http://localhost:3002/users/${loggedInUser.id}`, {
          isLoggedIn: false,
        });
      } catch (err) {
        console.error("Failed to update isLoggedIn:", err);
      }
    }

    // Remove from localStorage and redirect
    localStorage.removeItem("loggedInUser");
    navigate("/LoginSignUp");
  };

  return (
    <div
      className='mt-5 p-2 hover:bg-purple-500 cursor-pointer duration-500 w-full border flex justify-center'
      onClick={handleLogout}
    >
      <CgLogOut size={30} />
      <button type='submit' className='ml-2'>Logout</button>
    </div>
  );
}

export default Logout;
