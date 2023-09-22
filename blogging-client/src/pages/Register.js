import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertSlice';
import { toast } from 'react-hot-toast';
const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const API_URL = "http://localhost:3000/api/v1/users"
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

 

  const register = async () => {
   
    try {
      dispatch(showLoading())
     
      const response = await axios.post(API_URL, user, { "user": user });
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success("user registered successfully")
        navigate('/')
      } else {
        toast.error(response.data.msg)
      }

    } catch (e) {
      dispatch(hideLoading())
      toast.error("something went wrong")
      console.log(e)
    }
  }
  return (
    <div className='bg-[#2c2929]'> 
    <div className='min-h-screen flex items-center justify-center'>
      <div className='flex flex-col gap-3 w-96'>
        <h1 className='text-3xl text-[chocolate]  font-bold'>Welcome </h1>
        <hr></hr>
        <input className="text-black" type='text' placeholder='Name' value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
        <input className="text-black" type='email' placeholder='Email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
        <input className='text-black' type='password' placeholder='Password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
        <button className='primary' onClick={register} >Register</button>
        <Link to='/login' className='text-xl text-[chocolate] underline'>login</Link>
      </div>
    </div>
    </div>
  )
}

export default Register
