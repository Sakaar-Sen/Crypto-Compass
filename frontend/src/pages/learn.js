// learn.js
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Learn() {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <main className={`${inter.className} flex min-h-screen flex-col items-center justify-between p-24`}>
        <div className="mb-32 w-full max-w-5xl">
          <h2 className="text-3xl font-bold mb-4">Module 1: Introduction to Cryptocurrency</h2>
          <p>
            Cryptocurrency is digital currency secured by cryptography and operates on decentralized blockchain networks. Bitcoin is the pioneer, known for its scarcity like gold. Ethereum enables smart contracts and DApps. Altcoins offer diverse features beyond Bitcoin. Getting started involves choosing a wallet, buying from exchanges, and securing assets. Trading involves centralized and decentralized exchanges, with strategies like day trading and HODLing, and risk management is crucial. Staying informed requires market analysis, community engagement, and continuous learning.
          </p>
          <Link href="/module-1">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full mt-6 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring focus:ring-blue-400">
              Go to Module 1
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
