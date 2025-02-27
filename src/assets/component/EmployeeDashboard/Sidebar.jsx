
import {NavLink} from 'react-router-dom';
import {FaBuilding, FaCalendarAlt,  FaSteam, FaTachometerAlt, FaUser} from 'react-icons/fa';
import {useAuth} from '../../../context/authContext';
const SideBar=()=>{
    const {user}=useAuth();
     return (
        <div className='bg-gray-800 text-white h-sreen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
            <div className='bg-teal-600 h-12 flex item-center justify-center'>
                <h3 className='text-2xl text-center font-pacific p-2'>Employee Ms</h3>
            </div>
            <div>
                <NavLink to="/employee-dashboard" className={({isActive})=>`${isActive ? "bg-teal-500":" "} flex item-center space-x-4 block py-2.5 px-4 rounded`} end >
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to={`/employee-dashboard/profile/${user._id}`} className={({isActive})=>`${isActive ? "bg-teal-500":" "} flex item-center space-x-4 block py-2.5 px-4 rounded`} end>
                    <FaUser />
                    <span>My Profile</span>
                </NavLink>
                <NavLink to={`/employee-dashboard/leaves/${user._id}`} className={({isActive})=>`${isActive ? "bg-teal-500":" "} flex item-center space-x-4 block py-2.5 px-4 rounded`} end>
                    <FaBuilding />
                    <span>Leaves</span>
                </NavLink>  
                <NavLink to={`/employee-dashboard/salary/${user._id}`} className={({isActive})=>`${isActive ? "bg-teal-500":" "} flex item-center space-x-4 block py-2.5 px-4 rounded`} end>
                    <FaCalendarAlt />
                    <span>Salary</span>
                </NavLink>
                
                <NavLink to="/employee-dashboard/setting" className={({isActive})=>`${isActive ? "bg-teal-500":" "} flex item-center space-x-4 block py-2.5 px-4 rounded`} end>
                    <FaSteam />
                    <span>Setting</span>
                </NavLink>
            </div>
        </div>
     )
}
export default SideBar;