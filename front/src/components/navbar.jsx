import { Link, Links } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";

function Navbar() {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All-books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];

  const [mobileNav,setMobileNav] = useState("hidden")

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  const role = useSelector(state => state.auth.role)
  console.log(isLoggedIn);
  console.log(role);

  if(isLoggedIn === false){
    links.splice(2,5)
  }
  if(isLoggedIn == true && role === "user"){
    links.splice(4,1)
  }

  if(isLoggedIn == true && role === "admin"){
    links.splice(3,1)
  }
  
  return (
    <>
      <nav className=" z-50 relative flex bg-zinc-800 text-white px-8 py-2 items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">BookHeaven</h1>
        </div>
        <div className="nav-links-bookheaven block md:flex items-center gap-4">
          <div className=" hidden md:flex gap-4">
          {links.map((item, i) => (
            <div className=" flex items-center justify-center" key={i}>

            {item.title === "Profile" || item.title === "Admin Profile" ? ( <Link
            to={item.link}
            key={i}
            className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 "
          >
            {item.title}
            
          </Link>
            ):(
          <Link
          to={item.link}
          key={i}
          className="hover:text-blue-500 transition-all duration-300"
        >
          {item.title}
          {""}
        </Link>
          )}

            </div>

          ))}
          </div>
        
          {isLoggedIn === false && 
          
            <div className=" hidden md:flex gap-4">
               <Link
              to="/singup"
              className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 cursor-pointer"
            >
              SingUp
            </Link>
            <Link
              to="/login"
              className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 cursor-pointer">
              SingIn
            </Link>
            </div>
          
          }
          <button className=" block md:hidden text-white text-2xl hover:text-zinc-400" 
          onClick={()=> mobileNav === "hidden" ?
           setMobileNav("block")
           :setMobileNav("hidden")}>
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div 
      className={`${mobileNav} bg-zinc-800 h-screen absolute top-6 left-0 w-full z-40 flex flex-col items-center justify-center`}>
        {links.map((item, i) => (
          <Link
            to={item.link}
            key={i}
            className={`${mobileNav} hover:text-blue-500 mb-8 transition-all duration-300 text-white text-4xl font-semibold`}
            onClick={()=> mobileNav === "hidden" ?
                setMobileNav("block")
                :setMobileNav("hidden")}
          >
            {item.title}
            {""}
          </Link>
        ))}
        
      </div>
  
    </>
  );
}

export default Navbar;
