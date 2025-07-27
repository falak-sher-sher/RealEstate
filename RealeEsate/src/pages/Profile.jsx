import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { UpdateUserFailure,UpdateUserStart,UpdateUserSuccess,deleteUserFailure,deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../user/userSlice.js';
import { Link } from 'react-router-dom';
export default function Profile() {
  const fileRef = useRef(null);
  const [formData,setFormData]=useState({})
  const dispatch = useDispatch();
  const [updateSuccess,setUpdateSuccess]=useState(false);
  console.log(formData)
  const { currentUser,loading ,error} = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,

    })
  }

  
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      dispatch(UpdateUserStart());
      const res =await fetch(`/Backend/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        credentials: 'include',
        body:JSON.stringify(formData)
      })
      const data = await res.json()
      dispatch(UpdateUserSuccess(data));
      setUpdateSuccess(true);
    }catch(error){
      dispatch(UpdateUserFailure(error.message));
    }
  }
 const handleDeleteUser = async () => {
  try {
    const res = await fetch(`/Backend/user/delete/${currentUser._id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await res.json();
    
    if (data.success === false) {
      dispatch(deleteUserFailure(data.message));
      return;
    }

    dispatch(deleteUserSuccess(data)); // Correct place to dispatch success
  } catch (error) {
    dispatch(deleteUserFailure(error.message));
  }
};
const handleSignOut = async () => {
  dispatch(signOutUserStart());
  try {
    const res = await fetch('/Backend/auth/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();

    if (data.success === false) {
      dispatch(signOutUserFailure(data.message));
      return;
    }

    dispatch(signOutUserSuccess(data));
  } catch (error) {
    dispatch(signOutUserFailure(error.message));
  }
};


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Profile
      </h1>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <input type='file' ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} src={currentUser.avatar} alt="avatar" className='mt-2 rounded-full h-24 w-24 object-cover cursor-pointer self-center' />
        <input type="text" placeholder='Username' id='username' className='shadow-mdmt-3 bg-yellow-100 border border-gray-300 p-3 rounded-lg' defaultValue={currentUser.username} onChange={handleChange}/>
        <input type="text" placeholder='email' id='email' className='shadow-mdmt-3 bg-yellow-100 border border-gray-300 p-3 rounded-lg' defaultValue={currentUser.email} onChange={handleChange}/>
        <input type="password" placeholder='password' id='password' className='shadow-mdmt-3 bg-yellow-100 border border-gray-300 p-3 rounded-lg' onChange={handleChange}/>
        <button disabled={loading} className=' cursor-pointer active:bg-slate-800 uppercase bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80'>{loading?'Updating...':'Update'}</button>
        <Link className='bg-green-700 text-white p-3 rounded-lg hover:opacity-95 cursor-pointer text-center' to={'/create-listing'}>Create Listing</Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete account</span>
         <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Logout</span>
      </div>
      <p className='text-red-700 mt-5'>{error?error:" "}</p>
      <p className='text-green-700 mt-5'>{updateSuccess?'Updated successfully':" "}</p>

      </div>
  )
}
