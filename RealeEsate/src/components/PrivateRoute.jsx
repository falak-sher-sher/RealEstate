import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
export default function PrivateRoute() {
    const { currentUser } = useSelector((state) => state.user);
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    console.log('Debug: Redux state.user:', userState);
    if (currentUser) {
      console.log('Debug: currentUser object:', currentUser);
      console.log('Debug: currentUser.username:', currentUser.username);
      console.log('Debug: currentUser.avatar:', currentUser.avatar);
      console.log('Debug: currentUser keys:', Object.keys(currentUser));
    } else {
      console.log('Debug: No currentUser found');
    }
  }, [currentUser, userState]);
  return currentUser? <Outlet/>:<Navigate to="/sign-In"/>
    
  
}
