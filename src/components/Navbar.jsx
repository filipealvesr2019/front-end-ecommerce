// Navbar.js

import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { logPageView } from "../../analytics";
const Navbar = () => {
  const [activeLink, setActiveLink] = useState(null);

  const handleItemClick = (index) => {
    setActiveLink(index);
  };

  const isActive = (index) => {
    return index === activeLink ? "active" : "";
  };
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);

  return (
    <div className="hide">
      <div className="navbar">
        <Link to={"/"} className={`nav-item ${isActive(0)} `}>
          <img src="https://i.ibb.co/J3gLZnz/home-4.png"  alt="icone de home(inicio)"/>
          <span className="span">Home</span>
        </Link>

        <Link to={"/categoriasMobile"} className={`nav-item ${isActive(1)}`}>
          <img src="https://i.ibb.co/HqPdMws/category-1.png"  alt="icone de categorias"/>
          <span className="span">Categorias</span>
        </Link>

        <Link to={"/carrinho"} className={`nav-item ${isActive(2)}`}>
          <img src="https://i.ibb.co/RPwPY6t/shopping-bag-2.png" alt="icone do carrinho de compras"/>
          <span className="span">Carrinho</span>
        </Link>

        <Link to={"/conta"} className={`nav-item ${isActive(3)}`}>
          <AccountCircleOutlinedIcon  style={{color:"black", fontSize:"32px"}}/>
          <span className="span">Perfil</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
