import axios from "axios";
import React, { useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import { Link } from "react-router-dom";

export const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: localStorage.getItem("accessToken"),
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:4000/get-order-history",
        { headers }
      );
      setOrderHistory(response.data.data);
      console.log(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div>
      {!orderHistory && (
        <div className="flex items-center justify-center h-[100%]">
          <Loader />
        </div>
      )}
      {orderHistory && orderHistory.length === 0 && (
        <div className="h-[80%] p-4 text-zinc-100">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
              No Order History
            </h1>
          </div>
        </div>
      )}
      {orderHistory && orderHistory.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1>st</h1>
            </div>
            <div className="w-[22%]">
              <h1>book</h1>
            </div>
            <div className="w-[45%]">
              <h1>des</h1>
            </div>
            <div className="w-[9%]">
              <h1>price</h1>
            </div>
            <div className="w-[16%]">
              <h1>status</h1>
            </div>
            <div className=" max-w-none md:w-[5%] hidden md:block">
              <h1>mode</h1>
            </div>
          </div>

          {orderHistory.map((items, i) => (
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

              <div className="w-[45%]">
                <h1 className="">{items.book.desc.slice(0, 55)}...</h1>
              </div>

              <div className="w-[9%]">
                <h1 className="">${items.book.price}</h1>
              </div>

              <div className="w-[16%]">
                <h1 className="font-semibold text-green-500">
                  {items.status === "Order placed" ? (
                    <div className="text-yellow-500">{items.status}</div>
                  ) : items.status === "Canceled" ? (
                    <div className="text-red-500">{items.status}</div>
                  ) : (
                    items.status
                  )}
                </h1>
              </div>
              <div className="max-w-none md:w-[5%] hidden md:block">
                <h1 className="text-sm text-zinc-400">CDD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
