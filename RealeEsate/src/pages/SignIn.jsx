import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function SignIn() {
  const [formData,setFormData]=useState({})
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const navigate = useNavigate();
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    })
  }
  console.log(formData);
  const handleSubmit=async(e)=>{
    try{
    e.preventDefault()
    setLoading(true);
    const res = await fetch('/Backend/auth/signin',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    })
    const data = await res.json()
    if(data.success===false){
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    console.log(data);
  navigate('/')
  }
    catch(err){
      setLoading(false);
      setError(err.message);
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto bg-amber-100 mt-3.5 rounded-4xl shadow-md '>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
        
        <input type="email" placeholder='email' className='border p-3 rounded-4xl shadow-md' id='email' onChange={handleChange}/>

        <input type="password" placeholder='password' className='border p-3 rounded-4xl shadow-md' id='password' onChange={handleChange}/>
        <button className='bg-slate-700 text-white p-3 rounded-4xl uppercase hover:opacity-95 disabled:opacity-80'disabled={loading} >{loading?'Loading':'Sign In'}</button>

      </form>
      <div className='flex flex-row justify-center items-center gap-2 mt-5'>
  <p className='text-slate-700'>Dont have an account?</p>
  <Link to='/sign-up' className='text-blue-800'>Sign up</Link>
</div>

{error && <p className='text-red-500'>{error}</p>}
    </div>
  )
}
