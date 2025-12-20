import React, { useState, useEffect } from "react";

const Navbar = ({ setCategory, setSearchQuery }) => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const trendingKeywords = [
    "AI",
    "Bitcoin",
    "Elon Musk",
    "IPL",
    "Stock Market",
    "Technology",
    "Space",
    "Climate",
  ];

  // Load search history from localStorage
  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (storedHistory.length > 0) {
      setSearchHistory(storedHistory);
    }
  }, []);

  // Handle input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Filter trending keywords based on input
    const filtered = trendingKeywords.filter((keyword) =>
      keyword.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered);
    setShowSuggestions(true);
  };

  // Handle search submission
  const handleSearch = (query) => {
    const searchQuery = query || searchInput;
    if (searchQuery.trim() === "") return;

    // Add to search history
    const updatedHistory = [
      searchQuery,
      ...searchHistory.filter((item) => item !== searchQuery),
    ].slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

    // Pass search query to parent component (category will be used with search)
    setSearchQuery(searchQuery);

    // Clear input and suggestions
    setSearchInput("");
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion);
    handleSearch(suggestion);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a
            className="navbar-brand fw-bold"
            href="#"
            style={{ fontSize: "1.5rem" }}
          >
            <span
              className="badge bg-danger me-2"
              style={{ padding: "0.5rem 0.75rem", fontSize: "0.9rem" }}
            >
              NewsVila
            </span>
            <span style={{ color: "#fff" }}>News App</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <div
                  className="nav-link"
                  onClick={() => setCategory("technology")}
                  href="#"
                >
                  Technology
                </div>
              </li>
              <li className="nav-item">
                <div
                  className="nav-link"
                  onClick={() => setCategory("business")}
                  href="#"
                >
                  Business
                </div>
              </li>
              <li className="nav-item">
                <div
                  className="nav-link"
                  onClick={() => setCategory("health")}
                  href="#"
                >
                  Health
                </div>
              </li>
              <li className="nav-item">
                <div
                  className="nav-link"
                  onClick={() => setCategory("science")}
                  href="#"
                >
                  Science
                </div>
              </li>
              <li className="nav-item">
                <div
                  className="nav-link"
                  onClick={() => setCategory("sports")}
                  href="#"
                >
                  Sports
                </div>
              </li>
              <li className="nav-item">
                <div
                  className="nav-link"
                  onClick={() => setCategory("entertainment")}
                  href="#"
                >
                  Entertainment
                </div>
              </li>
            </ul>
            <div className="position-relative" style={{ width: "300px" }}>
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search news..."
                  aria-label="Search"
                  value={searchInput}
                  onChange={handleSearchChange}
                  onFocus={() => setShowSuggestions(true)}
                />
                <button
                  className="btn btn-outline-success"
                  type="button"
                  onClick={() => handleSearch()}
                >
                  Search
                </button>
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && (
                <div
                  className="position-absolute bg-dark border border-secondary rounded mt-1"
                  style={{
                    width: "280px",
                    maxHeight: "300px",
                    overflowY: "auto",
                    zIndex: 1000,
                    left: 0,
                    top: "100%",
                  }}
                >
                  {/* Trending Keywords */}
                  {searchInput.trim() === "" && (
                    <>
                      <div className="px-3 py-2 text-muted small border-bottom">
                        📈 Trending Keywords
                      </div>
                      {trendingKeywords.map((keyword) => (
                        <div
                          key={keyword}
                          className="px-3 py-2 text-light cursor-pointer"
                          style={{
                            cursor: "pointer",
                            transition: "background-color 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#333")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "transparent")
                          }
                          onClick={() => handleSuggestionClick(keyword)}
                        >
                          {keyword}
                        </div>
                      ))}
                    </>
                  )}

                  {/* Search Suggestions */}
                  {searchInput.trim() !== "" && suggestions.length > 0 && (
                    <>
                      <div className="px-3 py-2 text-muted small border-bottom">
                        🔍 Suggestions
                      </div>
                      {suggestions.map((suggestion) => (
                        <div
                          key={suggestion}
                          className="px-3 py-2 text-light"
                          style={{
                            cursor: "pointer",
                            transition: "background-color 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#333")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "transparent")
                          }
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </>
                  )}

                  {/* Search History */}
                  {searchInput.trim() === "" && searchHistory.length > 0 && (
                    <>
                      <div className="px-3 py-2 text-muted small border-bottom border-top">
                        🕘 Recent Searches
                      </div>
                      {searchHistory.map((item) => (
                        <div
                          key={item}
                          className="px-3 py-2 text-light d-flex justify-content-between align-items-center"
                          style={{
                            cursor: "pointer",
                            transition: "background-color 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#333")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "transparent")
                          }
                        >
                          <span onClick={() => handleSuggestionClick(item)}>
                            {item}
                          </span>
                          <small
                            className="text-muted"
                            onClick={() => handleSuggestionClick(item)}
                          >
                            ⤴
                          </small>
                        </div>
                      ))}
                    </>
                  )}

                  {searchInput.trim() !== "" && suggestions.length === 0 && (
                    <div className="px-3 py-2 text-muted text-center small">
                      No suggestions found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
