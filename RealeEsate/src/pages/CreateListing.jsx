import React from 'react'

export default function CreateListing() {
  return (
   <main>
    <h1 className='text-3xl font-semibold text-center my-7'>CreateListing</h1>
    <form className='flex flex-col items-center gap-4 '>
      <div className='flex flex-col gap-4 w-1/3'>
      <input type='text' placeholder='Name' id='name' maxLength={62} minLength={10} required className=' shadow-md p-3 rounded-lg bg-white'/>
      <textarea type='text' placeholder='Description' id='description'  required className='shadow-md  p-3 rounded-lg bg-white '/>
      <input type='text' placeholder='Address' id='address' maxLength={62} minLength={10} required className='shadow-md  p-3 rounded-lg bg-white '/>
      <div className='flex gap-6 flex-wrap mt-0.5'>
        <div className='flex gap-2'>
          <input type='checkbox' id='sale' className='w-5'/>
          <span>Sall</span>
        </div>
        <div className='flex gap-2'>
          <input type='checkbox' id='rent' className='w-5'/>
          <span>Rent</span>
        </div>
        <div className='flex gap-2'>
          <input type='checkbox' id='parking' className='w-5'/>
          <span>Parking spot</span>
        </div>
        <div className='flex gap-2'>
          <input type='checkbox' id='furnished' className='w-5'/>
          <span>Furnished</span>
        </div>
        <div className='flex gap-2'>
          <input type='checkbox' id='offer' className='w-5'/>
          <span>Offer</span>
        </div>
      </div>
      <div className='flex gap-6 flex-wrap mt-0.5'>
        <div className='flex gap-2 items-center'>
          <input type="number"  id="bedrooms" max={10} min={1} required className='p-3 border border-gray-50 rounded-lg bg-white shadow-2xl'/>
          <span>Beds</span>
        </div>
        <div className='flex gap-2 items-center ml-25'>
          <input type="number"  id="bathrooms" max={10} min={1} required className='p-3 border border-gray-50 rounded-lg bg-white shadow-2xl '/>
          <span>Baths</span>
        </div>
        
        <div className='flex gap-2 items-center'>
          <input type="number"  id="regularPrice" max={1000000} min={1} required className='p-3 border border-gray-50 rounded-lg bg-white shadow-2xl'/>
          <div className='flex flex-col items-center'>
          <span>Regular Price</span>
          <p className='text-xs text-gray-700'>($ / Month)</p>
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          
          <input type="number"  id="discountPrice" max={1000000} min={1} required className='p-3 border border-gray-50 rounded-lg bg-white shadow-2xl'/>
          <div className='flex flex-col items-center'>
          <span>Discount Price</span>
          <p className='text-xs text-gray-700'>($ / Month)</p>
          </div>
        </div>
      </div>
      </div>
 <div className='flex flex-col flex-1 mt-2 gap-4 ml-[-6%]'>
  <p className='font-semibold'>Images:

    <span className='font-normal text-gray-700 ml-2'>The first image will be the cover (max 6)</span>
  </p>
  <div className='flex gap-3'>
    <input className='cursor-pointer p-2.5  rounded-full bg-amber-100 shadow-2xl' type="file" id='images' accept='image/*' multiple placeholder='choose file'/>
    <button className=' cursor-pointer p-3 text-green-500  border border-green-500 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
  </div>
 </div>
 <button className='p-3 text-white bg-slate-700 bordershadow-md rounded-lg uppercase hover:shadow-lg disabled:opacity-80 px-50 cursor-pointer'>Create Listing</button>
    </form> 
   </main>
  )
}
