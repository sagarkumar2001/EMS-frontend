import React,{ useEffect, useState } from "react"
import { fetchDepartments } from "../../util/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add=()=>{
    const navigate=useNavigate();
    const [departments,setDepartments]=useState([]);
    const [formData,setformData]=useState({});
    useEffect(()=>{
        const getDepartments = async()=>{
            const department=await fetchDepartments();
            setDepartments(department)
        };
        
        getDepartments();
    },[]);

    const handleChange=(e)=>{
        const {name,value,files}=e.target;
        if(name==="image"){
            setformData((prevData)=>({...prevData,[name]:files[0]}));
        }
        else{
            setformData((prevData)=>({...prevData,[name]:value}));
        }
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const fromDataObj=new FormData();
        Object.keys(formData).forEach((key)=>{
            fromDataObj.append(key,formData[key])
        })
        try {
            const response=await axios.post('https://ems-backend-dun.vercel.app/api/employee/add',fromDataObj,{
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
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
            <form onSubmit={handleSubmit}>
                {/* name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          name="name"
                          onChange={handleChange}
                          placeholder="Full Name"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                          required
                           />
                    </div>
                    {/* email */}
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          placeholder="Email Address"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                          required
                           />
                    </div>

                    {/* Employee Id */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Employee Id</label>
                        <input
                          type="text"
                          name="employeeId"
                          onChange={handleChange}
                          placeholder="Employee Id"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                          required
                           />
                    </div>

                    {/* Date of Birth */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">DOB</label>
                        <input
                          type="date"
                          name="dob"
                          onChange={handleChange}
                          placeholder="DOB"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                          required
                           />
                    </div>

                    {/* Gender */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <select
                           name="gender"
                           onChange={handleChange}
                           className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                           required
                        >

                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female" >Female</option>
                        <option value="other">Others</option>

                        </select>
                    </div>

                    {/* marital Status */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Marital Status</label>
                        <select
                           name="maritalStatus"
                           placeholder="Marital Status"
                           onChange={handleChange}
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
                          placeholder="Designation"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                          required
                           />
                    </div>

                    {/* Department */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <select
                           name="department"
                           onChange={handleChange}
                           className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                           required
                        >
                        <option value="">Select Department</option>
                        {departments.map((dep)=>{
                             return <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                        })}
                        </select>
                    </div>
                     
                     {/* Salary */}
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Salary</label>
                        <input
                          type="number"
                          name="salary"
                          onChange={handleChange}
                          placeholder="Salary"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                          required
                           />
                    </div>

                    {/* Password */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                          type="password"
                          name="password"
                          onChange={handleChange}
                          placeholder="*******"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                          required
                           />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                           name="role"
                           onChange={handleChange}
                           className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                           required
                        >
                        <option value="" >Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="employee" >Employee</option>
                        </select>
                    </div>

                    {/* Image */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                        <input
                          type="file"
                          name="image"
                          onChange={handleChange}
                          placeholder="Upload image"
                          accept="image/*"
                          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                          required
                           />
                    </div>
                </div>
                <button
                  type="submit"
                  className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
                >Add Employee</button>
            </form>
        </div>
    )
}

export default Add