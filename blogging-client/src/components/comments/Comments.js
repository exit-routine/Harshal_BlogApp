import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { hideLoading, showLoading } from '../../redux/alertSlice'
import './comments.css'
import comments from '../commentscard/commentCard'
import CommentCard from '../commentscard/commentCard'
import Pagination from '../pagination/Pagination'
const Comments = () => {
    const [comment, setComment] = useState([])
    const [currentPage,setCurrentPage]=useState(1);
    const [postsPerPage,setPostsPerPage]=useState(4);
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const { id } = useParams()
    const API_URL = `http://localhost:3000/api/v1/blogComments`
    
    const getComments = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post(API_URL,{"blog_id":id}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
              
                setComment(res.data.data)
                console.log(res.data.data)
            } else {
                toast.error(res.data.msg)

            }
            dispatch(hideLoading())
        } catch (e) {
            dispatch(hideLoading())
            toast.error(e.message)
            console.log(e)
        }
    }
    
    const addComment=()=>{
        navigate(`/add-comment/${id}`)
    }


    useEffect(() => {
        getComments()
    }, [])

    const lastPostIndex=currentPage * postsPerPage;
    const firstPostIndex=lastPostIndex - postsPerPage;
    const currentPosts=comment.slice(firstPostIndex,lastPostIndex)
    const totalBlogs=comment.length
    return (
        <div className=''>
         
          <div className='btnwrap flex justify-end'>
            <button className='btn' onClick={addComment}>Add new</button>
          </div>
          <hr/>
          <div className='commentswrapper'>
           {comment.length==0 ? (<h1 className='text-white'>no comments</h1>)
           :(
            
            <div className=' gap-4'>
            {
                currentPosts.map((comment) => {
                   return <CommentCard key={comment._id} comment={comment} />
                })

               
            }
            <Pagination totalBlogs={totalBlogs} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
            </div>
            
            )
            }
          </div>
           
        </div>
    )
}

export default Comments
