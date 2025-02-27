import react from 'react';
import {NavLink} from 'react-router-dom';
import {FaBuilding, FaCalendarAlt, FaMoneyBillWave, FaSteam, FaTachometerAlt, FaUser} from 'react-icons/fa';
const AdminSideBar=()=>{
     return (
        <div className='bg-gray-800 text-white h-sreen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
            <div className='bg-teal-600 h-12 flex item-center justify-center'>
                <h3 className='text-2xl text-center font-pacific p-2'>Employee Ms</h3>
            </div>
            <div>
                <NavLink to="/admin-dashboard" className={({isActive})=>`${isActive ? "bg-teal-500":" "} flex item-center space-x-4 block py-2.5 px-4 rounded`} end >
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/admin-dashboard/employees" className={({isActive})=>`${isActive ? "bg-teal-500":" "} flex item-center space-x-4 block py-2.5 px-4 rounded`} end>
                    <FaUser />
                    <span>Employee</span>
                </NavLink>
                <NavLink to="/admin-dashboard/departments" className={({isActive})=>`${isActive ? "bg-teal-500":" "} flex item-center space-x-4 block py-2.5 px-4 rounded`} end>
                    <FaBuilding />
                    <span>Department</span>
                </NavLink>  
                <NavLink to="/admin-dashboard/leaves" className={({isActive})=>`${isActive ? "bg-teal-500":" "} flex item-center space-x-4 block py-2.5 px-4 rounded`} end>
                    <FaCalendarAlt />
                    <span>Leave</span>
                </NavLink>
                <NavLink to="/admin-dashboard/salary/add" className={({isActive})=>`${isActive ? "bg-teal-500":" "} flex item-center space-x-4 block py-2.5 px-4 rounded`} end>
                    <FaMoneyBillWave />
                    <span>Salary</span>
                </NavLink>
                <NavLink to="/admin-dashboard/setting" className={({isActive})=>`${isActive ? "bg-teal-500":" "} flex item-center space-x-4 block py-2.5 px-4 rounded`} end>
                    <FaSteam />
                    <span>Setting</span>
                </NavLink>
            </div>
        </div>
     )
}
export default AdminSideBar;