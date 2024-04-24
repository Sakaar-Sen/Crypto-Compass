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

    const fetchUser = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/me", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCurrentPlan(data.sub);
        } else {
          const errorData = await response.json();
          console.error("Error fetching user:", errorData.msg);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [jwt]);

  const handleToggle = () => {
    setIsAnnual(!isAnnual);
  };

  const handleDowngrade = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/sub/downgrade", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("jwt", data.jwt);
        setJwt(data.jwt);
        setCurrentPlan("free");
        router.push("/explore"); 
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
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("jwt", data.jwt);
        setJwt(data.jwt);
        setCurrentPlan("pro");
        router.push("/explore"); 
      } else {
        console.error("Error upgrading:", data.msg);
      }
    } catch (error) {
      console.error("Error upgrading:", error);
    }
  };

  return (
    <div className="dark:bg-gray-800 text-white overflow-hidden">
      <div className="w-screen bg-gray-800 py-16 min-h-screen">
        <h1 className="text-center text-5xl font-bold">Pricing</h1>
        <div className="mx-auto px-3 md:max-w-screen-lg">
          <div className="mt-8">
            <div className="mb-14 flex items-center justify-center text-white">
              <div className="inline-flex items-center justify-center rounded-full border font-semibold bg-gray-700 p-2">
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
            <ul className="mb-6 space-y-3 text-white sm:space-y-0 md:grid md:grid-cols-2 md:gap-4 lg:gap-8 xl:col-span-10 xl:col-start-3">
              <li className="bg-gray-700 relative overflow-hidden rounded-lg border border-black shadow-md text-left">
                <div className="mt-8 w-full">
                  <span className="absolute top-0 block h-8 w-full bg-blue-700"></span>
                  <div className="p-5 text-center md:w-full lg:px-5 lg:py-8">
                    <h3 className="font-serif text-xl font-bold lg:text-2xl lg:leading-7">
                      Free
                    </h3>
                    <p className="mt-2 font-sans text-3xl font-bold leading-9 lg:text-5xl">
                      ₹0
                    </p>
                    <p className="mt-2 mb-4 font-sans text-base lg:text-base lg:leading-6">
                      per month
                    </p>
                    <ul className="p-5 text-center">
                      {" "}
                      <li className="flex items-center mt-2">
                      <span className="mr-2">✅</span>
                        Real-Time Prices Of Cryptocurrencies
                      </li>

                      <li className="flex items-center mt-2">
                      <span className="mr-2">✅</span>
                        Charts                       
                      </li>

                      <li className="flex items-center mt-2">
                      <span className="mr-2">✅</span>
                        7 Essential Crypto Metrics                      
                      </li>

                      <li className="flex items-center mt-2">
                      <span className="mr-2">✅</span>
                        Learning Modules + quizzes
                      </li>
                      <li className="flex items-center mt-2">
                      <span className="mr-2">✅</span>
                        Latest News Headlines
                      </li>
                    </ul>
                    <button
                      onClick={handleDowngrade}
                      disabled={currentPlan === "free"}
                      className={`mt-5 inline-flex cursor-pointer rounded-full bg-slate-500 px-8 py-2 font-sans text-sm text-white shadow-sm transition ${
                        currentPlan === "free"
                          ? "opacity-50"
                          : "hover:translate-y-1 hover:shadow-md hover:shadow-blue-200"
                      }`}
                    >
                      Get Started
                    </button>
                  </div>
                  {/* ... */}
                </div>
              </li>

              <li className="bg-gray-700 relative overflow-hidden rounded-lg border border-black shadow-md text-left">
                <div className="mt-8 w-full">
                  <span className="absolute top-0 block h-8 w-full bg-blue-700"></span>
                  <div className="p-5 text-center md:w-full lg:px-5 lg:py-8">
                    <h3 className="font-serif text-xl font-bold lg:text-2xl lg:leading-7">
                      Pro
                    </h3>
                    <p className="mt-2 font-sans text-3xl font-bold leading-9 lg:text-5xl">
                       ₹{isAnnual ? "2200" : "200"}/ user
                    </p>
                    <p className="mt-2 mb-4 font-sans text-base lg:text-base lg:leading-6">
                      per month, billed {isAnnual ? "annually" : "monthly"}
                    </p>
                    <ul className="p-5 text-center">
                      {" "}
                      <li className="flex items-center mt-2">
                         <span className="mr-2">✅</span>
                        Everything included in Free 
                      </li>

                      
                      <li className="flex items-center mt-2">
                      <span className="mr-2">✅</span>
                        Learning Chatbot
                      </li>

                      <li className="flex items-center mt-2">
                      <span className="mr-2">✅</span>
                        12 Additional Premium Crypto Metrics 
                      </li>

                      <li className="flex items-center mt-2">
                      
                      
                      <span className="mr-2">✅</span>
                        Price Predictions
                      </li>
                      <li className="flex items-center mt-2">
                      
                      <span className="mr-2">✅</span>
                        News Summarization and Sentiment Analysis
                      </li>
                    </ul>
                    <button
                      onClick={handleUpgrade}
                      disabled={currentPlan === "pro"}
                      className={`mt-5 inline-flex cursor-pointer rounded-full bg-slate-500 px-8 py-2 font-sans text-sm text-white shadow-sm transition ${
                        currentPlan === "pro"
                          ? "opacity-50"
                          : "hover:translate-y-1 hover:shadow-md hover:shadow-blue-200"
                      }`}
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
