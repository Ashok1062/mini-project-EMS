import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginSignUp from './Components/loginSignUp';
import Employee from './Components/AllRolePage/employee';
import Admin from './Components/AllRolePage/Admin';
import Hr from './Components/AllRolePage/Hr';
import Manager from './Components/AllRolePage/Manager';
import Addupdate from './Components/AllRolePage/Manager/Addupdate';
import ViewAnnouncements from './Components/AllRolePage/Manager/ViewAnnouncements';
import AnnouncementForm from './Components/AllRolePage/Manager/AnnouncementForm';
import LeaveApproval from './Components/AllRolePage/Manager/LeaveApproval';

import AddEmployee from './Components/AllRolePage/Hr/AddEmployee';
import LeaveApplyForm from './Components/AllRolePage/Employee/LeaveApplyForm';

import PrivateRouter from './Components/PrivateRouter';



function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<LoginSignUp />} />
      <Route path="/LoginSignUp" element={<LoginSignUp />} />

      {/* Employee Route */}
      <Route path="/employee" element={
        <PrivateRouter>
          <Employee />
        </PrivateRouter>
      } />

      {/* Admin Route */}
      <Route path="/admin" element={
        <PrivateRouter>
          <Admin />
        </PrivateRouter>
      } />

      {/* HR Route */}
      <Route path="/hr" element={
        <PrivateRouter>
          <Hr />
        </PrivateRouter>
      } />

      <Route path="/hr/add-employee" element={
        <PrivateRouter>
          <AddEmployee />
        </PrivateRouter>
      } />

      <Route path="/hr/leave" element={
        <PrivateRouter>
          <LeaveApplyForm role="hr" />
        </PrivateRouter>
      } />

      {/* Manager Route */}
      <Route path="/manager" element={
        <PrivateRouter>
          <Manager />
        </PrivateRouter>
      } />

      <Route path="/manager/leave-approval" element={
        <PrivateRouter>
          <LeaveApproval />
        </PrivateRouter>
      } />

      <Route path="/manager/post-announcement" element={
        <PrivateRouter>
          <AnnouncementForm />
        </PrivateRouter>
      } />

      <Route path="/announcements" element={
        <PrivateRouter>
          <ViewAnnouncements />
        </PrivateRouter>
      } />

      <Route path="/addupdate" element={
        <PrivateRouter>
          <Addupdate />
        </PrivateRouter>
      } />

      {/* Leave Apply Form Routes for All Roles */}
      <Route path="/employee/leave" element={
        <PrivateRouter>
          <LeaveApplyForm role="employee" />
        </PrivateRouter>
      } />

      <Route path="/admin/leave" element={
        <PrivateRouter>
          <LeaveApplyForm role="admin" />
        </PrivateRouter>
      } />

      


    </Routes>
  );
}

export default App;
