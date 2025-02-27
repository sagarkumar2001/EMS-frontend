import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../util/LeaveHelper";
import axios from 'axios';

const Table = () => {
    const [leaves, setLeaves] = useState([])
    const [filteredLaves,setFilteredLeaves]=useState([]);
    const fetchLeaves = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/leave', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.data.success) {
                let sno = 1;
                const data = await response.data.leaves.map((leave) => ({
                    _id: leave._id,
                    sno: sno++,
                    employeeId: leave.employeeId.employeeId,
                    name: leave.employeeId.userId.name,
                    leaveType: leave.leaveType,
                    department: leave.employeeId.department.dep_name,
                    days: new Date(leave.endDate).getDate() - new Date(leave.startDate).getDate(),
                    status: leave.status,
                    action: (<LeaveButtons Id={leave._id} />)
                }
                ))
                setLeaves(data);
                setFilteredLeaves(data);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.success);
            }
        }
    }

    useEffect(() => {
        fetchLeaves();
    }, []);


    const filterByInput=(e)=>{
        const data=leaves.filter(leave=>leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredLeaves(data)
    }


    const filterByButton=(status)=>{
        const data=leaves.filter(leave=>leave.status.toLowerCase().includes(status.toLowerCase()));
        setFilteredLeaves(data)
    }

    return (
        <>{filteredLaves ? (
            <div className="p-6 mt-6">
                <div className="text-center">
                    <h3 className="text-2xl font-bold">Manage Leaves</h3>
                </div>
                <div className="flex justify-between items-center">
                    <input
                        type="text"
                        placeholder="Search by Emp Id"
                        className="px-4 py-0.5 border"
                        onChange={filterByInput}
                    />
                    <div className="space-x-3">
                        <button className="px-2 py-1 bg-yellow-600 text-white hover:bg-yellow-700 rounded-md" onClick={()=>filterByButton("Pending")}>Pending</button>
                        <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded-md" onClick={()=>filterByButton("Approved")}>Approved</button>
                        <button className="px-2 py-1 bg-red-600 text-white hover:bg-red-700 rounded-md" onClick={()=>filterByButton("Rejected")}>Rejected</button>

                    </div>
                </div>
                <div className="mt-4">

                    <DataTable columns={columns} data={filteredLaves} pagination />
                </div>
            </div>
        ) : (<div>Loading...</div>)}
        </>
    )
}

export default Table;