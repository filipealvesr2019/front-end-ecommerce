import React, { useEffect, useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import { Link, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useAuth } from "../context/AuthContext";
import IconToggle from "./IconToggle";
import "./NewArrivals.css";
import NewArrivalsSkeleton from "./NewArrivalsSkeleton";
import CircularProgress from "@mui/material/CircularProgress"; // Importar CircularProgress
import { useConfig } from "../context/ConfigContext";
import { logPageView } from "../../analytics";
import { Helmet } from "react-helmet";

const NewArrivals = ({ onNewArrivalsUpdate }) => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { logout, loggedIn } = useAuth();
  const [loading, setLoading] = useState(true); // Inicialmente true para exibir o spinner
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const { apiUrl } = useConfig();
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true); // Define o loading como true ao iniciar a busca
      try {
        const response = await fetch(
          `${apiUrl}/api/products/new-arrivals?page=${currentPage}`
        );
        const data = await response.json();
        setNewArrivals(data.newArrivals);
        setTotalProducts(data.totalProducts);
        onNewArrivalsUpdate(data.newArrivals);

        setLoading(false); // Define loading como false após obter os dados
      } catch (error) {
        setLoading(false); // Define loading como false mesmo em caso de erro
        console.error("Erro ao buscar resultados de pesquisa:", error);
      }
    };

    fetchSearchResults();
  }, [currentPage, onNewArrivalsUpdate]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    setLoading(true); // Define o loading como true ao mudar a página
  };

  const removeAccents = (name) => {
    return name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "10rem", marginBottom:"10rem" }}>
          <CircularProgress /> {/* Spinner de loading */}
        </div>
      ) : (
        <div style={{ marginTop: "2rem" }}>
          <h1
            style={{
              marginBottom: "1rem",
              fontFamily: "poppins, sans serif",
              fontSize: "1.2rem ",
              marginLeft: "1rem",
            }}
          >
            Novidades
          </h1>

          <ul className="ulContainer">
            {newArrivals.map((product, index) => (
              <li key={product._id} className="liContainer">
                <div className="IconToggleContainer">
                  <IconToggle productId={product._id} />
                </div>
                <Link
                  to={`/products/${removeAccents(product.name)}/${product._id}`}
                  className="LinkContainer"
                >
                  {product.variations &&
                    product.variations[0] &&
                    product.variations[0].urls && (
                      <img
                        src={
                          product.variations[0].urls.length > 1
                            ? hoveredIndex === index
                              ? product.variations[0].urls[1]
                              : product.variations[0].urls[0]
                            : product.variations[0].urls[0]
                        }
                        alt={product.name}
                        className="IMGContainer"
                        onMouseEnter={() =>
                          product.variations[0].urls.length > 1 &&
                          setHoveredIndex(index)
                        }
                        onMouseLeave={() =>
                          product.variations[0].urls.length > 1 &&
                          setHoveredIndex(-1)
                        }
                        loading="lazy"
                      />
                    )}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "700",
                        fontFamily: "poppins, sans-serif",
                      }}
                    >
                      R$ {product.variations[0].sizes[0].price}
                    </span>
                    <span className="ulContainer__name">{product.name}</span>
                  </div>
                </Link>
              </li>
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
      )}
    </div>
  );
};

export default NewArrivals;
