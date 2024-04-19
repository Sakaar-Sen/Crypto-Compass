import { useState } from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Link from 'next/link';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

const questions = [
  {
    question: "Q-1 What is the primary technology underlying cryptocurrencies like Bitcoin and Ethereum?",
    options: [
      "a) Artificial Intelligence",
      "b) Blockchain",
      "c) Cloud Computing",
      "d) Quantum Computing"
    ],
    answer: "b) Blockchain",
    explanation: "Blockchain is the primary technology underlying cryptocurrencies like Bitcoin and Ethereum. It is a decentralized distributed ledger technology that records transactions across multiple computers in a secure and transparent manner. Each block in the blockchain contains a cryptographic hash of the previous block, creating a chain of blocks that cannot be altered retroactively. Blockchain ensures transparency, immutability, and security in cryptocurrency transactions."
  },
  {
    question: "Q-2 Which cryptocurrency is often referred to as 'digital gold' due to its scarcity and store of value properties?",
    options: [
      "a) Ethereum (ETH)",
      "b) Litecoin (LTC)",
      "c) Ripple (XRP)",
      "d) Bitcoin (BTC)"
    ],
    answer: "d) Bitcoin (BTC)",
    explanation: "Bitcoin is often referred to as 'digital gold' due to its scarcity and store of value properties. Similar to gold, Bitcoin has a finite supply, with only 21 million bitcoins that can ever be mined. This scarcity, combined with its decentralized nature and widespread adoption, has led many investors to view Bitcoin as a hedge against inflation and store of value."
  },
  {
    question: "Q-3 What is the purpose of setting up a cryptocurrency wallet?",
    options: [
      "a) To mine cryptocurrencies",
      "b) To trade cryptocurrencies",
      "c) To store, send, and receive cryptocurrencies securely",
      "d) To create new cryptocurrencies"
    ],
    answer: "c) To store, send, and receive cryptocurrencies securely",
    explanation: "The primary purpose of setting up a cryptocurrency wallet is to securely store, send, and receive cryptocurrencies. Cryptocurrency wallets come in various forms, including hardware wallets, software wallets, and mobile wallets. They provide users with a unique address for receiving funds and a private key for accessing and controlling their cryptocurrency holdings."
  },
  {
    question: "Q-4 Which type of cryptocurrency exchange operates without intermediaries and allows users to trade directly from their wallets?",
    options: [
      "a) Centralized Exchange (CEX)",
      "b) Over-the-Counter (OTC) Exchange",
      "c) Decentralized Exchange (DEX)",
      "d) Peer-to-Peer (P2P) Exchange"
    ],
    answer: "c) Decentralized Exchange (DEX)",
    explanation: "A Decentralized Exchange (DEX) operates without intermediaries and allows users to trade directly from their wallets. Unlike centralized exchanges (CEXs), which require users to deposit funds into exchange-controlled wallets, DEXs allow users to retain control of their funds throughout the trading process. This decentralized approach offers greater security and privacy for traders."
  },
  {
    question: "Q-5 What is one of the key risk management techniques recommended for cryptocurrency trading?",
    options: [
      "a) Using excessive leverage",
      "b) Avoiding diversification",
      "c) Setting stop-loss orders",
      "d) Holding onto assets indefinitely (HODLing)"
    ],
    answer: "c) Setting stop-loss orders",
    explanation: "Setting stop-loss orders is one of the key risk management techniques recommended for cryptocurrency trading. A stop-loss order is an instruction given to a cryptocurrency exchange to automatically sell a specific asset once its price reaches a predetermined level. This helps traders limit potential losses and protect their investment capital. By setting stop-loss orders, traders can mitigate the impact of adverse price movements and minimize their overall risk exposure."
  }
];

export default function Module1() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(false); // Define isLoading state
    const router = useRouter(); // Initialize the router object
  
  
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
    };
  
    const handleNextQuestion = () => {
      if (!selectedOption) {
        alert("Please select an option before proceeding to the next question.");
        return;
      }
      setSelectedOption(null);
      setShowAnswer(false);
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    };
  
    const handlePreviousQuestion = () => {
      setSelectedOption(null);
      setShowAnswer(false);
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    };
  
    const handleShowAnswer = () => {
      setShowAnswer(true);
      // Check if the selected option matches the correct answer
      const isCorrect = selectedOption === questions[currentQuestion].answer;
      setSelectedOption({ ...selectedOption, isCorrect }); // Add isCorrect property to the selected option
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }
    };
    
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
    
  
  

  return (
    <div className="bg-black text-white">
      <Navbar />
      <main className={`${inter.className} flex min-h-screen flex-col items-center justify-between p-24`}>
        
      <div className="mb-32 w-full max-w-5xl">
          <section className="mb-12">
            <h2 className="text-5xl font-bold mb-4">Introduction to Cryptocurrency</h2>
            <p className="mb-6">
              Cryptocurrency is a digital or virtual currency that uses cryptography for security and operates on a decentralized network called blockchain. Here's a deeper look:
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">Blockchain Technology</h2>
            <p>
              Blockchain is a distributed ledger technology that records transactions across multiple computers in a secure and transparent manner. Each block in the blockchain contains a cryptographic hash of the previous block, creating a chain of blocks that cannot be altered retroactively. This decentralized and tamper-proof nature of blockchain ensures transparency, immutability, and security.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">Key Terminology</h2>
            <p className="mb-4">
              Understanding key cryptocurrency terminology is essential for navigating the crypto space effectively. Some crucial terms include:
            </p>
            <ul className="list-disc pl-6 mb-8">
              <li>Decentralization: The distribution of control and decision-making across a network of participants, rather than a single central authority.</li>
              <li>Digital Wallets: Software or hardware tools used to store, send, and receive cryptocurrencies securely.</li>
              <li>Private Keys: Cryptographic keys that enable users to access and control their cryptocurrency holdings.</li>
              <li>Public Addresses: Unique identifiers used to send and receive cryptocurrencies on the blockchain.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-5xl font-bold mb-4">Popular Cryptocurrencies</h2>
            <p className="mb-4">
              Let's explore some of the most well-known cryptocurrencies and their characteristics:
            </p>
            <div className="mb-8">
              <h4 className="text-xl font-bold mb-2">Bitcoin (BTC)</h4>
              <p>
                Bitcoin is the first and most widely recognized cryptocurrency, introduced by an anonymous person or group of people using the pseudonym Satoshi Nakamoto in 2009. Bitcoin operates on a decentralized network and is often referred to as digital gold due to its scarcity and store of value properties.
              </p>
            </div>
            <div className="mb-8">
              <h4 className="text-xl font-bold mb-2">Ethereum (ETH)</h4>
              <p>
                Ethereum is a decentralized platform that enables the creation of smart contracts and decentralized applications (DApps). Unlike Bitcoin, which primarily functions as digital currency, Ethereum's blockchain allows developers to build and deploy programmable contracts and applications.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Altcoins</h4>
              <p>
                Altcoins refer to alternative cryptocurrencies other than Bitcoin. These include cryptocurrencies such as Ripple (XRP), Litecoin (LTC), Cardano (ADA), and many others. Altcoins often offer unique features, use cases, and technological innovations beyond Bitcoin's capabilities.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-5xl font-bold mb-4">Getting Started</h2>
            <p className="mb-4">
              Here's how you can get started with cryptocurrency:
            </p>
            <div className="mb-8">
              <h4 className="text-xl font-bold mb-2">Setting Up a Wallet</h4>
              <p>
                Choose a cryptocurrency wallet that meets your needs, considering factors such as security, convenience, and supported currencies. Wallet options include hardware wallets (e.g., Ledger Nano S), software wallets (e.g., Electrum), and mobile wallets (e.g., Trust Wallet).
              </p>
            </div>
            <div className="mb-8">
              <h4 className="text-xl font-bold mb-2">Buying Cryptocurrency</h4>
              <p>
                To acquire cryptocurrency, you can use cryptocurrency exchanges or peer-to-peer (P2P) platforms. Research different exchanges, verify their security measures and supported cryptocurrencies, and choose one that aligns with your preferences. Popular exchanges include Coinbase, Binance, and Kraken.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Security Practices</h4>
              <p className="mb-4">
                Protect your cryptocurrency holdings by implementing robust security practices, such as:
              </p>
              <ul className="list-disc pl-6">
                <li>Generating strong, unique passwords for your wallets and accounts.</li>
                <li>Enabling two-factor authentication (2FA) wherever possible to add an extra layer of security.</li>
                <li>Backing up your wallet's recovery phrase or private keys in a secure location.</li>
              </ul>
            </div>
          </section>


        </div>

        {/* Quiz Section */}
        <section className="mb-12 w-full max-w-5xl">
          <h2 className="text-5xl font-bold mb-4">Quiz</h2>
          <p className="text-lg mb-4">Test your knowledge with the following questions:</p>
          {currentQuestion < questions.length && (
            <div className="bg-gray-800 rounded-md p-6">
                <div className="mb-4">
                  <div className="h-4 bg-gray-600 rounded-full">
                    <div
                      className="h-4 bg-blue-500 rounded-full"
                      style={{
                        width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              <p className="mb-4 text-xl">{questions[currentQuestion].question}</p>
              <ul className=" pl-6 mb-8">
                {questions[currentQuestion].options.map((option, index) => (
                  <li key={index} className="mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="option"
                        value={option}
                        onChange={() => handleOptionSelect(option)}
                        checked={selectedOption === option}
                        className="mr-2"
                      />
                      <span>{option}</span>
                    </label>
                  </li>
                ))}
              </ul>
              {selectedOption && (
                <button onClick={handleShowAnswer} className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
              )}
                {showAnswer && (
  <div className="mt-4">
    <p className={selectedOption.isCorrect ? "text-green-500 font-bold mb-2" : "text-red-500 font-bold mb-2"}>
      {selectedOption.isCorrect ? "Your answer is correct!" : "Your answer is incorrect!"}
    </p>
    <p className="text-green-500 font-bold mb-2">Correct Answer:</p>
    <p className="mb-2">{questions[currentQuestion].answer}</p>
    <p className="text-green-500 font-bold mb-2">Explanation:</p>
    <p>{questions[currentQuestion].explanation}</p>
    <div className="flex justify-between mt-8">
      {currentQuestion > 0 && (
        <button onClick={handlePreviousQuestion} className="bg-blue-500 text-white py-2 px-4 rounded mr-auto">Previous Question</button>
      )}
      {currentQuestion < questions.length - 1 && (
        <button onClick={handleNextQuestion} className="bg-blue-500 text-white py-2 px-4 rounded ml-auto">Next Question</button>
      )}
    </div>
    {currentQuestion === questions.length - 1 && (
      <div className="bg-gray-800 rounded-md p-6 mt-8">
        <h2 className="text-3xl font-bold mb-4">Quiz Completed</h2>
        <p className="mb-4">Your final score is: {score} out of {questions.length}</p>
        <button
          onClick={() => {
            setCurrentQuestion(0);
            setScore(0);
            setSelectedOption(null);
            setShowAnswer(false);
          }}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Retake Quiz
        </button>
      </div>
    )}
  </div>
)}


            </div>
          )}
          <div className="fixed bottom-8 right-8">
        <button
          onClick={() => handleRouteChange('/module-2')}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Go to Module 2
        </button>
        {isLoading && <LoadingSpinner />}
      </div>
      <div className="fixed top-16 left-8">
        <button
          onClick={() => handleRouteChange('/learn')}
          className="bg-blue-900 text-white py-2 px-4 rounded"
        >
          Back to Learn Page
        </button>
        {isLoading && <LoadingSpinner />}
      </div>
      
        </section>

      </main>
    </div>
  )
}
