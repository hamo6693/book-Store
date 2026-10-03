import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const MobileNav = () => {
  const role = useSelector(state => state.auth.role)

  return (
    <>
    {role === "user" && (
      <div className='w-full lg:hidden flex items-center justify-between mt-4'>
      <Link to="/profile" className=' text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>
      favourites
      </Link>

      <Link to="/profile/orderHistory" className=' text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>
      OrderHistory
      </Link>

      <Link to="/profile/settings" className=' text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>
      settings
      </Link>
  
  </div>

    )}

{role === "admin" && (
      <div className='w-full lg:hidden flex items-center justify-between mt-4'>
      <Link to="/profile" className=' text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>
      All Orders
      </Link>

      <Link to="/profile/add-book" className=' text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>
      Add Book
      </Link>
      </div>
      )}

    
    </>
  
  )
}
