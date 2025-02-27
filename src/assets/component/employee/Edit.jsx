import React,{ useEffect, useState } from "react"
import { fetchDepartments } from "../../util/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit=()=>{
    const navigate=useNavigate();
    const [employee,setEmployee]=useState({
        name:'',
        designation:'',
        salary:0,
        maritalStatus:'',
        department:''
    });
    const [departments,setDepartments]=useState(null);
    const {id}=useParams();


    useEffect(()=>{
            const getDepartments = async()=>{
                const department=await fetchDepartments();
                setDepartments(department)
            };
            
            getDepartments();
        },[]);



    useEffect(()=>{
        const fetchEmployees=async()=>{
            try {
                 const response=await axios.get(`https://ems-backend-dun.vercel.app/api/employee/${id}`,{
                     headers:{
                         "Authorization":`Bearer ${localStorage.getItem('token')}`
                     }
                 })
                 if(response.data.success){
                     const employee=response.data.employees;
                     setEmployee((prev)=>({...prev,
                        name:employee.userId.name,
                        designation:employee.designation,
                        salary:employee.salary,
                        department:employee.department,
                        maritalStatus:employee.maritalStatus

                     }));
                 }
            } catch (error) {
               if(error.response&&!error.response.data.success){
                 alert(error.response.data.success);
               }
            }
           
         }
         fetchEmployees();
    },[]);

    const handleChange=(e)=>{
        const {name,value}=e.target;
          setEmployee((prevData)=>({...prevData,[name]:value}));
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
    
        try {
            const response=await axios.put(`https://ems-backend-dun.vercel.app/api/employee/${id}`,employee,{
              headers:{
                  "Authorization":`Bearer ${localStorage.getItem("token")}`
              }
            })
            if(response.data.success){
               navigate("/admin-dashboard/employees");
            }
         } catch (error) {
           if(error.response&&!error.response.data.success){
              alert(error.response.data.error);
           }
         }
    }
    return(
        <>{departments&&employee?
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
            <form onSubmit={handleSubmit}>
                {/* name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          name="name"
                          onChange={handleChange}
                          value={employee.name}
                          placeholder="Full Name"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                          required
                           />
                    </div>
                   

                    {/* marital Status */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Marital Status</label>
                        <select
                           name="maritalStatus"
                           placeholder="Marital Status"
                           onChange={handleChange}
                           value={employee.maritalStatus}
                           className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                           required
                        >

                        <option value="">Select Status</option>
                        <option value="single">Single</option>
                        <option value="married" >Married</option>
                        </select>
                    </div>

                    {/* Designation */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Designation</label>
                        <input
                          type="text"
                          name="designation"
                          onChange={handleChange}
                          value={employee.designation}
                          placeholder="Designation"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                          required
                           />
                    </div>

                    
                     
                     {/* Salary */}
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Salary</label>
                        <input
                          type="number"
                          name="salary"
                          onChange={handleChange}
                          value={employee.salary}
                          placeholder="Salary"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                          required
                           />
                    </div>

                    {/* Department */}

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <select
                           name="department"
                           onChange={handleChange}
                           value={employee.department}
                           className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                           required
                        >
                        <option value="">Select Department</option>
                        {departments.map((dep)=>{
                             return <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                        })}
                        </select>
                    </div>

                </div>
                <button
                  type="submit"
                  className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
                >Edit Employee</button>
            </form>
        </div>
        :<div>Loading.....</div>}</>
    )
}

export default Edit