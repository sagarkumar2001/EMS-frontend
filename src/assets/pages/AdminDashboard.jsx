import React from 'react'
import { useAuth } from '../../context/authContext'
import AdminSideBar from '../component/dashboard/AdminSideBar';
import Navbar from '../component/dashboard/Navbar';
import AdminSummary from '../component/dashboard/AdminSummary';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const {user}=useAuth();
 
  return (
    <div className='flex'>
      <AdminSideBar />
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard
