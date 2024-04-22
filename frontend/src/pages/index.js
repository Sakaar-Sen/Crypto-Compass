import Image from "next/image";
import Login from "./login";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import styles from "./../styles/homepage.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <div className={styles.container}>
        <div className="flex-row">
          <div className="flex center items-center flex-col-reverse gap-6 md:flex-row md:gap-32">
            <div className="text-white flex-column align-middle text-center center">
              <p
                className="text-white text-5xl md:text-8xl font-bold tracking-[.3rem]"
                style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.7)" }}
              >
                Crypto Compass
              </p>
              <p className="text-[1.2rem] md:text-[1.2rem] mt-6 mb-6 tracking-[.1rem]">
                Tracking over <span className="font-semibold">100+</span>{" "}
                cryptocurrencies using <span className="font-semibold">15+</span>{" "}
                unique metrics
              </p>
              <div className="flex center items-center justify-center gap-12">
                <a
                  className="px-8 py-3 rounded-md bg-black text-white border-2 border-white border-solid hover:bg-white hover:text-black font-bold tracking-wide duration-200 transition-all cursor-pointer"
                  href="/login"
                >
                  Get Started
                </a>
              </div>
            </div>
            <Image src="/btcimage.jpg" width={400} height={400} style={{
              rotate: "-20deg",
            }} alt="btc" />
          </div>
        </div>
      </div>
    </div>
  );
}