import { useState } from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Link from 'next/link';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

const questions = [
  {
    question: "Q-1 What is the primary purpose of candlestick patterns in technical analysis?",
    options: [
      "a) Providing historical economic data",
      "b) Offering visual representations of price movements",
      "c) Predicting future market trends with algorithms",
      "d) Providing real-time market updates"
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
      <main className={`${inter.className} flex min-h-screen flex-col items-center justify-between p-24`}>
        
<div className="mb-32 w-full max-w-5xl">
  <section className="mb-12">
    <h1 className="text-5xl font-bold mb-8">Technical Analysis</h1>
    <p className="mb-6">
      Technical analysis is a methodology employed by traders and investors to analyze historical market data, primarily focusing on price and volume, with the aim of forecasting future price movements. It involves a detailed examination of various components, each playing a crucial role in understanding market dynamics and making informed trading decisions.
    </p>
  </section>

  <section className="mb-8">
    <h3 className="text-xl font-bold mb-2">Candlestick Patterns</h3>
    <ul className="list-disc pl-6 mb-8">
      <li>Candlestick patterns offer visual representations of price movements over specific time frames, such as a day, week, or month.</li>
      <li>Each candlestick displays the opening, closing, high, and low prices during that period.</li>
      <li>Common candlestick patterns include:
        <ul className="list-disc pl-6 mb-2">
          <li>Doji: Signifying market indecision when the open and close prices are nearly equal.</li>
          <li>Hammer: Indicating a potential bullish reversal, characterized by a small body and long lower shadow.</li>
          <li>Shooting Star: Suggesting a potential bearish reversal, featuring a small body and long upper shadow.</li>
        </ul>
      </li>
      <li>These patterns help traders identify potential trend reversals or continuations.</li>
    </ul>
  </section>

  <section className="mb-8">
    <h3 className="text-xl font-bold mb-2">Trend Analysis</h3>
    <ul className="list-disc pl-6 mb-8">
      <li>Trend analysis involves identifying the direction and strength of price movements over time.</li>
      <li>Traders utilize trend lines and moving averages to recognize trends, including:
        <ul className="list-disc pl-6 mb-2">
          <li>Uptrend: Prices consistently forming higher highs and higher lows.</li>
          <li>Downtrend: Prices consistently forming lower highs and lower lows.</li>
          <li>Sideways Trend: Prices moving within a horizontal range.</li>
        </ul>
      </li>
      <li>Trend analysis aids traders in determining optimal entry and exit points based on the prevailing market direction.</li>
    </ul>
  </section>

  <section className="mb-8">
    <h3 className="text-xl font-bold mb-2">Support and Resistance Levels</h3>
    <ul className="list-disc pl-6 mb-8">
      <li>Support and resistance levels are key price levels where buying and selling pressures converge.</li>
      <li>Traders use these levels to anticipate potential price reversals or breakout opportunities.</li>
      <li>Support represents areas where buying interest is strong enough to prevent prices from falling further, while resistance represents areas where selling pressure prevents prices from rising.</li>
      <li>Identifying support and resistance levels helps traders make informed decisions about entry and exit points.</li>
    </ul>
  </section>

  <section className="mb-8">
    <h3 className="text-xl font-bold mb-2">Indicators and Oscillators</h3>
    <ul className="list-disc pl-6 mb-8">
      <li>Technical indicators and oscillators are mathematical calculations applied to price and volume data to identify trends, momentum, and potential reversal points.</li>
      <li>Widely used indicators include:
        <ul className="list-disc pl-6 mb-2">
          <li>Moving Averages: Smoothing out price data to reveal underlying trends.</li>
          <li>Relative Strength Index (RSI): Measuring the magnitude of recent price changes to assess overbought or oversold conditions.</li>
          <li>MACD (Moving Average Convergence Divergence): Indicating changes in the strength, direction, momentum, and duration of a trend.</li>
        </ul>
      </li>
      <li>Traders employ these tools to confirm trends, identify entry and exit points, and manage risk effectively.</li>
    </ul>
  </section>

  <section className="mb-8">
    <h3 className="text-xl font-bold mb-2">Chart Patterns</h3>
    <ul className="list-disc pl-6 mb-8">
      <li>Chart patterns are formations that appear on price charts and indicate potential future price movements.</li>
      <li>These patterns can be categorized into:
        <ul className="list-disc pl-6 mb-2">
          <li>Reversal Patterns: Signaling potential trend reversals (e.g., head and shoulders patterns or double tops/bottoms).</li>
          <li>Continuation Patterns: Suggesting that the current trend is likely to continue (e.g., flags, triangles, or pennants).</li>
        </ul>
      </li>
      <li>By recognizing these patterns, traders can anticipate potential price movements and adjust their trading strategies accordingly.</li>
    </ul>
  </section>

  <section className="mb-12">
    <h2 className="text-5xl font-bold mb-8">Fundamental Analysis</h2>
    <p className="mb-6">
      Fundamental analysis involves evaluating the intrinsic value of a security by examining various fundamental factors, including economic indicators, financial statements, and industry trends. Here's a more detailed breakdown:
    </p>
  </section>

  <section className="mb-8">
    <h3 className="text-xl font-bold mb-2">Economic Indicators</h3>
    <ul className="list-disc pl-6 mb-8">
      <li>Economic indicators provide insights into the overall health and performance of an economy.</li>
      <li>Key indicators include:
        <ul className="list-disc pl-6 mb-2">
          <li>Gross Domestic Product (GDP): Measuring the total value of goods and services produced within a country, reflecting economic growth.</li>
          <li>Unemployment Rate: Reflecting the percentage of the labor force that is unemployed and actively seeking employment, serving as a gauge of economic health.</li>
          <li>Consumer Price Index (CPI): Tracking changes in the prices of a basket of goods and services over time, indicating inflationary pressures.</li>
        </ul>
      </li>
      <li>These indicators help traders assess the macroeconomic environment and anticipate potential market trends.</li>
    </ul>
  </section>

  <section className="mb-8">
    <h3 className="text-xl font-bold mb-2">Financial Statements</h3>
    <ul className="list-disc pl-6 mb-8">
      <li>Financial statements provide detailed information about a company's financial performance and position.</li>
      <li>Key statements include:
        <ul className="list-disc pl-6 mb-2">
          <li>Income Statement: Reporting the company's revenues, expenses, and profits over a specific period.</li>
          <li>Balance Sheet: Presenting the company's assets, liabilities, and equity at a specific point in time.</li>
          <li>Cash Flow Statement: Tracking the company's cash inflows and outflows, providing insights into its liquidity and financial health.</li>
        </ul>
      </li>
      <li>By analyzing these statements, investors can assess a company's profitability, solvency, and growth prospects.</li>
    </ul>
  </section>

  <section className="mb-12">
    <h3 className="text-5xl font-bold mb-8">Industry Analysis</h3>
    <ul className="list-disc pl-6 mb-8">
      <li>Understanding industry trends involves evaluating the performance and prospects of specific industries or sectors.</li>
      <li>Key considerations include:
        <ul className="list-disc pl-6 mb-2">
          <li>Market Trends: Identifying trends and developments within the industry, such as technological advancements, regulatory changes, and shifts in consumer preferences.</li>
          <li>Competitive Landscape: Assessing the competitive dynamics, market share, and barriers to entry within the industry.</li>
        </ul>
      </li>
      <li>Understanding industry trends and competitive forces helps investors identify investment opportunities and potential risks.</li>
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
          onClick={() => handleRouteChange('/module-1')}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Go to Module 1
        </button>
      </div>
      {isLoading && <LoadingSpinner />}
        </section>

      </main>
    </div>
  )
}
