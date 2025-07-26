import React, { useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
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

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        {/* Logo Section */}
        <Link to="/">
          <h1 className="font-bold text-sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Falak</span>
            <span className="text-slate-700">Realestate</span>
          </h1>
        </Link>

        {/* Search Bar */}
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>

        {/* Navigation / User Section */}
        <ul className="flex gap-4 items-center">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">About</li>
          </Link>
          {/* Conditional User Display */}
          <Link to='/profile'>
          {currentUser ? (
            <img
            src={currentUser.avatar || '/default-avatar.jpg'}
            alt={`${currentUser.username || 'User'}'s avatar`}
            className="w-8 h-8 rounded-full border border-slate-300"
            onError={(e) => {
              console.log('Debug: avatar image failed to load');
              e.currentTarget.src = '/default-avatar.jpg';
            }}
          />
          ) : (
           
              <li className="text-slate-700 hover:underline">Sign-in</li>
           
          )}
          </Link>
        </ul>
      </div>
    </header>
  );
}