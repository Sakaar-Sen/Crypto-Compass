import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
const inter = Inter({ subsets: ["latin"] });
import styles from "./../styles/Explore.module.css";
import ExploreElement from "./components/ExploreElement";

export default function Explore() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Navbar />
      <div className="p-12">
        <div className="flex justify-center items-center">
          <h1 className="text-5xl text-white text-center font-bold mt-12 mb-4 tracking-wide">
            Explore
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-white text-center text-xl mb-8">
            The most popular cryptocurrencies at your fingertips!
          </p>
        </div>
        <ExploreElement />
      </div>
    </div>
  );
}
