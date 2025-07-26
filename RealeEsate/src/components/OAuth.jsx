import React from 'react';
import { app } from '../assets/firebase';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { signInSuccess } from '../user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      // Adjust backend URL if needed
      const res = await fetch('/Backend/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
      });

      const data = await res.json();
      console.log('Returned user from backend:', data);
      console.log('Full response structure:', JSON.stringify(data, null, 2));

      // Handle different possible response structures
      let userData;
      if (data.user) {
        userData = data.user;
      } else if (data.data) {
        userData = data.data;
      } else {
        userData = data;
      }

      console.log('User data being dispatched:', userData);
      
      // Ensure we have the required fields
      const userToDispatch = {
        username: userData.username || userData.name || userData.displayName,
        email: userData.email,
        avatar: userData.avatar || userData.photoURL,
        ...userData
      };
      
      console.log('Final user object for Redux:', userToDispatch);
      dispatch(signInSuccess(userToDispatch));
      navigate('/');
    } catch (error) {
      console.log('Could not sign in with Google', error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-2xl uppercase hover:opacity-95"
    >
      Continue with Google
    </button>
  );
}