import { useState } from "react";
import styles from "../styles/login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userStatus, setUserStatus] = useState("");

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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // set localStorage jwt

        localStorage.setItem("jwt", data.jwt);

        // Handle successful login
        // For example, redirect to another page
      } else {
        // Handle login failure
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      <button onClick={checkMyStatus}>Check</button>
      <h1>Status: {userStatus}</h1>
      <form
        onSubmit={handleLogin}
        className="relative space-y-3 rounded-md bg-white p-6 shadow-xl lg:p-10 border border-gray-100 ml-[32rem] mr-[32rem]"
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

        {error && <div className="text-red-500">{error}</div>}

        <div>
          <button
            type="submit"
            className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white outline-none focus:ring"
          >
            Get Started
          </button>
        </div>
      </form>
    </div>
  );
}
