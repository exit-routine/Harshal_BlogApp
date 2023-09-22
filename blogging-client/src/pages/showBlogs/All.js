
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertSlice';
import { toast } from 'react-hot-toast';
import './blogwrapper.css'
import axios from 'axios';
//import { setAllUsers } from '../../redux/userSlice';
import moment from 'moment/moment';
import BlogCard from '../../components/Blogcard/BlogCard';
import Pagination from '../../components/pagination/Pagination';

const All = () => {

    const [blogs, setBlogs] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(2);
    const [search, setSearch] = useState("")


    const API_URL = "http://localhost:3000/api/v1/blogs";
    const dispatch = useDispatch()
    const getBlogs = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (response.data.success) {
                setBlogs(response.data.data)
                console.log(blogs)

              
            } else {
                console.log("something went wrong")
             
                toast.error(response.data.msg)
            }
        } catch (e) {
            dispatch(hideLoading())
            console.log(e)
        }
    }
    useEffect(() => {
        if (blogs.length == 0) {
            getBlogs()
        }
    }, [])


    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = blogs.slice(firstPostIndex, lastPostIndex)
    const totalBlogs = blogs.length

    return (
        <div className='all'>
        <div className='commwrap'>
            <div className=' gap-4'>
                <div className='flex justify-center p-10'>

                    <input className='w-[80%]' placeholder='search' onChange={(e) => setSearch(e.target.value.toLowerCase())} />


                </div>
                {
                    currentPosts.filter((item) => { return search === " " ? item : (item.title.includes(search.toLocaleLowerCase()) || item.genre.includes(search.toLocaleLowerCase()) || item.user_name.includes(search.toLocaleLowerCase())) }).map((blog) => {
                        return <BlogCard key={blog._id} blog={blog} />
                    })


                }
                <Pagination totalBlogs={totalBlogs} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            </div>
        </div>
        </div>
    )
}

export default All
