import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../redux/alertSlice'


import { useNavigate } from 'react-router-dom'
import './home.css'

const Home = () => {
 const dispatch=useDispatch()   
 const navigate=useNavigate()
 const {currentuser}=useSelector(state=>state.user)
 const API_URL="http://localhost:3000/api/v1/blogs";

const createBlog=()=>{
  navigate('/add-blog')
}


const showBlogs=()=>{
  navigate('/show-blog')
}

const showUsers=()=>{
  navigate('/admin')
}
  return (
    < div className='hm'>


      <div className='cont flex justify-center flex-col gap-7'>
      <div>
      <h1 style={{ fontWeight: "bold",
        fontFamily:"fantasy",
        fontSize: "revert",
        color:"antiquewhite"}}>Welcome to Our Blogging Platform {currentuser.name}</h1>
       <p className='text-xl font-[itallic] text-[white]'>"Start sharing your thoughts and stories with the world!<br></br> 
         Thank You for Being a Part of Our Community<br></br> 
         We appreciate your contributions and support". 
       </p>
      </div>
      
       <div className='flex justify-center'>
        <button className=' btnhome1 cursor-pointer border-2 border-black p-4 bg-red-800' onClick={createBlog}> createBlog</button>
        <button className='btnhome2 cursor-pointer border-2 border-black p-4 bg-red-800' onClick={showBlogs}>showblogs</button>
        {currentuser?.role==="admin" ? (<button  onClick={showUsers} className='btnhome3 cursor-pointer border-2 border-black p-4 bg-red-800' >show users</button>) : ""}
       </div>
        
      </div>
    
    </div>

    
  )
}

export default Home
