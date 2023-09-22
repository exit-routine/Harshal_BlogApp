import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sports from './sports'
import './showBlogs.css'
const ShowBlog = () => {
    const [selectBlog, setSelectBlog] = useState("")
    const navigate=useNavigate()
    return (
        <div className='allblogswrapper '>
        <div className='allBlogs sm:flex flex-col'>
          <div className='p-10'>
           <h1 className=' hd flex justify-center text-3xl   '>select the category you want to see</h1>
          </div>
            
            
            <div className='blogwrapper sm:flex flex-wrap'>
                <div className='individualblogwrapper'>
                    <div className='blog1'>
                        <Link className='text-2xl  ' onClick={() => { setSelectBlog("sports") }} to='/sports-blog'><h1 className='l1 text-[aqua]'>Sports</h1></Link>

                    </div>
                    <button onClick={()=>{navigate('/sports-blog')}} className='btnblg1'>Sports</button>
                </div>

                <div className='individualblogwrapper'>
                    <div className='blog2'>
                        <Link className='text-2xl  ' onClick={() => { setSelectBlog("personal") }} to='/currentUser-blog'><h1 className='l2 text-[#00ffd0]'>Personal</h1></Link>
                    </div>
                    
                    <button onClick={()=>{navigate('/currentUser-blog')}} className='btnblg2'>Personal</button>
                </div>

                <div className='individualblogwrapper'>
                    <div className='blog3'>
                        <Link className='text-2xl  ' onClick={() => { setSelectBlog("spiritual") }} to='/spiritual-blog'><h1 className='l3 text-[#ffaa00]'>Spiritual</h1></Link>
                    </div>
                    
                    <button onClick={()=>{navigate('/spiritual-blog')}} className='btnblg3'>Spiritual</button>
                </div>

                <div className='individualblogwrapper'>
                    <div className='blog4'>
                        <Link className='text-2xl  ' onClick={() => { setSelectBlog("technology") }} to='/technology-blog'><h1 className='l4 text-[#9900ff]'>Technology</h1></Link>
                    </div>
                    <button  onClick={()=>{navigate('/technology-blog')}} className='btnblg4'>Technology</button>
                </div>

                <div className='individualblogwrapper'>
                    <div className='blog5'>
                        <Link className='text-2xl  ' onClick={() => { setSelectBlog("all") }} to='/all-blog'><h1 className='l5 text-[#f700ff]'>All</h1></Link>
                    </div>
                    <button onClick={()=>{navigate('/all-blog')}} className='btnblg5'>All</button>
                </div>

            </div>
          </div>
        </div>
    )
}

export default ShowBlog



