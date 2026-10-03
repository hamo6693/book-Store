
import './App.css'
import Home from './pages/Home'
import Navbar from './components/navbar'
import Footer from './components/footer'
import {  Routes, Route } from "react-router-dom";
import SingUp from './pages/singup';
import Login from './pages/login';
import AllBooks from './pages/allBooks';
import Cart from './pages/cart';
import Profile from './pages/profile';
import ViewBookDetails from './components/view-book-details';

import {authActions} from "./store/auth"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { Favourites } from './components/profile/favourites';
import { UserOrderHistory } from './components/profile/userOrderHistory';
import { Settings } from './components/profile/settings';
import { AllOrders } from './pages/allOrders';
import AddBook from './pages/addBook';
import UpdateBook from './pages/updateBook';

const App = () => {
  const role = useSelector(state => state.auth.role)

  const dispatch = useDispatch()

  useEffect(()=>{
    if(
      localStorage.getItem("id") &&
      localStorage.getItem("accessToken") &&
      localStorage.getItem("role")
    ){
      dispatch(authActions.login())
      dispatch(authActions.changeRole(localStorage.getItem("role")))
    }
  },[]);


  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route  path="/all-books" element={<AllBooks/>} />
        <Route  path="/singup" element={<SingUp/>} />
        <Route  path="/login" element={<Login/>} />
        <Route  path="/cart" element={<Cart/>} />

        <Route  path="/profile" element={<Profile/>}>

        {role === "user" ?  <Route index element={<Favourites/>} /> : <Route index element={<AllOrders/>} />  } 
        <Route path='/profile/orderHistory' element={<UserOrderHistory/>} />
       {role === "admin"  && <Route path='/profile/add-book' element={<AddBook/>} /> } 
        <Route path='/profile/settings' element={<Settings/>} />

        </Route>

        <Route path='view-book-details/:id' element={<ViewBookDetails/>} />
        <Route path='update-book/:id' element={<UpdateBook/>} />

      </Routes>
      <Footer/>
    </div>  
  )
}

export default App
