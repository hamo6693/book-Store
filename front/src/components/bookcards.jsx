import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL_IMAGES = "http://localhost:4000/images";
const BookCards = ({ data,favourite }) => {
  console.log(data);

  const headers = {
    id:localStorage.getItem("id"),
    authorization:localStorage.getItem("accessToken"),
    bookid:data._id

  }
  console.log(headers);
  
  const handelRemoveFavourite = async () => {
    const response = await axios.delete("http://localhost:4000/delete-favourite",{headers})
    alert(response.data.message);
    
  }
  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col ">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-zinc-800 rounded p-4 ">
          <div className="bg-zinc-900 rounded flex items-center justify-center">
            <img src={`${API_URL_IMAGES}/${data.url}`} className="h-[25vh]" />
          </div>
          <h2 className="mt-4 text-xl text-white font-semibold">{data.title}</h2>
          <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
          <p className="mt-2 text-zinc-200 font-semibold text-xl">${data.price}</p>
        
        </div>
      </Link>
      {favourite && (
          <button 
          onClick={handelRemoveFavourite}
          className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4 ">Remove from favourites
          </button>
      )}
    </div>
  );
};
export default BookCards;
