import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import './Blogcard.css'
import { useDispatch, useSelector } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'
import CurrentUser from '../../pages/showBlogs/currentUser'
import axios from 'axios'
import { hideLoading, showLoading } from '../../redux/alertSlice'
import { toast } from 'react-hot-toast'
import { addItem, removeItem, setAllLikes, setLiked, setLikes, setUnLiked } from '../../redux/userSlice'
import { useEffect, useState } from 'react'
const BlogCard = ({ blog, currcomp }) => {
    const dispatch = useDispatch()
    const { userLikes } = useSelector((state) => state.user)
    const { currentuser } = useSelector(state => state.user)
    
    const cmp = CurrentUser.name
    const navigate = useNavigate()
      let isfound=false
  
    const blogInfo = () => {
        navigate(`/blog-info/${blog?.id}`)
    }

    const editBlog = () => {
        navigate(`/edit-blog/${blog?.id}`, { state: { edit: true } })
    }
    const deleteBlog = async () => {
        let answer = window.confirm("Are you sure you want to delete?");
        if (answer) {

            const API_URL = `http://localhost:3000/api/v1/blogs/${blog?.id}`
            try {
                dispatch(showLoading())

                const response = await axios.delete(API_URL, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.msg) {
                    toast.success(response.data.msg)
                    navigate('/')
                } else {
                    toast.error(response.data.msg)
                    navigate('/')
                }
                dispatch(hideLoading())
            } catch (e) {
                dispatch(hideLoading())
                toast.error(e.message)
                console.log(e)
            }
        }
    }
    const comments = () => {
        navigate(`/comments/${blog.id}`)
    }

    const find = async () => {
        const API_URL = `http://localhost:3000/api/v1/users_likes_post`
        try {
            const res = await axios.post(API_URL, { "blog_id": blog.id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
           

            if (res.data.success) {
                  isfound=res.data.data.includes(currentuser.id)
                 console.log(isfound)
               
                 if(isfound){
                    return true;
                 }else{
                    return false
                 }
            } else {
                console.log("something went wrong")
            }
        } catch (e) {
           
            console.log(e)
        }
    return false

    }
    const click = async () => {

        
        let isfound=await find()

    

        const API_URL1 = `http://localhost:3000/api/v1/dis-like`
        const API_URL2 = "http://localhost:3000/api/v1/add-like"
        let APIURL = ""

        if(isfound){
            APIURL=API_URL1
        }else{
            APIURL=API_URL2
        }


        try {

            dispatch(showLoading())
            const response = await axios.post(APIURL, { "user_id": currentuser.id, "blog_id": blog.id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            
           // setAlreadyLiked(!alreadyLiked)
            dispatch(hideLoading())
            if (response.data.success) {
                //console.log(response.data.data)

                toast.success(response.data.msg)
                window.location.reload()
            } else {
                toast.error(response.data.msg)

            }

        } catch (e) {
            dispatch(hideLoading())
            toast.error(e.message)
            console.log(e)

        }

    }




    return (


        <div className=' bl1 border shadow-5 gap-4  p-7 '>

            <div>
                <h1 className=' text-xl text-[wheat] cursor-pointer font-bold font-[initial] '>Title:   {blog.title}</h1>
                <h1 className="text-xl text-[wheat]  font-[initial] font-bold">Created by:    {blog?.user_name}</h1>
                <h1 className="text-xl text-[wheat] font-[initial] font-bold">Category:   {blog?.genre}</h1>
                <h1 className="text-xl text-[wheat] font-[initial] font-bold">Created at:  {moment(blog.created_at).format("DD-MM-YYYY , hh:mm:ss")}</h1>
            </div>
            <div className="flex gap-6 w-[50%] " >
                <div>
                    <i onClick={click} style={{color:isfound ? "red " :""}} className="  ri-heart-fill cursor-pointer"></i>
                    <span className='text-[wheat]'>{blog.like_count}</span>
                </div>
                <div>
                    <i onClick={comments} className=" text-[wheat] ri-chat-1-line cursor-pointer"></i>
                    <span className='text-[wheat]'>{blog.comments_count}</span>
                </div>
                <button className=" btn1" onClick={blogInfo}> <i class="ri-eye-fill"></i> </button>
                <div className='changes'>
                    {
                        ((currentuser.id === blog.user_id && currcomp === cmp) || (currentuser.role === "admin")) && (
                            <div className='gap-4'>
                                <button onClick={deleteBlog} className='btn2'> <i class="ri-delete-bin-6-fill"></i></button>
                                <button onClick={editBlog} className='btn3' ><i class="ri-edit-2-line"></i></button>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>

    )

}

export default BlogCard







