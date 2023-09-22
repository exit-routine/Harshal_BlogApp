import React, { useEffect, useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './index.css'
import { EditorState, convertFromRaw, convertToRaw ,ContentState} from 'draft-js';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { hideLoading, showLoading } from '../../redux/alertSlice';

import { toast } from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
const AddBlog = () => {
    const { currentuser } = useSelector(state => state.user)
    const { id } = useParams()

    const API_URL = "http://localhost:3000/api/v1/blogs"
    const API_URL2 = `http://localhost:3000/api/v1/blogs/${id}`

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [blog, setBlog] = useState(
        {
            title: "",
            information: EditorState.createEmpty(),
            genre: ""
        }
    )

   
    const onSave = async () => {
      
       
        try {
           
            let response = " "
            
            
            dispatch(showLoading())
            if (id) {
                response = await axios.put(API_URL2, {
                    ...blog,
                    information: JSON.stringify(convertToRaw(blog.information.getCurrentContent())),
                    user_id: currentuser.id
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            } else {
                response = await axios.post(API_URL, {
                    ...blog,
                    information: JSON.stringify(convertToRaw(blog.information.getCurrentContent())),
                    user_id: currentuser.id

                },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
            }

            dispatch(hideLoading())

            if (response.data.success) {
                toast.success(response.data.msg)
                navigate('/currentUser-blog')
            } else {
                toast.error(response.data.msg)
            }

        } catch (e) {
            dispatch(hideLoading())
            toast.error(e.message)
            console.log(e)
        }
    }

    const onCancel = () => {
        let answer = window.confirm("Are you sure you don't want to add this blog?");

        if (answer) {
            navigate('/')
        }

    }

    window.history.pushState({ page: 1 }, "", "");

    window.onpopstate = function (event) {

       

        if (event) {

            const res=window.confirm("your data will losse are you sure you want to go back")
            if(res){
                navigate('/currentUser-blog')
            }
          
        }
        else {
            
        }
    }

   


    const getBlogInfo = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get(API_URL2, {
                headers: {
                    Authorization: `bearer ${localStorage.getItem('token')}`
                }
            })


            if (response.data.success) {
                console.log(response.data.data)
                console.log(id)
                setBlog({
                    ...response.data.data,
                    information: EditorState.createWithContent(convertFromRaw(JSON.parse(response?.data.data.information)))
                })
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
        if (id) {
            getBlogInfo()
        }

    }, [])
    const contentState = blog.information.getCurrentContent();
    const isEditorEmpty = contentState.getBlockMap().size === 1 && contentState.getFirstBlock().getText() === '';
    const isSubmitDisabled=!blog.title|| isEditorEmpty 

    
    
    return (
        <div className='p-5 bg-[white]' >
            {id ? (<div><h1 className='text-5xl flex justify-end m-10  text-gray-600 text-bold'>EDIT</h1><hr /></div>) : (<div><h1 className='text-5xl flex justify-end m-10  text-gray-600 text-bold'>ADD</h1><hr /></div>)}


            <div className='flex flex-col  mt-5 gap-4'>
                <input
                    type='text'
                    placeholder='title'
                    value={blog.title}
                    onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                />
                <select className="cat " value={blog.genre} onChange={(e) => setBlog({ ...blog, genre: e.target.value })}>
                    <option value="">Select a category</option>
                    <option value="spiritual">spiritual</option>
                    <option value="technology">technology</option>

                    <option value="sport">sport</option>
                    <option value="random">random</option>
                </select>
                <div>
                    <Editor toolbarStyle={{
                        border: "1px solid "
                    }}
                        editorStyle={{
                            border: "1px solid",
                            padding: "10px",
                            height: "40vh"
                        }}
                        editorState={blog.information}
                        onEditorStateChange={(content) => setBlog({ ...blog, information: content })}
                    />
                </div>

                <div className='flex  justify-center gap-3'>
                {
                    isSubmitDisabled ? (<button onClick={onSave} disabled={isSubmitDisabled} className=' cursor-pointer   bg-[#74a2d0]  p-5'> save</button>) :(<button onClick={onSave} disabled={isSubmitDisabled} className=' sv cursor-pointer   bg-[#0971d7]  p-5'> save</button>)
                }
                    
                    <button onClick={onCancel} className=' ca cursor-pointer text-[#8c2a2a] b-[2px solid #964a4a] p-5'> cancel</button>
                </div>

            </div>
        </div>
    )
}

export default AddBlog
