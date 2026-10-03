import React from 'react'
import { FaArrowRight, FaRegArrowAltCircleRight, FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../../store/auth';
import { useDispatch, useSelector } from "react-redux";

export const SideBar = ({data}) => {
  const dispatch = useDispatch()
  const history = useNavigate()

  const role = useSelector(state => state.auth.role)

  

  return (
    <div className=' bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-auto lg:h-[100%]'>
      <div className='flex items-center flex-col justify-center'>
        {" "}
        <FaRegUser className='h-[12vh]' />
        <p className='mt-3 text-xl text-zinc-100 font-semibold'>
            {data.name}
        </p>
        <p className='mt-1 text-zinc-100 font-normal'>{data.email}</p>
        <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>
        </div>

        {role === "user" && (
          <div className='w-full  flex-col items-center justify-center hidden lg:flex'>
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
            <div className='w-full  flex-col items-center justify-center hidden lg:flex'>
          
  
            <Link to="/profile" className=' text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>
            All Orders
            </Link>
  
            <Link to="/profile/add-book" className=' text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>
            Add Book
            </Link>
        
        </div>
        )}

        <button className='bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center hover:bg-white hover:text-zinc-900 rounded transition-all duration-300 cursor-pointer'
        onClick={()=> {
          dispatch(authActions.logout())
          dispatch(authActions.changeRole("user"))
          localStorage.clear("id")
          localStorage.clear("token")
          localStorage.clear("role")
          history("/");
        }}
        >
          LogOut <FaArrowRight className='ms-2'/>
        </button>
    </div>
  )
}
