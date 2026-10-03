import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Loader } from "../components/Loader";
import { FaCheck, FaOpenid, FaUserLarge } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import SetUserData from './userinformation';
import { IoOpenOutline } from "react-icons/io5";

export const AllOrders = () => {
    const [allOrders,setAllOrders] = useState("")
    const [option,setOption] = useState(-1)
    const [values,setValues] = useState({status:""})
    const [userDev,setUserDev] = useState("hidden")
    const [userDevData,setUserDevData] = useState()

    

    const change = (e) => {
      const {value} = e.target
      setValues({status:value})
    }


    const headers = {
        id: localStorage.getItem("id"),
        authorization: localStorage.getItem("accessToken"),
      };

    useEffect(() => {
        const fetch = async()=> {
            const response = await axios.get("http://localhost:4000/get-all-order",{headers})
           setAllOrders(response.data.data);
           console.log(response.data.data);
           
            

        }
        fetch()
    },[])

    const submitChange = async (i) => {
      const id = allOrders[i]._id
      const response = await axios.put(`http://localhost:4000/update-status/${id}`,values,{headers})
      alert(response.data.message)
    }
    
  return (
    <>
    {!allOrders && (
      <div className='h-[100%] flex items-center justify-center'>
        <Loader />
      </div>

    )}
      {allOrders && allOrders.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All Orders
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1  className='text-center'>st</h1>
            </div>
            <div className="w-[40%] md:w-[22%]">
              <h1>Books</h1>
            </div>
            <div className="w-0 md:w-[45%] hidden md:block">
              <h1>description</h1>
            </div>
            <div className="w-[17%] md:w-[7%]">
              <h1>price</h1>
            </div>
            <div className="w-[30%] md:w-[17%]">
              <h1>status</h1>
            </div>
            <div className=" w-[10%] md:w-[5%] ">
              <FaUserLarge/>
            </div>
          </div>

          {allOrders.map((items, i) => (
            <div className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:cursor-pointer hover:bg-zinc-900">
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>
              <div className="w-[22%]">
                <Link
                  to={`/view-book-details/${items.book._id}`}
                  className=" hover:text-blue-300"
                >
                  {items.book.title}
                </Link>
              </div>

              <div className="w-0 md:w-[45%] hidden md:block">
                <h1 className="">{items.book.desc.slice(0, 50)}...</h1>
              </div>

              <div className="w-[17%] md:w-[9%]">
                <h1 className="">${items.book.price}</h1>
              </div>

              <div className="w-[30%] md:w-[16%]">
                <h1 className="font-semibold ">
                  <button  
                  onClick={() => setOption(i)}
                  className="hover:scale-105 transition-all duration-300">

                  {items.status === "order placed" ? (
                    <div className="text-yellow-500">{items.status}</div>
                  ) : items.status === "canceled" ? (
                    <div className="text-red-500">{items.status}</div>
                  ) : (
                    <div className="text-green-500">{items.status}</div>

                  )}
                  </button>
                  <div className={`${option === i ? "block" : "hidden"} flex mt-4`}>
                    <select name="status" id='' className='bg-gray-800' value={values.status} onChange={change}>
                      {[
                        "order placed",
                        "out for delivery",
                        "delivered",
                        "canceled"
                      ].map((items,i)=> (
                        <option value={items} key={i}>{items}</option>
                      ))}
                    </select>
                    <button 
                    className='text-green-500 hover:text-pink-600 mx-2'
                    onClick={()=> {
                      setOption(-1);
                      submitChange(i);
                    }}
                    >
                      <FaCheck/>
                    </button>
                  </div>

                </h1>
              </div>
              <div className="w-[10%] md:w-[5%]">
                <button className='text-xl hover:text-orange-500'
                onClick={()=> {
                  setUserDev("fixed")
                  setUserDevData(items.user)
                }}
                >
                  <IoOpenOutline />

                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {userDevData && (
        <SetUserData
        userDevData={userDevData}
        userDev={userDev}
        setUserDev={setUserDev}
        />
      )}
    </>
  )
}
