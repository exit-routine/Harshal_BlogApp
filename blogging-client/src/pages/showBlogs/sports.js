





import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';


import BlogCard from '../../components/Blogcard/BlogCard';
import './blogwrapper.css'
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/pagination/Pagination';

const Sports = () => {

    const [blogs, setBlogs] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(2);
    const [search, setSearch] = useState(" ")
    const navigate = useNavigate()
    const API_URL = "http://localhost:3000/api/v1/choice-data";
    const dispatch = useDispatch()
    const getBlogs = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post(API_URL, { genre: "sport" }, {
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
    const createBlog = () => {
        navigate('/add-blog')
    }

    useEffect(() => {
        if (blogs.length === 0) {
            getBlogs()
        }
    }, [])

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = blogs.slice(firstPostIndex, lastPostIndex)
    const totalBlogs = blogs.length
    return (
        <div className='sports' >
          <div className='commwrap'>
            {
                blogs?.length > 0 ? (
                    <div className='wrapper gap-4'>
                        <div className='flex justify-center p-10'>

                            <input className='w-[80%]' placeholder='search' onChange={(e) => setSearch(e.target.value.toLowerCase())} />


                        </div>
                        {
                            currentPosts?.filter((item) => { return search === " " ? item : (item.title.includes(search.toLowerCase()) || item.genre.includes(search.toLowerCase()) || item.user_name.includes(search.toLowerCase())) }).map((blog) => {
                                return <BlogCard key={blog?._id} blog={blog} currcomp={Sports.name} />
                            })
                        }
                        <Pagination totalBlogs={totalBlogs} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                    </div>
                ) : (
                    <div>
                        <h1>you have not creatd any blog click below to create one</h1>
                        <button className='cursor-pointer border-2 border-black p-4 bg-red-800' onClick={createBlog}> createBlog</button>
                    </div>
                )
            }
        </div>
        </div>
    )
}

export default Sports
