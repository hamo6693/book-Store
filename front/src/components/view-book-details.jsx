import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { Loader } from "./Loader";
import { FaEdit, FaHeart, FaShoppingCart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { useSelector } from "react-redux";

const ViewBookDetails = () => {
  const API_URL_IMAGES = "http://localhost:4000/images";
  const Navigate = useNavigate();

  const { id } = useParams();
  const [Data, setData] = useState("");

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { role } = useSelector((state) => state.auth);
  console.log(isLoggedIn, role);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:4000/get-the-book/${id}`
      );
      setData(response.data.data);
      console.log(response.data.data);
    };
    fetch();
  }, []);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: localStorage.getItem("accessToken"),
    bookid: id,
  };

  const handleFavourites = async () => {
    const response = await axios.put(
      "http://localhost:4000/favourite-book",
      {},
      { headers }
    );

    alert(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put(
      "http://localhost:4000/add-to-cart",
      {},
      { headers }
    );

    alert(response.data.message);
  };

  const handleDelete = async () => {
    const response = await axios.delete(
      "http://localhost:4000/delete-book",

      { headers }
    );
    console.log(response);

    alert(response.data.message);
    Navigate("/all-books");
  };

  
  return (
    <>
      {Data && (
        <div className=" px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8 items-start lg:flex-row">
          <div className=" w-full lg:w-3/6  ">
            {" "}
            <div className="flex flex-col lg:flex-row justify-around bg-zinc-800 p-12 rounded">
              {" "}
              <img
                src={`${API_URL_IMAGES}/${Data.url}`}
                alt="/"
                className="h-[50vh] lg:h-[70vh] md:h-[60vh]  rounded object-cover"
              />
              {isLoggedIn === true && role === "user" && (
                <div className="flex flex-col md:flex-row  lg:flex-col items-center justify-between lg:justify-start p-3 mt-4  lg:mt-0">
                  <button
                    className="bg-white rounded lg:rounded-full text-3xl  p-3 text-red-500 flex items-center justify-center "
                    onClick={handleFavourites}
                  >
                    <FaHeart />
                    <span className="ms-4 block lg:hidden">Favourites</span>
                  </button>
                  <button
                    className="text-white rounded lg:rounded-full text-3xl md:mt-0  lg:text-3xl p-3 mt-8  lg:mt-8 bg-blue-500 flex items-center justify-center"
                    onClick={handleCart}
                  >
                    <FaShoppingCart />
                    <span className="ms-4 block lg:hidden  ">Add to cart</span>
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === "admin" && (
                <div className="flex flex-row  lg:flex-col   items-center justify-between lg:justify-start p-3 mt-4 lg:mt-0">
                  <Link to={`/update-book/${id}`}
                  className="bg-white rounded md:mt-0 lg:rounded-full text-3xl  p-3 flex items-center justify-center "
                  
                  >
                    <FaEdit />
                    <span className="ms-4 block lg:hidden">Edit</span>
                  </Link>
                  <button
                    className="text-red-500 rounded lg:rounded-full text-3xl p-3 mt-0 lg:mt-8 bg-white flex items-center justify-center"
                    onClick={handleDelete}
                  >
                    <MdDelete />
                    <span className="ms-4 block lg:hidden">Delete Book</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h2 className=" text-4xl  text-zinc-300  font-semibold">
              {Data.title}
            </h2>
            <p className="mt-1 text-zinc-400 ">by {Data.author}</p>
            <p className="mt-4 text-xl text-zinc-500 ">{Data.desc}</p>
            <p className=" flex mt-4 items-center justify-start text-zinc-400 ">
              <GrLanguage className="me-2" />
              {Data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price : $ {Data.price}
            </p>
          </div>
        </div>
      )}
      {!Data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-between">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
