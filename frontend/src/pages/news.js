import Navbar from "./components/Navbar";
import NewsElement from "./components/NewsElement";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./../styles/news.module.css";
import Chatbot from "./components/ChatBot";
import Link from "next/link";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState(null);
  const [summary, setSummary] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [userIdentity, setUserIdentity] = useState("");
  const [userSub, setUserSub] = useState("");

  const itemsPerPage = 15;

  useEffect(() => {
    const url = "http://127.0.0.1:5000/api/news";
    const getNews = async () => {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      const data = response.data;

      let formattedData = [];

      if (Array.isArray(data)) {
        formattedData = data.map((item) => ({
          title: item.title,
          url: item.url,
          time: item.publishTime,
        }));
      } else {
        formattedData = [
          {
            title: data.title,
            url: data.url,
            time: data.publishTime,
          },
        ];
      }

      console.log(formattedData);
      setNews(formattedData);
    };

    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        if (response.data.identity) {
          setUserIdentity(response.data.identity);
          setUserSub(response.data.sub);
          console.log(response.data.sub);
        } else {
          setUserIdentity("");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserIdentity("");
      }
    };

    fetchUserData();

    getNews();
    setLoading(false);
  }, []);

  const totalPages = Math.ceil(news.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
    window.scrollTo(0, 0);
  };

  const handleNewsClick = async (newsItem) => {
    setSelectedNews(newsItem);
    setIsLoadingSummary(true);

    if (userSub !== "pro") {
      return;
    }

    try {
      // Get summary
      const summaryResponse = await axios.post(
        "http://127.0.0.1:5000/api/news/summary",
        {
          url: newsItem.url,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      setSummary(summaryResponse.data.summary);

      // Get sentiment
      const sentimentResponse = await axios.post(
        "http://127.0.0.1:5000/api/news/sentiment",
        {
          title: newsItem.title,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      setSentiment(sentimentResponse.data.sentiment);
    } catch (error) {
      console.error("Error fetching summary and sentiment:", error);
    } finally {
      setIsLoadingSummary(false);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      {/* <div className="flex justify-center items-center pt-16">
        <h1 className="text-5xl text-gray-100 font-bold mt-12 mb-4 tracking-wide">
          News
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-gray-300 text-xl mb-8">
          The latest news from the crypto world
        </p>
      </div> */}
      <div className="flex justify-center items-start pt-[10rem]">
        <div className="grid grid-cols-1 md:grid-cols-2 mt-30 gap-8">
          <div>
            <h2 className="text-gray-100 text-2xl mb-4 ml-4">Headlines</h2>
            {news
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((newsItem, index) => (
                <NewsElement
                  key={index}
                  text={newsItem.title}
                  url={newsItem.url}
                  time={newsItem.time}
                  sub={userSub}
                  onClick={() => handleNewsClick(newsItem)}
                />
              ))}
          </div>
          <div className="">
            <h2 className="text-gray-100 sticky top-[5rem] text-2xl mb-4">
              News Details
            </h2>
            {userSub === "pro" ? (
              selectedNews ? (
                isLoadingSummary ? (
                  <div className="flex  justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-300"></div>
                  </div>
                ) : (
                  <div className="sticky top-[7.5rem]">
                    <h3 className="text-gray-100 text-xl mb-2">
                      {selectedNews.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{summary}</p>
                    <p className="text-gray-300 mb-4">Sentiment: {sentiment}</p>
                    <a
                      href={selectedNews.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Source
                    </a>
                  </div>
                )
              ) : (
                <div className="text-gray-300 sticky top-[7.5rem]">
                  Click on a news item to see details.
                </div>
              )
            ) : (
              <div className="sticky top-[7rem]">
                <div className="text-gray-300">
                  You need to upgrade to the Pro plan to access news details.{" "}
                </div>
                <div>
                  <Link href="/pricing">
                    <span className="text-blue-500 hover:text-blue-700 cursor-pointer">
                      Upgrade Now
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        {news.length === 0 ? (
          <div className="flex justify-center items-center mt-20">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-300"></div>
          </div>
        ) : null}
      </div>
      {news.length === 0 ? (
        <div></div>
      ) : (
        <div className="flex justify-center items-center mt-6 pb-20">
          <div className="flex gap-8 md:gap-24 justify-center items-center">
            <button
              className="text-gray-100 text-[1.2rem] border-gray-300 border-solid border-2 px-2 py-1 rounded-lg backdrop-blur hover:bg-gray-800 transition-all duration-250"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous{" "}
            </button>
            <span className="text-white text-[1.2rem]">
              {" "}
              {currentPage} of {totalPages}{" "}
            </span>
            <button
              className="text-gray-100 text-[1.2rem] border-gray-300 backdrop-blur border-solid border-2 px-4 py-1 rounded-lg hover:bg-gray-800 transition-all duration-250"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              {" "}
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
