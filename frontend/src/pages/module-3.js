import { useState } from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Chatbot from './components/ChatBot';

const inter = Inter({ subsets: ['latin'] });

const questions = [
  {
    question: "Q-1 What is the primary functionality of smart contracts in cryptocurrency?",
    options: [
      "a) Execute predefined actions automatically",
      "b) Secure cryptocurrency wallets",
      "c) Conduct market analysis",
      "d) Verify blockchain transactions"
    ],
    answer: "b) Offering visual representations of price movements",
    explanation: "Candlestick patterns visually represent price movements over specific time frames, aiding traders in identifying potential trend reversals or continuations."
  },
  {
    question: "Q-2 Which indicator assesses overbought or oversold conditions based on recent price changes?",
    options: [
      "a) Gross Domestic Product (GDP)",
      "b) Moving Average Convergence Divergence (MACD)",
      "c) Relative Strength Index (RSI)",
      "d) Consumer Price Index (CPI)"
    ],
    answer: "c) Relative Strength Index (RSI)",
    explanation: "The Relative Strength Index (RSI) measures recent price changes to determine overbought or oversold conditions in the market."
  },
  {
    question: "Q-3 What is the main purpose of support and resistance levels in technical analysis?",
    options: [
      "a) Tracking changes in the prices of goods and services",
      "b) Assessing the overall health and performance of an economy",
      "c) Evaluating a company's financial performance",
      "d) Identifying potential trend reversals or breakout opportunities"
    ],
    answer: "d) Identifying potential trend reversals or breakout opportunities",
    explanation: "Support and resistance levels help traders anticipate potential price reversals or breakout opportunities in the market."
  },
  {
    question: "Q-4 What role does industry analysis play in fundamental analysis?",
    options: [
      "a) Assessing a company's liquidity and financial health",
      "b) Evaluating market trends and developments",
      "c) Measuring the total value of goods and services produced within a country",
      "d) Identifying potential trend reversals or continuations"
    ],
    answer: "b) Evaluating market trends and developments",
    explanation: "Industry analysis helps investors understand market trends and developments within specific industries or sectors."
  },
  {
    question: "Q-5 How do traders use moving averages in technical analysis?",
    options: [
      "a) To measure unemployment rates",
      "b) To smooth out price data and reveal underlying trends",
      "c) To track cash flows of companies",
      "d) To indicate changes in the strength and direction of trends"
    ],
    answer: "b) To smooth out price data and reveal underlying trends",
    explanation: "Moving averages help traders identify underlying trends by smoothing out price data over specific time periods."
  }
];

export default function Module1() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Define isLoading state
    const [score, setScore] = useState(0);
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
      <Chatbot  />
      <main className={`${inter.className} flex min-h-screen flex-col items-center justify-between p-24`}>
        
      <div className="mb-32 w-full max-w-5xl">
 <section className="mb-12">
   <h1 className="text-5xl font-bold mb-8">Smart Contracts and Decentralized Finance (DeFi)</h1>
   <h3 className="text-xl font-bold mb-2">Smart Contracts</h3>
   <ul className="list-disc pl-6 mb-8">
     <li>
       <strong>Definition and Functionality:</strong> Smart contracts are self-executing contracts with terms directly written into code, automating actions based on predefined conditions.
     </li>
     <li>
       <strong>Examples and Applications:</strong> Explore real-world applications of smart contracts in decentralized finance (DeFi), including lending, borrowing, decentralized exchanges (DEXs), and automated market makers (AMMs).
     </li>
   </ul>

   <h3 className="text-xl font-bold mb-2">Decentralized Finance (DeFi)</h3>
   <ul className="list-disc pl-6 mb-8">
     <li>
       <strong>Introduction to DeFi:</strong> Understand the concept of decentralized finance and its potential to disrupt traditional financial systems.
     </li>
     <li>
       <strong>Components of DeFi:</strong> Explore various DeFi protocols and platforms, such as decentralized exchanges (DEXs), liquidity pools, yield farming, and decentralized lending/borrowing platforms.
     </li>
     <li>
       <strong>Risks and Considerations:</strong> Discuss the risks associated with DeFi, including smart contract vulnerabilities, liquidity risks, and regulatory uncertainties.
     </li>
   </ul>
 </section>

 <section className="mb-12">
   <h2 className="text-5xl font-bold mb-8">Cryptocurrency Mining and Consensus Mechanisms</h2>
   <h3 className="text-xl font-bold mb-2">Cryptocurrency Mining</h3>
   <ul className="list-disc pl-6 mb-8">
     <li>
       <strong>Mining Process Overview:</strong> Explain the process of validating transactions and adding blocks to the blockchain through mining.
     </li>
     <li>
       <strong>Mining Hardware and Software:</strong> Discuss the hardware requirements, software configurations, and energy consumption involved in cryptocurrency mining.
     </li>
     <li>
       <strong>Mining Pools and Rewards:</strong> Explore the concept of mining pools and how miners collaborate to increase their chances of earning rewards.
     </li>
   </ul>

   <h3 className="text-xl font-bold mb-2">Consensus Mechanisms</h3>
   <ul className="list-disc pl-6 mb-8">
     <li>
       <strong>Proof of Work (PoW) vs. Proof of Stake (PoS):</strong> Compare and contrast the two primary consensus mechanisms used in blockchain networks.
     </li>
     <li>
       <strong>Other Consensus Mechanisms:</strong> Introduce alternative consensus mechanisms, such as Proof of Authority (PoA), Delegated Proof of Stake (DPoS), and Byzantine Fault Tolerance (BFT).
     </li>
   </ul>
 </section>

 <section className="mb-12">
   <h2 className="text-5xl font-bold mb-8">Privacy Coins and Anonymity</h2>
   <h3 className="text-xl font-bold mb-2">Privacy Coins</h3>
   <ul className="list-disc pl-6 mb-8">
     <li>
       <strong>Definition and Characteristics:</strong> Define privacy coins and highlight their features, including ring signatures, stealth addresses, and zero-knowledge proofs.
     </li>
     <li>
       <strong>Examples and Use Cases:</strong> Explore prominent privacy coins like Monero (XMR), Zcash (ZEC), and Dash (DASH), examining their use cases and adoption.
     </li>
   </ul>

   <h3 className="text-xl font-bold mb-2">Anonymity and Privacy Techniques</h3>
   <ul className="list-disc pl-6 mb-8">
     <li>
       <strong>Cryptographic Privacy Techniques:</strong> Explain the cryptographic techniques used to achieve privacy and anonymity in blockchain transactions.
     </li>
     <li>
       <strong>Privacy Challenges and Limitations:</strong> Discuss the challenges associated with maintaining privacy in a public blockchain environment, such as network analysis and regulatory pressures.
     </li>
   </ul>
 </section>

 <section className="mb-12">
   <h2 className="text-5xl font-bold mb-8">Tokenization and Non-Fungible Tokens (NFTs)</h2>
   <h3 className="text-xl font-bold mb-2">Tokenization</h3>
   <ul className="list-disc pl-6 mb-8">
     <li>
       <strong>Asset Tokenization:</strong> Define asset tokenization and its role in representing real-world assets as digital tokens on blockchain networks.
     </li>
     <li>
       <strong>Benefits and Opportunities:</strong> Discuss the benefits of asset tokenization, including increased liquidity, fractional ownership, and automated compliance.
     </li>
   </ul>

   <h3 className="text-xl font-bold mb-2">Non-Fungible Tokens (NFTs)</h3>
   <ul className="list-disc pl-6 mb-8">
     <li>
       <strong>Definition and Characteristics:</strong> Explain the concept of non-fungible tokens (NFTs) and their unique properties, including indivisibility, authenticity, and scarcity.
     </li>
     <li>
       <strong>NFT Marketplaces and Use Cases:</strong> Explore popular NFT marketplaces, such as OpenSea and Rarible, and examine various use cases of NFTs in art, gaming, collectibles, and digital ownership.
     </li>
   </ul>
 </section>

 <section className="mb-12">
   <h2 className="text-5xl font-bold mb-8">Scalability Solutions and Layer 2 Solutions</h2>
   <h3 className="text-xl font-bold mb-2">Scalability Challenges</h3>
   <ul className="list-disc pl-6 mb-8">
     <li>
       <strong>Scalability Issues in Blockchain:</strong> Discuss the scalability challenges facing blockchain networks, such as limited transaction throughput and high fees.
     </li>
     <li>
       <strong>Scalability Solutions:</strong> Introduce various scalability solutions, including sharding, off-chain scaling, and layer 2 solutions.
     </li>
   </ul>

   <h3 className="text-xl font-bold mb-2">Layer 2 Solutions</h3>
   <ul className="list-disc pl-6 mb-8">
     <li>
       <strong>Lightning Network:</strong> Explain the concept of the Lightning Network and how it enables fast and scalable Bitcoin transactions through off-chain payment channels.
     </li>
     <li>
       <strong>Ethereum Layer 2 Solutions:</strong> Explore Layer 2 solutions for Ethereum, such as zkRollups and Optimistic Rollups, and their potential to improve Ethereum's scalability and throughput.
     </li>
   </ul>
 </section>
</div>

        {/* Quiz Section */}
        <section className="mb-8 w-full max-w-5xl">
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
          <div className="fixed bottom-8 left-8">
        <button
          onClick={() => handleRouteChange('/module-2')}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Go to Module 2
        </button>
      </div>
      {isLoading && <LoadingSpinner />}
        </section>

      </main>
    </div>
  )
}
