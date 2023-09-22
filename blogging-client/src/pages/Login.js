import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/alertSlice';
import { toast } from 'react-hot-toast';

const Login = () => {
const dispatch=useDispatch()
const navigate=useNavigate()

  const API_URL="http://localhost:3000/api/v1/login"
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const login= async ()=>{
    try{
    dispatch(showLoading())
    const response=await axios.post(API_URL,user)
   
    if(response.data.success){
        localStorage.setItem("token" , response.data.data)
         console.log(response.data.data)
           
          toast.success(`welcome `)
         
         
       
       navigate('/')
    }else{
        toast.error(response.data.msg)
    }
    dispatch(hideLoading())
    }catch(e){
        dispatch(hideLoading())
      console.log(e)
    }
  }
  return (
    <div className='bg-[#2c2929]'>   
    <div className='min-h-screen flex items-center justify-center'>
      <div className='flex flex-col gap-3 w-96'>
        <h1 className='text-3xl text-[chocolate] font-bold'>Welcome to platform</h1>
        <hr></hr>
       
        <input className="text-black"type='email' placeholder='Email' value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}/>
        <input className="text-black" type='password' placeholder='Password' value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
        <button className='primary' onClick={login} >login</button>
        <Link  to='/register' className='text-[chocolate] text-xl underline'>register</Link>
      </div>
    </div>
    </div>
  )
}

export default Login
