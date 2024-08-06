import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/users";
import toast from "react-hot-toast";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
    
    localStorage.setItem("user", email);
    dispatch(setUser({ email }));
    navigate("/")
  };

  return (
    <>
      <div className="h-[26px] absolute top-6 left-6 flex items-center">
        <img src={Logo} width="160" />
        <p className="text-[#B9BBC6] text-xl mt-2">News Room</p>
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-[400px]">
          <h2 className="text-black text-3xl text-left mb-6">
            Sign in to Generic Company News Room
          </h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="text-black w-full">Email Address</label>
              <input
                value={email}
                type="email"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-lightGrey rounded focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue mt-1"
              />
              <label className="text-black w-full block mt-6">Password</label>
              <input
                value={password}
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-lightGrey rounded focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue mt-1"
              />
            </div>
            <button
              type="submit"
              className="w-full h-8 bg-PurpleBlue-10 text-white rounded mt-5 cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
