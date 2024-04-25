import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // Importe o Link do React Router
import Header from "./Header";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";
import axios from "axios";

import ImageComponent from "./ImageComponent";
import CircularIndeterminate from "./CircularIndeterminate";

const AllOrderDetails = () => {
  const userId = Cookies.get("userId");
  const { logout, loggedIn } = useAuth();
  const [boletos, setBoletos] = useState([]);
  const [pix, setPix] = useState([]);
  const [creditCard, setCreditCard] = useState([]);
  const { id } = useParams(); // Certifique-se de que o parâmetro corresponde ao nome na URL

  const [expanded, setExpanded] = useState({});

  const token = Cookies.get('token'); // Obtenha o token do cookie
  const [loading, setLoading] = useState(true);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [panel]: newExpanded ? panel : false,
    }));
  };

  useEffect(() => {
    setLoading(true); // Define o estado de carregamento como true antes de fazer a chamada à API

    if (loggedIn) {
      axios
        .get(`http://localhost:3001/api/allOrders/${userId}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
    
          },
        })
        .then((response) => {
          setBoletos(response.data.boleto);
          setPix(response.data.pix);
          setCreditCard(response.data.creditCard);
          setLoading(false); // Define o estado de carregamento como true antes de fazer a chamada à API

        })
        .catch((error) => {
          console.error("Erro ao obter os pedidos:", error);
        });
    }
  }, [loggedIn, userId]);

  const handleClick = (payload) => {
    navigator.clipboard.writeText(payload);
  };
  


  return (
    <>
      <Header />
      <Navbar />
      {loading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20rem",
                    }}
                  >
                    <CircularIndeterminate />;
                  </div>
                ) :(<>
             
                {boletos &&
        boletos.map((order, index) => (
          <div
            key={index}
            style={{
              position: "reative",
              display: "flex",
              margin: "0 auto",
              marginTop: "15rem",
              marginBottom: "15rem",
              border: "1px solid rgba(0, 0, 0, 0.10)",
              width: "60vw",
              height: "50vh",
            }}
          >
            <span>{order.billingType}</span>
            <span>Status</span>
            <span>
              {" "}
              {(() => {
                switch (order.status) {
                  case "RECEIVED":
                    return "pago";
                  case "CONFIRMED":
                    return "Cobrança confirmada";
                  case "PENDING":
                    return "Pendente";
                  case "OVERDUE":
                    return "Cobrança vencida";
                  default:
                    return;
                }
              })()}
            </span>
            {order.status === "PENDING" ? (
              <Link to={order.bankSlipUrl}>
                {" "}
                <button>Ver boleto</button>{" "}
              </Link>
            ) : (
              ""
            )}

            <div>
              {" "}
              <div>
                <div>
                  {order.encodedImage && (
                    <ImageComponent encodedImage={order.encodedImage} />
                  )}
                  {order.encodedImage && (
                    <>
                      <p style={{ width: "10vw" }}>{order.payload}</p>
                      <div>
                        <button onClick={() => handleClick(order.payload)}>
                          Copiar
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div>
              {order.products.map((product, prodIndex) => (
                <div key={prodIndex}>
                  <img
                    src={product.image}
                    alt={`Produto ${product.productId}`}
                    style={{ width: "10vw" }}
                  />

                  <div>{order.trackingCode}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      {pix &&
        pix.map((order, index) => (
          <div>
            <span>Status</span>
            <span>
              {" "}
              {(() => {
                switch (order.status) {
                  case "RECEIVED":
                    return "pago";
                  case "CONFIRMED":
                    return "Cobrança confirmada";
                  case "PENDING":
                    return "Pendente";
                  case "OVERDUE":
                    return "Cobrança vencida";
                  default:
                    return;
                }
              })()}
            </span>
            <div>{order.trackingCode}</div>
            {order.status === "PENDING" ? (
              <div>
                {order.encodedImage && (
                  <ImageComponent encodedImage={order.encodedImage} />
                )}
                {order.encodedImage && (
                  <>
                    <p style={{ width: "10vw" }}>{order.payload}</p>
                    <div>
                      <button onClick={() => handleClick(order.payload)}>
                        Copiar
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              ""
            )}

            <div>
              {order.products.map((product, prodIndex) => (
                <div key={prodIndex}>
                  <img
                    src={product.image}
                    alt={`Produto ${product.productId}`}
                    style={{ width: "10vw" }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

      {creditCard &&
        creditCard.map((order, index) => (
          <div key={index} style={{ marginTop: "15rem" }}>
            <span>Status</span>
            <span>
              {" "}
              {(() => {
                switch (order.status) {
                  case "RECEIVED":
                    return "pago";
                  case "CONFIRMED":
                    return "Cobrança confirmada";
                  case "PENDING":
                    return "Pendente";
                  case "OVERDUE":
                    return "Cobrança vencida";
                  default:
                    return;
                }
              })()}
            </span>
            ~<div>{order.trackingCode}</div>
            <div>
              {order.products.map((product, prodIndex) => (
                <div key={prodIndex}>
                  <img
                    src={product.image}
                    alt={`Produto ${product.productId}`}
                    style={{ width: "10vw" }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
                
                
                
                </>)}
     
    </>
  );
};

export default AllOrderDetails;