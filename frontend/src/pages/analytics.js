import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "./components/Navbar";
import FilterableTable from "./components/FilterableTable";

const inter = Inter({ subsets: ["latin"] });

export default function Analytics() {
  const [isFreePlan, setIsFreePlan] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });

        if (response.data.identity) {
          setIsFreePlan(response.data.sub === "free");
        } else {
          setIsFreePlan(true); // Assume free plan if no identity
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsFreePlan(true); // Assume free plan if an error occurs
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="h-max grid place-items-center bg-black min-h-screen">
      <Navbar />
      <div className="container m-5 bg-black text-[#f8fafc]">
        {isFreePlan ? (
          <div className="text-center">
            <p>
              You are currently on a free plan. To access this feature, please
              upgrade your plan.
            </p>
            <Link href="/pricing" className="text-blue-500 hover:underline">
              Upgrade Plan
            </Link>
          </div>
        ) : (
          <FilterableTable />
        )}
      </div>
    </div>
  );
}
