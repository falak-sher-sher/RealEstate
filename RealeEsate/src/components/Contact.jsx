import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Contact({ listing }) {
  const { currentUser } = useSelector((state) => state.user);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setError('Please enter a message');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const res = await fetch('/Backend/contact/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          listingId: listing._id,
          agentId: listing.userRef,
          message: message,
          senderName: currentUser.username,
          senderEmail: currentUser.email,
          listingTitle: listing.name,
        }),
      });

      const data = await res.json();
      
      if (data.success === false) {
        setError(data.message);
      } else {
        setSuccess(true);
        setMessage('');
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg mt-4'>
      <h3 className='text-xl font-semibold mb-4 text-slate-700'>Contact Agent</h3>
      
      <div className='mb-4 p-3 bg-gray-50 rounded-lg'>
        <p className='text-sm text-gray-600'>Property: <span className='font-medium'>{listing.name}</span></p>
        <p className='text-sm text-gray-600'>Your Name: <span className='font-medium'>{currentUser.username}</span></p>
        <p className='text-sm text-gray-600'>Your Email: <span className='font-medium'>{currentUser.email}</span></p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='message' className='block text-sm font-medium text-gray-700 mb-2'>
            Message to Agent
          </label>
          <textarea
            id='message'
            rows='4'
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent'
            placeholder={`Hi, I'm interested in ${listing.name}. Please contact me with more details.`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        {error && (
          <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg'>
            {error}
          </div>
        )}

        {success && (
          <div className='mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg'>
            Message sent successfully! The agent will contact you soon.
          </div>
        )}

        <div className='flex gap-3'>
          <button
            type='submit'
            disabled={loading}
            className='flex-1 bg-slate-700 text-white py-2 px-4 rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
}
