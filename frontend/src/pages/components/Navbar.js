"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose, AiOutlineUser } from "react-icons/ai";
import axios from "axios";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userIdentity, setUserIdentity] = useState("");

  const handleNav = () => {
    setNav(!nav);
  };

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {
    try {
      setIsLoggedIn(false);
      localStorage.removeItem("jwt");
      setUserIdentity("");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        if (response.data.identity) {
          setIsLoggedIn(true);
          setUserIdentity(response.data.identity);
        } else {
          setIsLoggedIn(false);
          setUserIdentity("");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
        setUserIdentity("");
      }
    };
  
    fetchUserData();
  }, []);

  return (
    <div className="left-0 top-0 w-full z-10 ease-in duration-30 bg-gray-900 bg-opacity-50 backdrop-blur-sm fixed">
      <div className="max-w-[1240px] m-auto flex justify-between items-center py-2 px-4 text-white">
        <Link href="/">
          <h1 className="font-bold text-2xl">Crypto Compass</h1>
        </Link>
        <ul className="hidden sm:flex items-center">
          <li className="py-2 px-4">
            <Link href="/" className="hover:text-gray-300 duration-150">
              Home
            </Link>
          </li>
          <li className="py-2 px-4">
            <Link href="/explore" className="hover:text-gray-300 duration-150">
              Explore
            </Link>
          </li>
          <li className="py-2 px-4">
            <Link href="/analytics" className="hover:text-gray-300 duration-150">
              Analytics
            </Link>
          </li>
          <li className="py-2 px-4">
            <Link href="/learn" className="hover:text-gray-300 duration-150">
              Learn
            </Link>
          </li>
          <li className="py-2 px-4">
            <Link href="/news" className="hover:text-gray-300 duration-150">
              News
            </Link>
          </li>
          {isLoggedIn ? (
            <li className="py-2 px-4 relative">
              <button
                onClick={handleDropdown}
                className="flex items-center hover:text-gray-300 duration-150"
              >
                <AiOutlineUser className="mr-2" />
                {userIdentity}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <Link
                    href="/pricing"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Change Plan
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li className="py-2 px-4">
              <Link href="/login" className="hover:text-gray-300 duration-150">
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Button */}
        <div onClick={handleNav} className="block sm:hidden z-50">
          {nav ? (
            <AiOutlineClose size={20} />
          ) : (
            <AiOutlineMenu size={20} />
          )}
        </div>
        {/* Mobile Menu */}
        <div
          className={
            nav
              ? "sm:hidden absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
              : "sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
          }
        >
          <ul>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500 z-10"
            >
              <Link href="/">Home</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/explore">Explore</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/analytics">Analytics</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/learn">Learn</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/news">News</Link>
            </li>
            {isLoggedIn ? (
              <li
                onClick={handleNav}
                className="p-4 text-4xl hover:text-gray-500"
              >
                <Link href="/pricing">Change Plan</Link>
              </li>
            ) : (
              <li
                onClick={handleNav}
                className="p-4 text-4xl hover:text-gray-500"
              >
                <Link href="/login">Login</Link>
              </li>
            )}
            {isLoggedIn && (
              <li
                onClick={handleLogout}
                className="p-4 text-4xl hover:text-gray-500"
              >
                Logout
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;