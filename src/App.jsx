import Navbar from "./assets/Components/Navbar";
import NewsBoard from "./assets/Components/NewsBoard";
import ThemeButton from "./assets/Components/ThemeButton";
import { useState } from "react";

function App() {
  const [category, setCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <ThemeButton />
      <Navbar setCategory={setCategory} setSearchQuery={setSearchQuery} />
      <NewsBoard category={category} searchQuery={searchQuery} />
    </>
  );
}

export default App;
