import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const AuthScreen = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate("/signup?email=" + email);
  };

  return (
    <div className="hero-bg relative text-white">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
        <img
          src="/netflix-logo.png"
          alt="Netflx logo"
          className="w-32 md:w-52"
        />
        <Link
          to={"/login"}
          className="text-white bg-red-600 py-1 px-4 rounded-md hover:bg-red-700"
        >
          Sign In
        </Link>
      </header>

      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center h-[60vh] py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {" "}
          Unlimited movies, TV shows and more
        </h1>
        <p className="text-lg mb-4">Starts at ₹149. Cancel anytime.</p>
        <p className="mb-4">
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        <form
          className="flex flex-col md:flex-row gap-4 w-1/2"
          onSubmit={handleFormSubmit}
        >
          <input
            type="email"
            placeholder="Email address"
            className="bg-zinc-900/70 border-2 border-zinc-900 p-2 w-full md:w-96 rounded-md "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="bg-red-600 text-white p-2 mx-auto text-2xl items-center justify-center rounded-md w-full md:w-[15rem] flex flex-row">
            Get Started
            <ChevronRight className="size-8 md:size-9" />
          </button>
        </form>
      </div>
      {/* divider */}
      <div className="h-2 w-full bg-zinc-500" aria-hidden={true} />
      {/* 1st section */}
      <div className="p-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row  flex-col px-4 md:px-2 gap-10">
          {/* left side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Enjoy on your TV
            </h2>
            <p className="text-lg md:text-xl">
              Watch on smart TVs ,playStation , Xbox , Chromecast , Apple TV,
              Blu-ray players and more
            </p>
          </div>
          {/* right side */}
          <div className="flex-1 relative">
            <img src="/tv.png" alt="tv png" className="mt-4 z-20 relative" />
            <video
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      {/* divider */}
      <div className="h-2 w-full bg-zinc-500" aria-hidden={true} />
      {/* 2nd section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row  flex-col-reverse px-4 md:px-2 gap-10">
          {/* left side */}
          <div className="flex-1 ">
            <div className="relative">
              <img
                src="/stranger-things-lg.png"
                alt="strangerthings image"
                className="mt-4"
              />
              <div className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2">
                <img
                  src="/stranger-things-sm.png"
                  alt="image"
                  className="h-full"
                />
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col gap-0">
                    <span className="text-md lg:text-lg font-bold">
                      Stranger things{" "}
                    </span>
                    <span className="text-sm text-blue-500">
                      Downloading...
                    </span>
                  </div>
                  <img
                    src="/download-icon.gif"
                    alt="download icon"
                    className="h-12"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* right side */}
          <div className="flex-1 md:text-left text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
              Download your shows to watch offline.
            </h2>
            <p className="text-lg md:text-xl">
              Save your favourites easily and always have something to watch.
            </p>
          </div>
        </div>
      </div>
      {/* divider */}
      <div className="h-2 w-full bg-zinc-500" aria-hidden={true} />
      {/* 3rd section */}
      <div className="p-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row  flex-col px-4 md:px-2 gap-10">
          {/* left side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Watch everywhere
            </h2>
            <p className="text-lg md:text-xl">
              Stream unlimited movies and TV shows on your phone, tablet, laptop
              and TV.
            </p>
          </div>
          {/* right side */}
          <div className="flex-1 relative overflow-hidden">
            <img
              src="/device-pile.png"
              alt="device  png"
              className="mt-4 z-20 relative"
            />
            <video
              className="absolute top-2 left-1/2 -translate-x-1/2 h-4/6 z-10 max-w-[63%] "
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      {/* divider */}
      <div className="h-2 w-full bg-zinc-500" aria-hidden={true} />
      {/* 4th section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center flex-col md:flex-row px-4 md:px-2 gap-10">
          {/* left side */}
          <div className="flex-1 relative">
            <img src="/kids.png" alt="Enjoy on your TV" className="mt-4" />
          </div>
          {/* right side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Create profile for kids
            </h2>
            <p className="text-lg md:text-xl">
              Send kids on adventures with their favourite characters in a space
              made just for them-free with your membership
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
