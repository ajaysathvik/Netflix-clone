import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
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
            Login
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
                type="password"
                className="w-full px-3 py-2 mt-1 border rounded-lg bg-transparent border-gray-700 text-white focus:outline-none focus:ring"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="w-full py-2 my-5 text-white font-semibold bg-red-600 rounded-lg hover:bg-red-700">
              Login
            </button>
          </form>
          <div className="text-center text-zinc-200">
            {" "}
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-red-600 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
