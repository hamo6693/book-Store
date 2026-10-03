import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BookCards from '../bookcards';
import { FaBookmark } from "react-icons/fa";

export const Favourites = () => {

  const [favouritesBooks,setFavouritesBooks] = useState("")

  const headers = {
    id:localStorage.getItem("id"),
    authorization:localStorage.getItem("accessToken"),

  }

   useEffect(() => {
      const fetch = async () => {
        const response = await axios.get(
          "http://localhost:4000/get-favourite",{headers}
        );
        setFavouritesBooks(response.data.data);
      };
      fetch();
    }, [favouritesBooks]);
  
  
  return (
    <>
    {favouritesBooks.length === 0 && (
      <div className="text-5xl font-semibold text-zinc-500 h-[100%] flex items-center justify-center  w-full">
        No Favourite Books
        <FaBookmark className="mx-2 mt-4"/>
        </div>
    )}

      <div className='lg:grid grid-cols-4 gap-4 md:flex-row '>
      {favouritesBooks && 
      favouritesBooks.map((items,i) => (
        <div key={i}>
        <BookCards data={items} favourite={true} />
        </div>
      )) }
    </div>
    </>

  )
}
