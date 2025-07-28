import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react';
import  SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
import { FaAddressBook, FaBed, FaHandsWash, FaMapMarker, FaBath,FaParking } from 'react-icons/fa';
import { current } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export default function Listing() {
    const {currentUser} = useSelector((state)=>state.user.currentUser);
    SwiperCore.use([Navigation]);
    const params = useParams();
    const [listing,setListing] = useState(null)
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [contact,setContact] = useState(false);
    

    useEffect(()=>{
        const fetchListing = async()=>{
            try{
                setLoading(true);
                const res = await fetch(`/Backend/listing/get/${params.listingId}`)
            const data = await res.json()
            console.log(data);
            if(data.success === false){
                console.log(data.message)
                setError(true);
                setLoading(false);
                return;
            }
            setListing(data);
            setLoading(false);
            setError(false);
            }catch(error){
                setError(true);
                setLoading(false);
            }

            
        }
        fetchListing();
    },[params.listingId]);
  return (
    <main>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {error && <p className='text-center my-7 text-2xl'>Some thing went wrong</p>}
        {listing && !loading && !error && (
            <Swiper navigation>
            {listing.imageUrls.map((url,index)=>(
                <SwiperSlide key={index}>
                    <div className='relative w-full  h-[950px]'>
                        <img className='w-full object-cover h-full' src={url} alt={listing.name} />
                        <div className='absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-50 text-black flex flex-col items-center justify-center ml-[-50px]'>
                            <div className='flex items-center space-x-1'>
                            <h2 className='text-xl font-bold'>{listing.name}-</h2>
                            
                            <p className='text-lg font-bold'>${listing.offer ? listing.discountedPrice : listing.regularPrice}
                            {listing.offer && (
                                <span className='text-lg line-through'>-${listing.regularPrice}<p className='text-sm text-black'>/month</p></span>
                            )}
                            </p>
                            </div>
                            <div className='flex items-center space-x-1 '>
                            <FaMapMarker className='text-2xl ' color='green' />
                            <p className='text-sm my-7'>{listing.address}</p>
                            </div>
                            <div className='flex items-center space-x-2 m-2'>
                            <FaBed className='text-2xl ' color='green' />
                           <p className='text-sm text-green-700'>{listing.bedrooms} Beds</p>
                           <FaBath className='text-2xl ' color='green' />
                           <p className='text-sm text-green-700'>{listing.bathrooms} Baths</p>
                           <FaParking className='text-2xl ' color='green' />
                           {listing.parking && (
                            <p className='text-sm text-green-700'>{listing.parking} Parking</p>
                           )}{!listing.parking && (
                            <p className='text-sm text-green-700'>No Parking</p>)}
                            <FaHandsWash className='text-2xl ' color='green' />
                            {listing.furnished && (
                            <p className='text-sm text-green-700'>Furnished</p>
                            )}
                            {!listing.furnished && (
                            <p className='text-sm text-green-700'>Unfurnished</p>
                            )}
                           

                            </div>
                            <div className='flex items-center space-x-8 mt-5'>
                                <button className='w-45 bg-green-600 text-white py-2 rounded-md'>For rent</button>
                                <button className='w-45 bg-red-600 text-white py-2 rounded-md'>${listing.discountedPrice}10 discount</button>
                            </div>
                            <div className='my-3 flex m-30 space-x-1'>
                                <h1 className='text-xl font-semibold'>Discription- </h1>
                                <p className='text-lg bg-amber-50'> {listing.description}</p>
                            </div>
                            {/* Contact Agent */
                            currentUser && currentUser._id !== listing.userRef && !contact && (
                                <button onClick={() => setContact(true)} className='w-100 bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 cursor-pointer'>Contact Agent</button>
                            )
                            }{contact && <Contact/>}
                            
                        </div>
                    </div>
                </SwiperSlide>
            ))}
            </Swiper>
        )}
    </main>

    
  )
}
