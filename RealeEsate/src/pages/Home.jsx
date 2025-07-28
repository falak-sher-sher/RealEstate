import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair } from 'react-icons/fa'

export default function Home() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    try {
      setLoading(true)
      const res = await fetch('/Backend/listing/get?limit=9')
      const data = await res.json()
      
      if (data.length > 8) {
        setShowMore(true)
      } else {
        setShowMore(false)
      }
      
      setListings(data)
      setLoading(false)
      setError(false)
    } catch (error) {
      console.log('Error fetching listings:', error)
      setError(true)
      setLoading(false)
    }
  }

  const handleShowMore = async () => {
    const numberOfListings = listings.length
    const startIndex = numberOfListings
    
    try {
      const res = await fetch(`/Backend/listing/get?startIndex=${startIndex}&limit=9`)
      const data = await res.json()
      
      if (data.length < 9) {
        setShowMore(false)
      }
      
      setListings([...listings, ...data])
    } catch (error) {
      console.log('Error loading more listings:', error)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      const res = await fetch(`/Backend/listing/get?searchTerm=${searchTerm}&limit=9`)
      const data = await res.json()
      
      if (data.length > 8) {
        setShowMore(true)
      } else {
        setShowMore(false)
      }
      
      setListings(data)
      setLoading(false)
    } catch (error) {
      console.log('Error searching listings:', error)
      setError(true)
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Estate Marketplace is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className='flex gap-2 mt-4'>
          <input
            type='text'
            placeholder='Search for properties...'
            className='border rounded-lg p-3 w-full'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type='submit'
            className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95'
          >
            Search
          </button>
        </form>
      </div>

      {/* Listings Section */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {listings && listings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent listings</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search'}>
                Show more listings
              </Link>
            </div>
            
            {loading && (
              <p className='text-center my-7 text-2xl'>Loading...</p>
            )}
            
            {error && (
              <p className='text-center my-7 text-2xl text-red-600'>Something went wrong!</p>
            )}
            
            <div className='flex flex-wrap gap-4'>
              {listings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
            
            {showMore && (
              <button
                onClick={handleShowMore}
                className='text-green-700 hover:underline p-7 text-center w-full'
              >
                Show more
              </button>
            )}
          </div>
        )}
        
        {!loading && listings.length === 0 && (
          <div className='text-center my-7'>
            <h2 className='text-2xl font-semibold text-slate-600'>No listings found</h2>
            <p className='text-gray-500 mt-2'>Be the first to create a listing!</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Listing Item Component
function ListingItem({ listing }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
            <FaMapMarkerAlt className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.address}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>
          <p className='text-slate-500 mt-2 font-semibold '>
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className='text-slate-700 flex gap-4'>
            <div className='flex items-center gap-1'>
              <FaBed className='text-lg' />
              <p className='text-xs'>
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </p>
            </div>
            <div className='flex items-center gap-1'>
              <FaBath className='text-lg' />
              <p className='text-xs'>
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </p>
            </div>
            {listing.parking && (
              <div className='flex items-center gap-1'>
                <FaParking className='text-lg' />
                <p className='text-xs'>Parking</p>
              </div>
            )}
            {listing.furnished && (
              <div className='flex items-center gap-1'>
                <FaChair className='text-lg' />
                <p className='text-xs'>Furnished</p>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
