import React from "react";
import "./Header.css";
import SearchInput from "./SearchInput";
import { useAtom } from 'jotai';
import { searchAtom } from "../Jotai/searchAtom";

const Header = () => {
  const [searchTerm, setSearchTerm] = useAtom(searchAtom);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  return (
    <div className="ContainerHeader">
      <h1>Logo</h1>
      <div style={{marginRight:"5rem"}}>
        {" "}
        <SearchInput placeholder="Pesquisar..." onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default Header;