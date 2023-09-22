// import React from 'react'
// import { toast } from 'react-hot-toast'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import './defaultlayout.css'
// const DefaultLayout = ({children}) => {
//     const {currentuser}=useSelector(state=>state.user)
//     const navigate=useNavigate()
//     const logout=()=>{
//         localStorage.removeItem('token')
//         toast.success("logging out")
//         window.location.reload()
//         // navigate('/login')

//     }
//     const gotoHome=()=>{
//       navigate('/')
//     }
//     const gotoAllBlogs=()=>{
//       navigate('/show-blog')
//     }
//     const createBlog=()=>{
//       navigate('/add-blog')
//     }
//   return (
//     <div>
//       <header className='hed flex  justify-around p-3 bg-[yellowgreen]  '>
//       <h1 className='text-3xl font-bold  text-[black] cursor-pointer ' onClick={gotoHome}>Blogger</h1>
//       <h1 className='text-xl font-bold text-[black] cursor-pointer' onClick={gotoAllBlogs}>ALL-BLOGS</h1>
//       <h1 className='text-xl font-bold text-[black] cursor-pointer' onClick={createBlog}>CREATE-BLOG</h1> 
//       <div className='flex gap-5 items-center '>
//       {currentuser.role==="admin" ?(<h1 className='text-xl font-bold text-[black]'>{currentuser?.name.UpperCase()}-(admin)</h1>):(<h1 className='text-xl font-bold text-[black]'>{currentuser?.name.toUpperCase()}</h1>)}
       
       
//        <i onClick={logout} className=" text-[black] ri-logout-circle-fill text-xl cursor-pointer ml-10" ></i>
       
//       </div>
      
//       </header>
//       <div className='bck'>
//       {children}
//       </div>
//     </div>
//   )
// }

// export default DefaultLayout



import React from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './defaultlayout.css';

const DefaultLayout = ({ children }) => {
  const { currentuser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    toast.success('Logging out');
    window.location.reload();
  };

  const gotoHome = () => {
    navigate('/');
  };

  const gotoAllBlogs = () => {
    navigate('/show-blog');
  };

  const createBlog = () => {
    navigate('/add-blog');
  };

  return (
    <div>
      <header className="hed flex flex-wrap sm:flex-nowrap justify-around p-3 bg-[yellowgreen]">
        <h1
          className="text-3xl font-bold text-black cursor-pointer"
          onClick={gotoHome}
        >
          Blogger
        </h1>
        <h1
          className="text-xl font-bold text-black cursor-pointer"
          onClick={gotoAllBlogs}
        >
          ALL-BLOGS
        </h1>
        <h1
          className="text-xl font-bold text-black cursor-pointer"
          onClick={createBlog}
        >
          CREATE-BLOG
        </h1>
        <div className="flex gap-5 items-center flex-wrap">
          {currentuser.role === 'admin' ? (
            <h1 className="text-xl font-bold text-black">
              {currentuser?.name.toUpperCase()}-(admin)
            </h1>
          ) : (
            <h1 className="text-xl font-bold text-black">
              {currentuser?.name.toUpperCase()}
            </h1>
          )}
          <i
            onClick={logout}
            className="text-black ri-logout-circle-fill text-xl cursor-pointer ml-2"
          ></i>
        </div>
      </header>
      <div className="bck">{children}</div>
    </div>
  );
};

export default DefaultLayout;
