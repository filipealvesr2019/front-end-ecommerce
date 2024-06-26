import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log('Search Query:', searchQuery);
    navigate(`/search/product/${searchQuery}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        placeholder="Digite o nome do produto"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyPress} // Adiciona o event listener para capturar a tecla pressionada
        className={styles.inputContainer}
      />
      <img
        src='https://i.ibb.co/t4n36kx/loupe-5.png'
        onClick={handleSearch}
        className={styles.searchIcon}
        alt="Search"
      />
    </div>
  );
};

export default SearchBar;
