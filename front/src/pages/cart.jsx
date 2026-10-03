import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCards from "../components/bookcards";
import { FaBookmark, FaShoppingCart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Loader } from "../components/Loader";

function Cart() {
  const [cart, setCart] = useState();
  const [total, setToatal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: localStorage.getItem("accessToken"),
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:4000/get-my-cart", {
        headers,
      });
      setCart(response.data.data);
      console.log(response.data.data);
    };
    fetch();
  }, [cart]);

  const deleteItem = async (bookid) => {
    const response = await axios.put(
      `http://localhost:4000/delete-my-cart/${bookid}`,
      {},
      { headers }
    );
    alert(response.data.message);
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      let total = 0;
      cart.map((items) => {
        total += items.price;
      });
      setToatal(total);
    }
  }, [cart]);

  const placeOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/place-order",
        { order: cart },
        { headers }
      );
      alert(response.data.message);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-zinc-900 px-12 py-8 h-screen ">
      {!cart && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {cart && cart.length === 0 && (
        <div className="h-screen">
          <div className=" h-[100%] flex items-center justify-center flex-col">
            <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
              Empty Card{" "}
            </h1>
            <FaShoppingCart className="mt-7 text-8xl text-zinc-400 " />
          </div>
        </div>
      )}

      {cart && cart.length > 0 && (
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            Your Cart
          </h1>
          {cart.map((item, i) => (
            <div
              key={i}
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 items-center justify-between"
            >
              <img
                src={`http://localhost:4000/images/${item.url}`}
                className="h-[20vh] md:h-[10vh] object-cover"
              />
              <div className="w-full md:w-auto">
                <h1 className="text-zinc-100 text-2xl font-semibold text-start mt-2 md:mt-0">
                  {item.title}
                </h1>

                <p className=" text-zinc-300 mt-2 hidden lg:block">
                  {item.desc.slice(0, 100)}...
                </p>
              </div>
              <div className="flex mt-4  md:w-auto w-full items-center justify-between">
                <h2 className="text-zinc-100 text-3xl font-semibold">
                  {item.price}$
                </h2>
                <button
                  className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                  onClick={() => deleteItem(item._id)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      {cart && cart.length > 0 && (
        <div className="mt-4 w-full flex items-center justify-end">
          <div className="p-4 bg-zinc-800 rounded">
            <h1 className="text-3xl text-zinc-200 font-semibold">
              Total Amount
            </h1>

            <div className=" mt-3 flex items-center justify-between text-xl text-zinc-200">
              <h2>{cart.length} Books</h2> <h2>${total}</h2>
            </div>

            <div className="w-[100%] mt-3">
              <button
                className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200 cursor-pointer"
                onClick={placeOrder}
              >
                Place Your Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Cart;
