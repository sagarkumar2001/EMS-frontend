import axios from "axios";
import { useState } from "react";


const ForgotEmail=()=>{
    const [email,setEmail]=useState('');
    const handleSubmit = async(e)=>{
        e.preventDefault();
       
        try {
            const response= await axios.post("http://localhost:3000/api/reset",{email});
            if(response.data.success){
               alert("Reset link sent successfully")
            }
            else{
              console.log("error")
            }
        } catch (error) {
           alert(error.response.data.error);
        }

    }


    return (
        <div className='flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6'>
            <form onSubmit={handleSubmit} >
          <div className='mb-4'>
            <label htmlFor='email' className="text-white text-xl"> Email Address</label>
            <input required className='w-full px-3 py-2 border rounded-md' type='email' placeholder='Enter Email' 
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className='mb-3'>
            <button type='submit' className='w-full bg-teal-600 text-white py-2 rounded-md'>Send Email</button>
          </div>

          </form>
         </div>
    )
}

export default ForgotEmail;
