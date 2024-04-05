import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/login.module.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showPasswordWarning, setShowPasswordWarning] = useState(false);
  const router = useRouter();

  const checkMyStatus = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // Process the data received
        console.log(data);
        setUserStatus(data.sub);
      } else {
        // Handle errors
        console.error("Failed to fetch user information");
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        // Handle successful signup
        // For example, redirect to another page
        router.push("/login");
      } else {
        const data = await response.json();
        // Handle signup failure
        setError(data.msg);
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const checkUsername = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/checkUsername?username=${username}`
      );
      if (response.ok) {
        const data = await response.json();
        setIsUsernameAvailable(data.msg === "Username available");
      } else {
        const data = await response.json();
        setIsUsernameAvailable(false);
        setError(data.msg);
      }
    } catch (error) {
      console.error("Error checking username:", error);
    }
  };

  useEffect(() => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const isValid = passwordRegex.test(password);
    setIsPasswordValid(isValid);
    setShowPasswordWarning(password.length > 0 && !isValid);
  }, [password]);

  useEffect(() => {
    if (username.trim() !== "") {
      checkUsername();
    } else {
      setIsUsernameAvailable(false);
    }
  }, [username]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative">
        <Link href="/login">
          <button className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
        </Link>
        <form
          onSubmit={handleSignup}
          className="space-y-3 rounded-md bg-white p-8 shadow-xl lg:p-16 border border-gray-100" // Increase padding here
        >
          <h1 className="text-xl font-semibold lg:text-2xl">Sign Up</h1>
          <p className="pb-4 text-gray-500">Create a new account</p>
          <div>
            <label htmlFor="username"> Username </label>
            <div className="flex flex-col mt-2">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-14 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
              />
              {username.trim() !== "" && !isUsernameAvailable && (
                <div className="text-red-500">Username is already taken</div>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="password"> Password </label>
            <div className="flex flex-col mt-2">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
              />
              {showPasswordWarning ? (
                <div className="text-red-500 text-wrap">
                  Password must be at least 8 characters long, contain at least one
                  number, one symbol, and one letter.
                </div>
              ) : (
                <div className="text-red-500 text-wrap text-sm" style={{ visibility: 'hidden' }}>
                  Password must be at least 8 characters long, contain at least one
                  number, one symbol, and one letter.
                </div>
              )}
            </div>
          </div>
          {/* {error && <div className="text-red-500">{error}</div>} */}
          <div>
            <button
              type="submit"
              className={`mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white outline-none focus:ring ${(!isUsernameAvailable || !isPasswordValid) ? 'opacity-50' : ''}`}
              disabled={!isUsernameAvailable || !isPasswordValid}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}