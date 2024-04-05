import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [currentPlan, setCurrentPlan] = useState("free");
  const [jwt, setJwt] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedJwt = localStorage.getItem("jwt");
    setJwt(storedJwt);
  }, []);

  const handleToggle = () => {
    setIsAnnual(!isAnnual);
  };

  const handleDowngrade = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/sub/downgrade", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("jwt", data.jwt);
        setJwt(data.jwt);
        setCurrentPlan("free");
        router.push("/");
      } else {
        console.error("Error downgrading:", data.msg);
      }
    } catch (error) {
      console.error("Error downgrading:", error);
    }
  };

  const handleUpgrade = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/sub/upgrade", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("jwt", data.jwt);
        setJwt(data.jwt);
        setCurrentPlan("pro");
        router.push("/");
      } else {
        console.error("Error upgrading:", data.msg);
      }
    } catch (error) {
      console.error("Error upgrading:", error);
    }
  };

  return (
    <div>
      <div className="w-screen bg-white py-16">
        <div className="mx-auto px-3 md:max-w-screen-lg">
          <div className="mt-8">
            <div className="mb-14 flex items-center justify-center text-gray-900">
              <div className="inline-flex items-center justify-center rounded-full border font-semibold bg-slate-100 p-2">
                <button
                  className={`inline-flex cursor-pointer items-center justify-center py-1 px-5 text-center font-sans text-sm normal-case ${
                    !isAnnual ? "rounded-full bg-sky-400 text-white" : ""
                  }`}
                  onClick={handleToggle}
                >
                  Monthly
                </button>
                <button
                  className={`inline-flex cursor-pointer items-center justify-center rounded-full py-1 px-5 text-center font-sans text-sm normal-case ${
                    isAnnual ? "bg-sky-400 text-white" : ""
                  }`}
                  onClick={handleToggle}
                >
                  Annually
                </button>
              </div>
            </div>
            <ul className="mb-6 space-y-3 text-gray-900 sm:space-y-0 md:grid md:grid-cols-2 md:gap-4 lg:gap-8 xl:col-span-10 xl:col-start-3">
              <li className="bg-white relative overflow-hidden rounded-lg border border-black shadow-md text-left">
                <div className="mt-8 w-full">
                  <span className="absolute top-0 block h-8 w-full bg-slate-500"></span>
                  <div className="p-5 text-center md:w-full lg:px-5 lg:py-8">
                    <h3 className="font-serif text-xl font-bold lg:text-2xl lg:leading-7">
                      Free
                    </h3>
                    <p className="mt-2 font-sans text-3xl font-bold leading-9 lg:text-5xl">
                      $0
                    </p>
                    <p className="mt-2 mb-4 font-sans text-base lg:text-base lg:leading-6">
                      per month
                    </p>
                    <button
                      onClick={handleDowngrade}
                      className="mt-5 inline-flex cursor-pointer rounded-full bg-slate-500 px-8 py-2 font-sans text-sm text-white shadow-sm transition hover:translate-y-1 hover:shadow-md hover:shadow-slate-200"
                    >
                      Get Started
                    </button>
                  </div>
                  {/* ... */}
                </div>
              </li>
              <li className="bg-white relative overflow-hidden rounded-lg border border-black shadow-md text-left">
                <div className="mt-8 w-full">
                  <span className="absolute top-0 block h-8 w-full bg-blue-700"></span>
                  <div className="p-5 text-center md:w-full lg:px-5 lg:py-8">
                    <h3 className="font-serif text-xl font-bold lg:text-2xl lg:leading-7">
                      Pro
                    </h3>
                    <p className="mt-2 font-sans text-3xl font-bold leading-9 lg:text-5xl">
                      ${isAnnual ? "480" : "54"}/ user
                    </p>
                    <p className="mt-2 mb-4 font-sans text-base lg:text-base lg:leading-6">
                      per month, billed {isAnnual ? "annually" : "monthly"}
                    </p>
                    <button
                      onClick={handleUpgrade}
                      className="mt-5 inline-flex cursor-pointer rounded-full bg-blue-700 px-8 py-2 font-sans text-sm text-white shadow-sm transition hover:translate-y-1 hover:shadow-md hover:shadow-blue-200"
                    >
                      Get Started
                    </button>
                  </div>
                  {/* ... */}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
