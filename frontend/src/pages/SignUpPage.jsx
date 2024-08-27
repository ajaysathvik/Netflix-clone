import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/authUser.js";

const SignUPage = () => {
  const { searchParams } = new URL(document.location);
  const emailValue = searchParams.get("email");
  const [email, setEmail] = useState(emailValue || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {signup} = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ email, username, password });  
  };
  return (
    <div className="h-screen w-full hero-bg text-white">
      <header className="max-w-[90rem] mx-auto flex items-center justify-between p-5">
        <Link to="/">
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>
      <div className="flex items-center justify-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-xl shadow-md">
          <h1 className="text-2xl mb-4 font-bold text-white text-left">
            Sign Up
          </h1>
          <form action="" className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border rounded-lg bg-transparent border-gray-700 text-white focus:outline-none focus:ring"
                placeholder="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                className="w-full px-3 py-2 mt-1 border rounded-lg bg-transparent border-gray-700 text-white focus:outline-none focus:ring"
                placeholder="Username"
                id="Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                className="w-full px-3 py-2 mt-1 border rounded-lg bg-transparent border-gray-700 text-white focus:outline-none focus:ring"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="w-full py-2 my-5 text-white font-semibold bg-red-600 rounded-lg hover:bg-red-700">
              Sign Up{" "}
            </button>
          </form>
          <div className="text-center text-zinc-200">
            {" "}
            Already a Member?{" "}
            <Link to={"/login"} className="text-red-600 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUPage;
