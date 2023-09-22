import React, { useState } from 'react'
import './Addcomments.css'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../../redux/alertSlice'
const AddComments = () => {
    const dispatch=useDispatch()
    const {id}=useParams()
    const {currentuser}=useSelector(state=>state.user)
  const navigate=useNavigate()
     const [commentInfo,setCommentInfo]=useState("")

const add= async()=>{
    const API_URL="http://localhost:3000/api/v1/comments"
    if(commentInfo.length===0){
        toast.error("comment section can't be blank")
    }else{
        try{
            dispatch(showLoading())
         const response=await axios.post(API_URL,{
              comments:commentInfo,
              user_id:currentuser.id,
              blog_id:id
         },{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
         }
         )
         if(response.data.success){
            toast.success(response.data.msg)
            navigate(`/comments/${id}`)
         }else{
            toast.error(response.data.msg)
            navigate(`/comments/${id}`)
         }
         dispatch(hideLoading())

        }catch(e){
            dispatch(hideLoading())
            toast.error(e.message)
   
        }
    }
  
}
const canc=()=>{
  let answer = window.confirm("Are you sure you don't want to add comment?");
  if(answer){
    navigate('/show-blog')
  }
}

  return (
    <div className=''>
   
    <div className='comm bg-black'>
       
       <div>
        <textarea  onChange={(e)=>{setCommentInfo(e.target.value)}} className='ar'>
        </textarea>
       </div>
       <div className='gap-4 mt-4'>
         <button onClick={ canc } className= ' bg-[#8c828] btc'>Cancel</button>
         <button onClick={add} className='bg-[#4573c6] btc'>Save</button>
       </div>
       </div>
    </div>
  )
}

export default AddComments
