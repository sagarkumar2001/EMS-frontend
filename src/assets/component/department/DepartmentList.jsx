import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButton } from "../../util/DepartmentHelper";
import axios from 'axios';

const DepartmentList =()=>{
    const [departments,setdepartments]=useState([]);
    const [deptLoading,setdeptLoading]=useState(false);
    const [filterdepartments,setFilterdepartsment]=useState([]);
     
    const fetchDepartments=async()=>{
        setdeptLoading(true);
       try {
            const response=await axios.get('http://localhost:3000/api/department',{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
            }) 
            if(response.data.success){
                
                let sno=1;
                const data =await response.data.departments.map((dep)=>({
                     _id:dep._id,
                     sno : sno++,
                     dep_name:dep.dep_name,
                     action:(<DepartmentButton _id={dep._id} onDepartmentDelete={onDepartmentDelete} />)
                }
              ))
              setdepartments(data);
              setFilterdepartsment(data);
            }
       } catch (error) {
          if(error.response&&!error.response.data.success){
            alert(error.response.data.success);
          }
       }
       finally{
         setdeptLoading(false);
       }
    }
   
    useEffect(()=>{
    
    fetchDepartments();
    },[]);

    const onDepartmentDelete=()=>{
        fetchDepartments();
    }

    const handlefilter=(e)=>{
        const filterdata=departments.filter((dep)=>dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilterdepartsment(filterdata);
    }
    return (
        <>{deptLoading?<div>Loading.....</div>:
        <div className="p-5">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Departments</h3>
            </div>
            <div className="flex justify-between items-center">
                <input type="text" placeholder="Search By Dept Name" className="px-4 py-0.5 border" onChange={handlefilter}></input>
                <Link to="/admin-dashboard/add-department " className="px-4 py-1 bg-teal-600 rounded text-white"> Add New Department</Link>
            </div>
            <div className="mt-5">
               <DataTable columns={columns} data={filterdepartments} pagination />
            </div>
        </div>
        }</>
    )
}
export default DepartmentList;