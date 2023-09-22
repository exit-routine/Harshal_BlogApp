import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'

import { hideLoading, showLoading } from '../../redux/alertSlice'
import { toast } from 'react-hot-toast'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 }
    from 'react-html-parser';
// import ReactHtmlParser from 'react-html-parser'
import draftToHtml from 'draftjs-to-html'
import './bloginfo.css'

const BlogInfo = () => {
   
    
    const { id } = useParams()
    const [blog, setBlog] = useState(null)
    //console.log(id)
    const dispatch = useDispatch()
    const API_URL = `http://localhost:3000/api/v1/blogs/${id}`

    const getBlogInfo = async() => {
        try {
            dispatch(showLoading())
            const response =  await axios.get(API_URL, {
                headers: {
                    Authorization: `bearer ${localStorage.getItem('token')}`
                }
            })


            if (response.data.success) {
                 console.log(response.data.data)
                setBlog(response.data.data)
                // console.log(response.data.data)
                // console.log(blog)
            } else {
                toast.error(response.data.msg)
            }
            dispatch(hideLoading())

        } catch (e) {
            dispatch(hideLoading())
            toast.error(e.message)
            console.log(e)
        }

    }

    useEffect(() => {
       
         getBlogInfo()
       
    }, [])

    return blog&&(
        <>
        
    
        <div className='info'>
       
         <h1 className=' title uppercase cursor-pointer'>{blog.title}</h1>
            {ReactHtmlParser(draftToHtml(JSON.parse(blog?.information)))}
            <div className=' my-10 '>
              
               <h1 className='text-xl text-gray-600  bold' >created by:{blog?.user_name}</h1>
            </div>
        </div>
        </>
    )
}

export default BlogInfo
