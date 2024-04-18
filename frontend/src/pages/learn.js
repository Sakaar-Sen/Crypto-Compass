import { useState, useEffect } from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] })

export default function Learn() {
  const [isLoading, setIsLoading] = useState(false); 
  const [userSub, setUserSub] = useState(''); 

  const router = useRouter();

  const handleRouteChange = (url) => {
    setIsLoading(true);
    router.push(url);
  };

  const LoadingSpinner = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white-500"></div>
      </div>
    );
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
          setUserSub(response.data.sub);
        } else {
          setUserSub('free');
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserSub('free');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="bg-black text-white">
      <Navbar />
      <main className={`${inter.className} flex min-h-screen flex-col items-center justify-between p-24`}>
        <div className="mb-16 w-full max-w-5xl">
          <h2 className="text-4xl font-bold mb-12">Module 1: Introduction to Cryptocurrency</h2>
          <p>
            Cryptocurrency is digital currency secured by cryptography and operates on decentralized blockchain networks. Bitcoin is the pioneer, known for its scarcity like gold. Ethereum enables smart contracts and DApps. Altcoins offer diverse features beyond Bitcoin. Getting started involves choosing a wallet, buying from exchanges, and securing assets. Trading involves centralized and decentralized exchanges, with strategies like day trading and HODLing, and risk management is crucial. Staying informed requires market analysis, community engagement, and continuous learning.
          </p>
          <Link href="/module-1" className="bg-blue-700 hover:bg-blue-900 mb-16 text-white font-bold py-2 px-4 rounded mt-4 inline-block">
            Module 1
          </Link>
          {isLoading && <LoadingSpinner />}
        </div>

        <div className="mb-16 w-full max-w-5xl">
          <h2 className="text-4xl font-bold mb-12">Module 2: Technical and Fundamental Analysis</h2>
          <p>
            Technical analysis involves studying historical market data like price and volume to predict future price movements. It includes analyzing candlestick patterns, trend direction, support/resistance levels, and using indicators to confirm trends and identify entry/exit points.
          </p>
          <p>
            Fundamental analysis evaluates a security's intrinsic value by examining economic indicators, financial statements, and industry trends. It involves understanding economic indicators, analyzing financial statements, and assessing industry trends to identify investment opportunities and risks.
          </p>
          <Link href="/module-2" className="bg-blue-700 hover:bg-blue-900 mb-16 text-white font-bold py-2 px-4 rounded mt-4 inline-block">
            Module 2
          </Link>
          {isLoading && <LoadingSpinner />}
        </div>

        <div className="mb-16 w-full max-w-5xl">
          <h2 className="text-4xl font-bold mb-12">Module 3: Technical and Fundamental Analysis</h2>
          <p>
            Module-3 delves into advanced cryptocurrency topics, including Smart Contracts, DeFi, Mining, Consensus, Privacy Coins, Tokenization, NFTs, and Scalability Solutions. It covers automation in DeFi with Smart Contracts, mining processes, privacy features, asset representation via tokenization, unique NFTs, and solutions for blockchain scalability, including Layer 2 solutions. Each topic is explored succinctly, offering insights into the complexities and innovations shaping the future of cryptocurrency and blockchain technology.
          </p>
          {userSub === 'pro' ? (
            <Link href="/module-3" className="bg-blue-700 hover:bg-blue-900 mb-16 text-white font-bold py-2 px-4 rounded mt-4 inline-block">
              Module 3
            </Link>
          ) : (
            <div>
              <p className="text-white font-bold mt-4">You need to upgrade to the Pro plan to access Module 3.</p>
              <Link href="/pricing" className="text-blue-500 hover:text-blue-700 cursor-pointer ">
                Upgrade Now
              </Link>
            </div>
          )}
          {isLoading && <LoadingSpinner />}
        </div>
      </main>
    </div>
  )
}