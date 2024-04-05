import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // set localStorage jwt
        localStorage.setItem("jwt", data.jwt);
        // Redirect to the home page
        router.push("/");
      } else {
        // Handle login failure
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative">
        <Link href="/">
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
          onSubmit={handleLogin}
          className="space-y-3 rounded-md bg-white p-6 shadow-xl lg:p-10 border border-gray-100"
        >
          <h1 className="text-xl font-semibold lg:text-2xl">Login</h1>
          <p className="pb-4 text-gray-500">Sign in to access your account</p>
          <div>
            <label htmlFor="username"> Username </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
            />
          </div>
          <div>
            <label htmlFor="password"> Password </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
            />
          </div>
          <div
            className="text-red-500 text-wrap text-sm"
            style={{ visibility: "hidden" }}
          >
            Password must be at least 8 characters long, contain at least one
            number, one symbol, and one letter.
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white outline-none focus:ring"
            >
              Login Now!
            </button>
            <Link
              href="/signup"
              className="mt-4 text-blue-500 hover:text-blue-700"
            >
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
