import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import Profile from "../../pages/profile";
import { Loader } from "../Loader";
import { SideBar } from "./sidebar";

export const Settings = () => {
  const [address, setAddress] = useState("");
  const [formData, setFormData] = useState("");

  const headers = {
    id: localStorage.getItem("id"),
    authorization: localStorage.getItem("accessToken"),
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:4000/get-user-info", {
        headers,
      });
      console.log(response.data);
      setAddress(response.data.address);
      setFormData(response.data);
    };
    fetch();
  }, []);
  console.log(address);

  const submit = async () => {
    const data = {
      address: address,
    };

    const response = await axios.put(
      "http://localhost:4000/update-address",
      data,
      { headers }
    );
    alert(response.data.message);
  };
  return (
    <>
      {!formData && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {formData && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Setting
          </h1>

          <div className="flex gap-12">
            <div className="">
              <label>Name</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {formData.name}
              </p>
            </div>

            <div className="">
              <label>Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {formData.email}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col">
            <label>Address</label>
            <textarea
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              rows="5"
              name="address"
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-3 rounded hover:bg-yellow-400 transition-all duration-300"
              onClick={submit}
            >
              update
            </button>
          </div>
        </div>
      )}
    </>
  );
};
