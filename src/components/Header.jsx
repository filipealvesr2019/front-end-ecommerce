import React, { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import SearchBar from "./SearchBar";
import CategoriesList from "./CategoriesList";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";
import LogoutIcon from "@mui/icons-material/Logout";

import AlertComponente from "./AlertComponente";
import { useUnreadCount } from "../context/UnreadContext";
const Header = () => {
  const { cartItemCount, addToCart, removeFromCart } = useCart();
  const [localCartItemCount, setLocalCartItemCount] = useState(0);
  const userId = Cookies.get("userId"); // Obtenha o token do cookie
  const [showButton, setShowButton] = useState(false);

  const { logout, loggedIn } = useAuth(); // Obtendo o userId do contexto de autenticação
  const credentials = Cookies.get("role"); // Obtenha as credenciais do cookie
  const token = Cookies.get("token"); // Obtenha o token do cookie
  const modalRef = useRef(null);
  const [openCartModal, setOpenCartModal] = useState(false);
  const [openBellModal, setOpenBellModal] = useState(false);
  const { unreadCount } = useUnreadCount(); // Obter o estado do contexto

  useEffect(() => {
    const storedCartItemCount = localStorage.getItem("cartItemCount");
    if (storedCartItemCount !== null) {
      setLocalCartItemCount(Number(storedCartItemCount));
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      axios
        .get(`http://localhost:3001/api/cart/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Credentials: credentials,
          },
        })
        .then((response) => {
          setLocalCartItemCount(
            Math.max(response.data.cart.products.length, 0)
          );
        })
        .catch((error) => {
          console.error(
            "Erro ao obter o número de produtos no carrinho:",
            error
          );
        });
    } else {
      setLocalCartItemCount(cartItemCount);
    }
  }, [loggedIn, userId, cartItemCount]);

  useEffect(() => {
    localStorage.setItem("cartItemCount", localCartItemCount);
  }, [localCartItemCount]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        (openCartModal || openBellModal) // Só fecha se um dos modais estiver aberto
      ) {
        setOpenCartModal(false);
        setOpenBellModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openCartModal, openBellModal]); // Adicionei openCartModal e openBellModal como dependências

  const handleClickOpenModal = () => {
    setOpenCartModal(true);
  };

  const handleClickCloseModal = () => {
    setOpenCartModal(false);
  };

  const handleOpenModalAccount = () => {
    // Verifica se o tamanho e a cor estão selecionados

    handleClickOpenModal();
  };

  // modal do sino

  const handleClickOpenBellModal = () => {
    setOpenBellModal(true);
  };

  const handleClickCloseBellModal = () => {
    setOpenBellModal(false);
  };

  const handleOpenBellModal = () => {
    // Verifica se o tamanho e a cor estão selecionados

    handleClickOpenBellModal();
  };

  useEffect(() => {
    if (loggedIn) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  });

  return (
    <>
      <div className={styles.ContainerHeader}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            marginTop: "-2rem",
          }}
        >
          {/* Ícone à esquerda */}
          <i
            style={{
              position: "absolute",
              left: "2rem", // Posiciona o elemento no lado esquerdo
              zIndex: "999999",
            }}
          >
            <Link to={"/home"}>
              <img
                src="https://i.ibb.co/B3xYDzG/Logo-mediewal-1.png"
                style={{ width: "12vw" }}
              />
            </Link>
          </i>

          {/* Componente SearchBar à direita */}
          <div
            style={{
              marginRight: "1.5rem",
              marginLeft: "30rem",
              zIndex: "9999",
            }}
            className={styles.SearchBar}
          >
            <SearchBar />
          </div>

          {loggedIn === true && (
            <div>
              <div
                style={{
                  position: "absolute",
                  width: "5rem",
                  zIndex: "99999",
                  top: "5px",
                  right: "12.5rem",
                }}
              >
                <img
                  src="https://i.ibb.co/98L4Hny/bell-6.png"
                  alt=""
                  style={{ fontSize: "14rem", cursor: "pointer" }}
                  onClick={handleOpenBellModal}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "40px",
                    width: "20px",
                    height: "20px",
                    backgroundColor: "#2196f3",
                    color: "white",
                    borderRadius: "50%",
                    fontSize: "13px",
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {unreadCount}{" "}
                  {/* Substituir 0 pelo valor do estado do contexto */}
                </span>
              </div>
            </div>
          )}

          {openBellModal && loggedIn === true && (
            <div className={styles.HeaderModal}>
              <div ref={modalRef} className={styles.BellModalContent}>
                <div className={styles.FirstContainer}>
                  <h4 className={styles.h4}>Alertas</h4>
                </div>

                {showButton && (
                  <>
                    <div className={styles.scroll}>
                      <AlertComponente />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {openCartModal && loggedIn === true && (
            <div className={styles.HeaderModal}>
              <div ref={modalRef} className={styles.HeaderModalContent}>
                {showButton && (
                  <>
                    <div className={styles.FirstContainer}>
                      <h4 className={styles.h4}>Configurações</h4>
                    </div>
                    <nav className={styles.NavContainer}>
                      <ul style={{ listStyleType: "none" }}>
                        <li className={styles.li}>
                          <Link
                            to={"/perfil"}
                            style={{ textDecoration: "none" }}
                          >
                            <a
                              style={{
                                textDecoration: "none",
                                color: "rgb(108, 117, 125)",
                              }}
                            >
                              Minha Conta
                            </a>
                          </Link>
                        </li>
                        <li className={styles.li}>
                          <Link
                            to={"/orders"}
                            style={{ textDecoration: "none" }}
                          >
                            <a style={{ color: "rgb(108, 117, 125)" }}>
                              Historico de Compras
                            </a>
                          </Link>
                        </li>
                        <li className={styles.li}>
                          <Link
                            to={"/forgotPassword"}
                            style={{ textDecoration: "none" }}
                          >
                            <a style={{ color: "rgb(108, 117, 125)" }}>
                              Alterar senha
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "red",
                        position: "absolute",
                        bottom: "10px",
                        left: "10px",
                        gap: ".2rem",
                        cursor: "pointer",
                      }}
                      onClick={logout}
                    >
                      <LogoutIcon />
                      <span
                        style={{
                          fontSize: "1rem",
                          fontFamily: "poppins",
                          fontWeight: "400",
                        }}
                      >
                        Sair
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          <div className={styles.desktopContainer}>
            <Link
              to={loggedIn === true ? " " : "/perfil"}
              style={{ zIndex: "99999" }}
            >
              {" "}
              <img
                src="https://i.ibb.co/L1tX6LY/user-2.png"
                alt=""
                onClick={handleOpenModalAccount}
              />
            </Link>

            <Link
              to={"/favoritos"}
              style={{
                cursor: "pointer",
                zIndex: "99999",
              }}
            >
              <img src="https://i.ibb.co/2ZnFQfq/heart-1.png" alt="" />
            </Link>
            <Link
              to={"/cart"}
              style={{
                position: "relative",
                display: "inline-block",
                zIndex: "99999",
              }}
            >
              <img src="https://i.ibb.co/FwNpdzD/shopping-bag-1.png" alt="" />
              <span
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-10px",
                  width: "20px",
                  height: "20px",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "13px",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {loggedIn ? localCartItemCount : 0}
              </span>
            </Link>
          </div>
        </div>
        <div className={styles.MobileHeader}>
          <Link
            to={"/favoritos"}
            style={{
              cursor: "pointer",
            }}
          >
            <FavoriteBorderIcon style={{ fontSize: "1.8rem" }} />
          </Link>
          <Link to={"/perfil"}>
            <AccountCircleOutlinedIcon style={{ fontSize: "1.8rem" }} />
          </Link>

          <Link
            to={"/cart"}
            style={{ position: "relative", display: "inline-block" }}
          >
            <span
              style={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                width: "20px",
                height: "20px",
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                fontSize: "13px",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loggedIn ? localCartItemCount : 0}
            </span>
            <ShoppingBagOutlinedIcon style={{ fontSize: "1.8rem" }} />
          </Link>
        </div>
        <div
          style={{
            marginTop: "-10rem",
            zIndex: 1, // Define o z-index para 1
            position: "absolute",
          }}
        >
          <CategoriesList />
        </div>
      </div>
    </>
  );
};

export default Header;
