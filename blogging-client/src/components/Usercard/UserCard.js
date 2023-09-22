
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import './usercard.css'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../../redux/alertSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
const UserCard = ({ user }) => {
    const dispatch = useDispatch()
    const {currentuser}=useSelector(state=>state.user)
    const navigate = useNavigate()
     
    const change = async () => {
        const API_URL = `http://localhost:3000/api/v1/users/${user?.id}`
        
        
        if (user.role === "user") {
            user.role="admin"
            
        } else {
           user.role="user"
        }
        try {
            dispatch(showLoading())
            const response = await axios.patch(API_URL, {...user,"role":user.role}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                console.log(response.data)
                toast.success(`${user.name} roles updated to ${user.role}`)
                window.location.reload()

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
    const del = async () => {
        const API_URL = `http://localhost:3000/api/v1/users/${user?.id}`
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

    useEffect(()=>{
      if(currentuser.role==="user"){
        navigate('/')
      
      }
    },[currentuser])

    return (
        <div >
        <div className=' userbl1 border shadow-5 gap-4  p-4 '>
            <div>

                <h1 className=" text-white font-bold">Name:{user?.name}</h1>
                <h1 className=" text-white font-bold">Role:{user?.role}</h1>

            </div>
            <div className="flex gap-6" >


                <div className='changes'>


                    <div className='gap-4 flex w-1/2'>
                        <button onClick={del} className='userbtn2 flex h-14 '> Delete <i class="ri-delete-bin-6-fill"></i> </button>
                        <button onClick={change} className='userbtn3 flex ' >change role<i class="ri-edit-2-line"></i></button>
                    </div>


                </div>
            </div>

            </div>
        </div>
    )
}

export default UserCard
