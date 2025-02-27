import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { columns, EmployeeButton } from "../../util/EmployeeHelper";
import DataTable from "react-data-table-component";
import axios from "axios";


const List = () => {
        const [employees,setemployees]=useState([]);
        const [empLoading,setempLoading]=useState(false);
        const [filteremployees,setFilteremployees]=useState([]);
        const fetchEmployees=async()=>{
            setempLoading(true);
           try {
                const response=await axios.get('https://ems-backend-dun.vercel.app/api/employee',{
                    headers:{
                        "Authorization":`Bearer ${localStorage.getItem('token')}`
                    }
                }) 

                if(response.data.success){
                    
                    let sno=1;
                    const data =await response.data.employees.map((emp)=>({
                         _id:emp._id,
                         sno : sno++,
                         dep_name:emp.department.dep_name,
                         name:emp.userId.name,
                         dob:new Date(emp.dob).toLocaleDateString(),
                         profileImage:<img width={40} className="rounded-full" src={`https://ems-backend-dun.vercel.app/${emp.userId.profileImage}`}></img>,
                         action:(<EmployeeButton Id={emp._id} onEmployeeDelete={onEmployeeDelete} />)
                    }
                  ))
                  setemployees(data);
                  setFilteremployees(data);
                }
           } catch (error) {
              if(error.response&&!error.response.data.success){
                alert(error.response.data.success);
              }
           }
           finally{
            setempLoading(false);
           }
        }
        useEffect(()=>{
            fetchEmployees();
         },[]);

         const onEmployeeDelete=()=>{
            fetchEmployees();
        }


            const handlechange=(e)=>{
                const record=employees.filter((emp)=>(emp.name.toLowerCase().includes(e.target.value.toLowerCase())));
                setFilteremployees(record);
            }
    return (
        <>{empLoading?<div>Loading....</div>:<div className="p-6">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Employees</h3>
            </div>
            <div className="flex justify-between items-center">
                <input type="text" placeholder="Search By Employee Name" className="px-4 py-0.5 border" onChange={handlechange}></input>
                <Link to="/admin-dashboard/add-employee " className="px-4 py-1 bg-teal-600 rounded text-white"> Add New Employee</Link>
            </div>
            <div className="mt-6">
                <DataTable columns={columns} data={filteremployees} pagination />
            </div>
        </div>
        }</>
    )
}

export default List;