import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useAuth } from "../context/AuthContext";
import IconToggle from "./IconToggle";
import "./NewArrivals.css";
import NewArrivalsSkeleton from "./NewArrivalsSkeleton";
import zIndex from "@mui/material/styles/zIndex";
import { useConfig } from "../context/ConfigContext";
import { logPageView } from "../../analytics";
import { Helmet } from "react-helmet";

const NewArrivals = ({ onNewArrivalsUpdate }) => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { logout, loggedIn } = useAuth(); // Obtendo o userId do contexto de autenticação
  const [loading, setLoading] = useState(true);

  const [hoveredIndex, setHoveredIndex] = useState(-1); // -1 indica que nenhuma imagem está sendo hoverada
  const { apiUrl } = useConfig();
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        // await new Promise((resolve) => setTimeout(resolve, 10000));
        const response = await fetch(
          `${apiUrl}/api/products/new-arrivals?page=${currentPage}`
        );
        const data = await response.json();
        console.log("Data from server:", data);
        setNewArrivals(data.newArrivals);
        setTotalProducts(data.totalProducts);
        onNewArrivalsUpdate(data.newArrivals); // Atualiza o estado no componente pai

        setLoading(false); // Define loading como falso após obter os dados
      } catch (error) {
        setLoading(false); // Definir carregamento como falso após tentativa de buscar dados
        console.error("Erro ao buscar resultados de pesquisa:", error);
      }
    };

    fetchSearchResults();
  }, [currentPage, onNewArrivalsUpdate]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div>
   
      <Navbar />
      {loading ? (
        <NewArrivalsSkeleton /> // Exibir carregamento enquanto os dados não são carregados
      ) : (
        <div style={{ marginTop: "2rem" }}>
                <h1 style={{ marginBottom: "1rem",fontFamily:"poppins, sans serif", fontSize: "1.2rem ",  marginLeft:"1rem",  }}>Novidades</h1>

          <ul className="ulContainer">
            {newArrivals.map((product, index) => (
              <li key={product._id} className="liContainer">
                <div className="IconToggleContainer">
                  <IconToggle productId={product._id}  />
                </div>
                <Link to={`/products/${product.name}/${product._id}`} className="LinkContainer">
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
                        loading="lazy" // Adiciona lazy loading

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
                    <span
                    
                      className="ulContainer__name"
                    >
                      {product.name}
                    </span>
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
