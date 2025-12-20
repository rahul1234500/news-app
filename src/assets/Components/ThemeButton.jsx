import React, { useState, useEffect } from "react";
import "./themebutton.css";
import themebtn_1 from "../image/idea.svg";
import themebtn_2 from "../image/idea_1.svg";
const ThemeButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      // Switch to light mode
      setIsDarkMode(false);
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      // Switch to dark mode
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <button
      className="theme-btn-fixed"
      onClick={toggleTheme}
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle theme"
    >
      <img
        src={isDarkMode ? themebtn_1 : themebtn_2}
        alt="Theme toggle"
        className="theme-icon-fixed"
      />
    </button>
  );
};

export default ThemeButton;
