import { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import {useAuth}  from '../../../context/authContext'

import axios from "axios";


const View = () => {
    const [salary, setSalary] = useState(null);
    const [filterSalary, setFilterSalary] = useState(null);
    const { id } = useParams();


    let sno = 1;
    const {user}=useAuth();

    const fetchSalary = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/salary/${id}/${user.role}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
               
                setSalary(response.data.salary);
                setFilterSalary(response.data.salary);

            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.success);
            }
        }
    }

    useEffect(()=>{
        fetchSalary();
    },[]);
    
    const filterSalaries=(q)=>{
        const record=salary.filter((leave)=>
            leave.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase())
        );
       setFilterSalary(record);
    };


    return (
        <>{filterSalary==null?<div>Loading....</div>:
            <div className="overflow-x-auto p-5">
                <div className="text-center">
                    <h2 className="tetx-2xl font-bold">Salary History</h2>
                </div>
                <div className="flex justify-end my-3">
                   <input type="text" placeholder="Search By EmpId"
                     className="border px-2 rounded-md py-0.5 border-gray-300"
                     onChange={filterSalaries}
                   />
                </div>

                {filterSalary.length>0?(
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                        <tr>
                            <th className="px-6 py-3">SNO</th>
                            <th className="px-6 py-3">Emp ID</th>
                            <th className="px-6 py-3">Salary</th>
                            <th className="px-6 py-3">Allowance</th>
                            <th className="px-6 py-3">Deduction</th>
                            <th className="px-6 py-3">Total</th>
                            <th className="px-6 py-3">Pay Date</th>
                        </tr>

                    </thead>

                    <tbody>
                        {filterSalary.map((salary)=>{
                          return <tr key={salary.id} className="bg-white border-b dar:bg-gray-800 dark:border-gray-700">
                              <td className="py-3 px-6">{sno++}</td>
                              <td className="py-3 px-6">{salary.employeeId.employeeId}</td>
                              <td className="py-3 px-6">{salary.basicSalary}</td>
                              <td className="py-3 px-6">{salary.allowances}</td>
                              <td className="py-3 px-6">{salary.deductions}</td>
                              <td className="py-3 px-6">{salary.netSalary}</td>
                              <td className="py-3 px-6">{new Date(salary.payDate).toLocaleDateString()}</td>
                            </tr>
                        })}
                    </tbody>
                  </table>
   
                ):<div>No Records</div>}

            </div>
}
        </>
    )
}

export default View;