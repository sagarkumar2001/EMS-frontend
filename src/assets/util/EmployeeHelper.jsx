  import axios from "axios";
import { useNavigate } from "react-router-dom";

   export const fetchDepartments=async()=>{
    let departments=[]
       try {
            const response=await axios.get('https://ems-backend-dun.vercel.app/api/department',{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
            }) 
            if(response.data.success){
                departments=response.data.departments;
            }
       } catch (error) {
          if(error.response&&!error.response.data.success){
            alert(error.response.data.success);
          }
       }
       return departments;
    }

    export const getEmployees=async(id)=>{
      let employees=[];
         try {
              const response=await axios.get(`https://ems-backend-dun.vercel.app/api/employee/department/${id}`,{
                  headers:{
                      "Authorization":`Bearer ${localStorage.getItem('token')}`
                  }
              }) 
              if(response.data.success){
                  employees=response.data.employees;
              }
         } catch (error) {
            if(error.response&&!error.response.data.success){
              alert(error.response.data.success);
            }
         }
         return employees;
      }


     


    export const EmployeeButton=({Id,onEmployeeDelete})=>{

      const navigate=useNavigate();

      const handleDelete=async(id)=>{
         const confirm=window.confirm("Do You Want to Delete?");
         if(confirm){
         try {
            const response=await axios.delete(`https://ems-backend-dun.vercel.app/api/employee/${id}`,{
              headers:{
                  "Authorization":`Bearer ${localStorage.getItem("token")}`
              }
            })
            if(response.data.success){
               onEmployeeDelete();
            }
         } catch (error) {
           if(error.response&&!error.response.data.success){
              alert(error.response.data.error);
           }
         }
      }
      };


   
      return(
         <div className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600 text-white rounded "
            onClick={()=>navigate(`/admin-dashboard/employees/${Id}`)}
            >View</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded"
            onClick={()=>navigate(`/admin-dashboard/employees/edit/${Id}`)}
            >Edit</button>
            <button className="px-3 py-1 bg-yellow-600 text-white rounded"
            onClick={()=>navigate(`/admin-dashboard/employees/salary/${Id}`)}
            >Salary</button>
            <button className="px-3 py-1 bg-gray-600 text-white rounded"
             onClick={()=>navigate(`/admin-dashboard/employees/leaves/${Id}`)}
             >Leave</button>

             <button className="px-3 py-1 bg-red-600 text-white rounded"
             onClick={()=>handleDelete(Id)}
             >Delete</button>
   
         </div>
      )
   }


   export const columns=[
    {
     name:"S No",
     selector:(row)=>row.sno,
     width:"70px"
     
    },
    {
      name:"Name",
      selector:(row)=>row.name,
      sortable:true,
      width:"150px"
     },
     {
      name:"Image",
      selector:(row)=>row.profileImage,
      width:"100px"
     },
    {
     name:"Department Name",
     selector:(row)=>row.dep_name,
     width:"150px"
  
    },
    {
      name:"DOB",
      selector:(row)=>row.dob,
      sortable:true,
      width:"170px"
     },
    {
     name:"Action",
     selector:(row)=>row.action,
     center:"true"
    },
 ]
