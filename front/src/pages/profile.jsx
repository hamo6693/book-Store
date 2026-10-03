import { Outlet } from "react-router-dom";
import { SideBar } from "../components/profile/sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../components/Loader";
import { MobileNav } from "../components/profile/mobileNav";

function Profile() {
  const [profile, setProfile] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: localStorage.getItem("accessToken"),
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:4000/get-user-info", {
        headers,
      });
      setProfile(response.data);
    };
    fetch();
  }, []);

  return (
    <div className=" bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row  py-8 gap-4 text-white">
      {!profile && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {profile && (
        <>
          <div className=" w-full md:w-1/6 h-auto lg:h-screen">
            <SideBar data={profile} />
            <MobileNav />
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
