import React, { useState, useEffect, useRef } from "react";
import "./SearchInput.css";

const SearchInput = ({ placeholder, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 699);
  const [isMobileInputOpen, setIsMobileInputOpen] = useState(false);
  const searchContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 699);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsMobileInputOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    setIsMobileInputOpen((prev) => !prev);
  };

  const closeInput = () => {
    setIsMobileInputOpen(false);
  };

  return (
    <>
      {isMobile ? (
        <div className="search-container" ref={searchContainerRef}>
          <img
            src="https://i.ibb.co/By6TFwq/search-interface-symbol-1.png"
            alt="Search"
            className="search-icon"
            onClick={handleSearch}
          />
          {isMobileInputOpen && (
            <div onClick={closeInput}>
              <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="search-container">
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            src="https://i.ibb.co/RQNdWdY/search-interface-symbol-5.png"
            alt="Search"
            className="search-icon"
            onClick={handleSearch}
          />
        </div>
      )}
    </>
  );
};

export default SearchInput;
