import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../redux/userSlice'
import { hideLoading, showLoading } from '../redux/alertSlice'
import DefaultLayout from './Defaultlayout/DefaultLayout'

const ProtectedRoute = ({ children }) => {
    const { currentuser } = useSelector(state => state.user)
    const navigate = useNavigate()
    const [readyToRender, setReadyToRender] = useState(false)
    //   const [userData, setUserData] = useState(null)
    const dispatch = useDispatch()
    const API_URL = "http://localhost:3000/api/v1/getdata"
    const getData = async () => {
        try {
            dispatch(showLoading())
            const response = await  axios.post(API_URL, {}, {

                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (response.data.success) {
                setReadyToRender(true)
               // console.log(response.data.data)
                  dispatch(setUser(response.data.data))
                // setUserData(response.data.data)
            } else {
                setReadyToRender(true)
                alert(response.data.msg)
            }

           
        } catch (e) {
            dispatch(hideLoading())
            setReadyToRender(true)
            localStorage.removeItem('token')
            navigate('/login')
        }
    }

    useEffect(() => {
        if (currentuser == null) {
            getData()
        }

    }, [])
    return (
        <div>
            {readyToRender&&<DefaultLayout>{children}</DefaultLayout> }
        </div>
    )
}

export default ProtectedRoute
