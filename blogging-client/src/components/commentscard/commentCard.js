import moment from 'moment'
import React from 'react'
import './comments.css'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../../redux/alertSlice'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
const CommentCard = ({ comment }) => {
   const{currentuser}=useSelector(state=>state.user)
   const {id}=useParams()
   const dispatch=useDispatch()
   const navigate=useNavigate()
   const delComment=async()=>{
    const API_URL=`http://localhost:3000/api/v1/comments/${comment?.id}`
     try{
      dispatch(showLoading())
      
      const res=await axios.delete(API_URL,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if(res.data.success){
        toast.success(res.data.msg)
        window.location.reload()
        navigate(`/comments/${id}`)
      }else{
        toast.error("something went wrong")
      }
      dispatch(hideLoading())
     }catch(e){
       dispatch(hideLoading())
       toast.error(e.message)
     }
   }

    return (
        <div className=' bl border shadow-5 gap-4  p-4 '>
            <div>
                <div>
                    <h1 className=" text-2xl font-[emoji] ">{comment?.user_name}</h1>
                </div>


           <div className='mt-3 ml-2'>
              <p className=' text-xl  font-[emoji]'>{` "${comment.comments}"`}</p>

              <div className='mt-5'>
               <h1 className=" font-[emoji]">at: {moment(comment.created_at).format("DD-MM-YYYY , hh:mm:ss")}</h1>
              </div>

              <div className='mt-10 '>
                { ((currentuser.id===comment.user_id)||(currentuser.role==="admin"))&&<button onClick={delComment} className='p-3 combtn bg-[#688f19] }'>Delete</button>}
              </div>
       
           </div>
                
            </div>



        </div>
    )
}

export default CommentCard
