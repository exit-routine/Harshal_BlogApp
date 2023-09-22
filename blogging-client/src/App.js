import logo from './logo.svg';
import  {Toaster}  from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from "react";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import AddBlog from './pages/AddBlog';
import ShowBlog from './pages/showBlogs/showBlog';
import CurrentUser from './pages/showBlogs/currentUser';
import Spiritual from './pages/showBlogs/spiritual';
import Sports from './pages/showBlogs/sports';
import Technology from './pages/showBlogs/technology';
import BlogInfo from './pages/BlogInfo/BlogInfo';
import All from './pages/showBlogs/All';
import DeleteBlog from './pages/DeleteBlog';
import Comments from './components/comments/Comments';
import AddComments from './components/Addcomments/AddComments';
import Admin from './pages/admin/Admin';



function App() {
  const {currentuser}=useSelector(state=>state.user)
  const { loading } = useSelector(state => state.alerts)
  // const {loading}=useSelector(state=>state.loading)
  return (
    <div className="App">
      {loading && <Spinner />}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <BrowserRouter>
        <Routes>
          
          <Route path='/' exact element={<ProtectedRoute><Home /></ProtectedRoute>} ></Route>
          <Route path='/admin' exact element={<ProtectedRoute><Admin /></ProtectedRoute>} ></Route>
          <Route path='/add-blog'  element={<ProtectedRoute><AddBlog /></ProtectedRoute>} ></Route>
          <Route path='/currentUser-blog' element={<ProtectedRoute><CurrentUser /></ProtectedRoute>} ></Route>
          <Route path='/spiritual-blog'  element={<ProtectedRoute><Spiritual /></ProtectedRoute>} ></Route>
          <Route path='/sports-blog'  element={<ProtectedRoute><Sports /></ProtectedRoute>} ></Route>
          <Route path='/technology-blog'  element={<ProtectedRoute><Technology /></ProtectedRoute>} ></Route>
          <Route path='/show-blog'  element={<ProtectedRoute><ShowBlog/></ProtectedRoute>} ></Route> 
          <Route path='/all-blog' element={<ProtectedRoute><All/></ProtectedRoute>} ></Route> 
          <Route path='/blog-info/:id'  element={<ProtectedRoute><BlogInfo/></ProtectedRoute>} ></Route>  
          <Route path='/edit-blog/:id' element={<ProtectedRoute><AddBlog/></ProtectedRoute>} ></Route>  
          <Route path='/delete-blog/:id'  element={<ProtectedRoute><DeleteBlog/></ProtectedRoute>} ></Route>    
          <Route path='/comments/:id'  element={<ProtectedRoute><Comments/></ProtectedRoute>} ></Route>
          <Route path='/add-comment/:id'  element={<ProtectedRoute><AddComments/></ProtectedRoute>} ></Route> 

          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} ></Route>
          <Route path='/register' element={<PublicRoute><Register /></PublicRoute>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
