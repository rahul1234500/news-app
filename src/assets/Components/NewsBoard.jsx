import React, { useEffect, useState } from "react";
import "./newsboard.css";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category, searchQuery }) => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    let url;

    // If search query exists, use /everything endpoint (category not supported there)
    if (searchQuery && searchQuery.trim() !== "") {
      url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        searchQuery
      )}&sortBy=popularity&language=en&pageSize=30&apiKey=${
        import.meta.env.VITE_API_KEY
      }`;
    } else {
      // Use /top-headlines endpoint with category
      url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${
        import.meta.env.VITE_API_KEY
      }`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setArticles(data.articles || []))
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setArticles([]);
      });
  }, [category, searchQuery]);
  return (
    <div>
      <h2 className="styled-heading">
        Latest <span className="">News</span>
      </h2>
      <div className="news-grid">
        {articles.map((news, index) => {
          return (
            <NewsItem
              key={index}
              title={news.title}
              description={news.description}
              src={news.urlToImage}
              url={news.url}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewsBoard;
