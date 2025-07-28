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
  const [showListingError, setShowListingError] = useState(false);
  
  // FIXED: Added missing state variables for listings functionality
  const [userListings, setUserListings] = useState([]);
  const [showListingsLoading, setShowListingsLoading] = useState(false);
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
// FIXED: Updated handleShowListings to use correct route and display listings
const handleShowListings = async()=>{
  try{
    setShowListingError(false);
    setShowListingsLoading(true);
    
    // FIXED: Use the correct route with proper authentication headers
    const res = await fetch(`/Backend/listing/user/${currentUser._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important: send cookies for authentication
    });
    
    const data = await res.json();
    
    // FIXED: Better error handling and debugging
    console.log('Response status:', res.status);
    console.log('Response data:', data);
    
    if(res.status === 401) {
      console.log('Authentication failed - user not logged in or token expired');
      setShowListingError('Authentication failed. Please sign in again.');
      setShowListingsLoading(false);
      return;
    }
    
    if(data.success === false){
      console.log('Request failed:', data.message);
      setShowListingError(data.message || 'Failed to fetch listings');
      setShowListingsLoading(false);
      return;
    }
    
    console.log('User listings:', data);
    setUserListings(data);
    setShowListingsLoading(false);
    
  }catch(error){
    console.log('Error fetching listings:', error);
    setShowListingError(true);
    setShowListingsLoading(false);
  }
}

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
      <button onClick={handleShowListings} className='ml-45 bg-green-700 text-white p-3 rounded-lg hover:opacity-95 cursor-pointer text-green-700 text-center'>Show Listing</button>
      <p className='text-red-700 mt-5'>{showListingError?'Error showing listings':" "}</p>
      {userListings && userListings.length > 0 && (
  <div className='mt-5 flex flex-col gap-4 '>
    <h1 className='text-3xl font-semibold text-center my-7'>Your Listings</h1>
    {userListings.map((listing) => (
      <div
        key={listing._id}
        className='bg-yellow-100 p-3 rounded-lg flex justify-between items-center'
      >
        <Link to={`/listing/${listing._id}`}>
          <img
            src={listing.imageUrls[0]}
            alt='Listing images'
            className='w-40 h-40 object-cover rounded-lg'
          />
        </Link>

        <p className='truncate font-semibold text-lg text-slate-700 cursor-pointer hover:underline'>
          {listing.name}
        </p>

        <div className='flex gap-2 flex-col items-center'>
          <button className='text-red-700 uppercase cursor-pointer'>Delete</button>
          <button className='text-green-700 uppercase cursor-pointer'>Edit</button>
        </div>
      </div>
    ))}
  </div>
)}
    </div>
  );
};
