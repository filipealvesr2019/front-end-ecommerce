import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useAuth } from "../context/AuthContext";
import IconToggle from "./IconToggle";
import "./NewArrivals.css"
const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { logout, loggedIn } = useAuth(); // Obtendo o userId do contexto de autenticação
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/products/new-arrivals?page=${currentPage}`
        );
        const data = await response.json();
        console.log("Data from server:", data);
        setNewArrivals(data.newArrivals);
        setTotalProducts(data.totalProducts);
      } catch (error) {
        console.error("Erro ao buscar resultados de pesquisa:", error);
      }
    };

    fetchSearchResults();
  }, [currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };


  return (
    <div>
      <Header />
      <Navbar />

      <div style={{ marginTop: "10rem" }}>
        <ul
          className="ulContainer"
        >
          {newArrivals.map((product) => (
            <>
            <li key={product._id} className="liContainer">
  <div className="IconToggleContainer">
    <IconToggle productId={product._id} />
  </div>
  <Link to={`/products/${product._id}`} className="LinkContainer">
    {product.variations &&
      product.variations[0] &&
      product.variations[0].urls && (
        <img
          src={product.variations[0].urls[0]}
          alt=""
          className="IMGContainer"
        />
      )}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span
        style={{
          fontSize: "1rem",
          fontWeight: "700",
          fontFamily: "poppins, sans-serif",
        }}
      >
        R$ {product.variations[0].sizes[0].price &&
          product.variations[0].sizes[0].price}
      </span>
      <span
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          width: "15vw",
          color: "rgb(114, 114, 114)",
          fontSize: ".8rem",
        }}
      >
        {product.name}
      </span>
    </div>
  </Link>
</li>


            </>
          ))}

        </ul>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(totalProducts / 10)}
              variant="outlined"
              color="primary"
              size="large"
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </div>
      </div>

    </div>
  );
};

export default NewArrivals;
