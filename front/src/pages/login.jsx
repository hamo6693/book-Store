import axios from "axios";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const submit = async () => {
    const loginform = { email, password };
    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        loginform
      );
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("role", response.data.role);
      alert(response.data.message);
      //Navigate("/login");
      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.role));
      Navigate("/profile");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="h-full pb-21 bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Sign Up</p>
        <div className="mt-4">
          <div className="mt-4">
            <label className="text-zinc-400">Email</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="text-zinc-400">Password</label>
            <input
              type="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <button
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:text-blue-100"
              onClick={submit}
            >
              Login
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            or
          </p>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            Dont have an account ? &nbsp;
            <Link to="/login" className=" hover:text-blue-500">
              <u>SignUp</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
