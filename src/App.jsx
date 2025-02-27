import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './assets/pages/Login';
import AdminDashboard from './assets/pages/AdminDashboard';
import EmployeeDashboard from './assets/pages/EmployeeDashboard';
import PrivateRoutes from './assets/util/PrivateRoutes';
import RoleBased from './assets/util/RoleBased';
import AdminSummary from './assets/component/dashboard/AdminSummary';
import DepartmentList from './assets/component/department/DepartmentList';
import AddDepartment from './assets/component/department/AddDepartment';
import EditDepartment from './assets/component/department/EditDepartment';
import List from './assets/component/employee/List';
import Add from './assets/component/employee/Add';
import Views from './assets/component/employee/View';
import Edit from './assets/component/employee/Edit';
import AddSalary from './assets/component/salary/Add';
import ViewSalary from './assets/component/salary/View';
import Summary from './assets/component/EmployeeDashboard/Summary';
import LeaveList from './assets/component/leave/List';
import AddLeave from './assets/component/leave/Add';
import Setting from './assets/component/EmployeeDashboard/Setting';
import Table from './assets/component/leave/Table';
import Details from './assets/component/leave/Details';
import ForgotEmail from './assets/util/ForgotEmail';
import ResetPassword from './assets/util/ResetPassword';



function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Navigate to="/admin-dashboard"/>}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/reset/verify/:id/:token" element={<ResetPassword />}></Route>
      <Route path='/reset' element={<ForgotEmail />}></Route>
     
      <Route path="/admin-dashboard" element={
        <PrivateRoutes>
          <RoleBased requiredRole={["admin"]}>
            <AdminDashboard />
          </RoleBased>
        </PrivateRoutes>
        }>
        <Route index element={<AdminSummary />}></Route>
        <Route path="/admin-dashboard/departments" element={<DepartmentList />}></Route>
        <Route path="/admin-dashboard/add-department" element={<AddDepartment />}></Route>
        <Route path="/admin-dashboard/department/:id" element={<EditDepartment />}></Route>
        <Route path="/admin-dashboard/employees" element={<List />}></Route>
        <Route path="/admin-dashboard/add-employee" element={<Add />}></Route>
        <Route path="/admin-dashboard/employees/:id" element={<Views />}></Route>
        <Route path="/admin-dashboard/employees/edit/:id" element={<Edit />}></Route>
        <Route path="/admin-dashboard/employees/salary/:id" element={<ViewSalary />}></Route>
        <Route path="/admin-dashboard/salary/add" element={<AddSalary />}></Route>
        <Route path="/admin-dashboard/leaves" element={<Table />}></Route>
        <Route path="/admin-dashboard/leaves/:id" element={<Details />}></Route>
        <Route path="/admin-dashboard/employees/leaves/:id" element={<LeaveList />}></Route>
        <Route path="/admin-dashboard/setting" element={<Setting />}></Route>


        
        </Route>
      <Route path="/employee-dashboard" element={
        <PrivateRoutes>
        <RoleBased requiredRole={["admin","employee"]}>
          <EmployeeDashboard />
        </RoleBased>
      </PrivateRoutes>
       
        }>
          <Route index element={<Summary />}></Route>
          <Route path="/employee-dashboard/profile/:id" element={<Views />}></Route>
          <Route path="/employee-dashboard/leaves/:id" element={<LeaveList />}></Route>
          <Route path="/employee-dashboard/add-leave" element={<AddLeave />}></Route>
          <Route path="/employee-dashboard/salary/:id" element={<ViewSalary />}></Route>
          <Route path="/employee-dashboard/setting" element={<Setting />}></Route>
          
        </Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App
