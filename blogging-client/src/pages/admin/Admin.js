import React, { useEffect, useState } from 'react'
import './admin.css'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../redux/alertSlice'
import { toast } from 'react-hot-toast'
import Pagination from '../../components/pagination/Pagination'
import UserCard from '../../components/Usercard/UserCard'
const Admin = () => {

    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(3);
    const dispatch = useDispatch()

    const getUsers = async () => {
        const API_URL = "http://localhost:3000/api/v1/users"

        try {
            dispatch(showLoading())
            const response = await axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.data.success) {
                setUsers(response.data.data)
                toast.success("users fetched successfully")
                console.log(response.data.data)
            } else {
                toast.error(response.data.msg)
            }
            dispatch(hideLoading())
        } catch (e) {
            dispatch(hideLoading())
            toast.error(e.message)
        }

    }

    useEffect(() => {
        getUsers()
    }, [])

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = users.slice(firstPostIndex, lastPostIndex)
    const totalBlogs = users.length
    return (
        <div className='bg-[black] min-h-[100vh] '>
            <div className='btnwrap flex justify-end'>
                <h1 className='text-white font-bold text-4xl mr-5'  >Users</h1>
            </div>
            <hr />
            <div className='commentswrapper '>
                {users.length == 0 ? (<h1 className='text-white'>no comments</h1>)
                    : (

                        <div className=' gap-4'>
                            {
                                currentPosts.map((user) => {
                                    return <UserCard key={user._id} user={user} />
                                })


                            }
                            <Pagination totalBlogs={totalBlogs} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                        </div>

                    )
                }
            </div>
        </div>
    )
}

export default Admin
