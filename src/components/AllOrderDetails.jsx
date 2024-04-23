import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importe o Link do React Router
import Header from "./Header";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";
import axios from "axios";

import ImageComponent from "./ImageComponent";


const AllOrderDetails = () => {
  const userId = Cookies.get("userId");
  const { logout, loggedIn } = useAuth();
  const [boletos, setBoletos] = useState([]);
  const [pix, setPix] = useState([]);
  const [creditCard, setCreditCard] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(""); // State para armazenar o método de pagamento selecionado

  const [expanded, setExpanded] = useState({});

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [panel]: newExpanded ? panel : false,
    }));
  };

  useEffect(() => {
    if (loggedIn) {
      axios
        .get(`http://localhost:3001/api/allOrders/${userId}`)
        .then((response) => {
          setBoletos(response.data.boleto);
          setPix(response.data.pix);
          setCreditCard(response.data.creditCard);
        })
        .catch((error) => {
          console.error("Erro ao obter os pedidos:", error);
        });
    }
  }, [loggedIn, userId]);

  const handleClick = (payload) => {
    navigator.clipboard.writeText(payload);
  };
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    // Definir o método de pagamento selecionado com base no índice da aba clicada
    if (index === 0) {
      setPaymentMethod("boleto");
    } else if (index === 1) {
      setPaymentMethod("pix");
    } else {
      setPaymentMethod(""); // Limpar o método de pagamento se nenhuma aba for selecionada
    }
  };

  const tabStyle = {
    color: "#ccc", // Cor de fundo das tabs ativas
    // Outros estilos conforme necessário
  };

  return (
    <>
      <Header />
      <Navbar />

      {boletos && boletos.map((order, index) => (
        <div key={index} style={{ marginTop: "15rem" }}>
          <span>{order.billingType}</span>
          <div>
            <div className="tab-buttons">
              <span
                style={activeTab === 0 ? tabStyle : {}}
                onClick={() => handleTabClick(0)}
              >
                Pagar Boleto
              </span>
              
            </div>
            <div className="tab-content">
              {activeTab === 0 && (
                <div>
                  {" "}
                  <div>
                    <Link to={order.bankSlipUrl}>{order.bankSlipUrl}</Link>
                  </div>
                </div>
              )}
           
            </div>
            <div>
            <div className="tab-buttons">
              <span
                style={activeTab === 0 ? tabStyle : {}}
                onClick={() => handleTabClick(0)}
              >
                Pagar Boleto
              </span>
              <span
                style={activeTab === 1 ? tabStyle : {}}
                onClick={() => handleTabClick(1)}
              >
                Pagar Pix
              </span>
            </div>
            <div className="tab-content">
              {/* Renderizar o link de boleto apenas se o pagamento for boleto */}
              {paymentMethod === "boleto" && (
                <div>
                  {" "}
                  <div>
                    <Link to={order.bankSlipUrl}>{order.bankSlipUrl}</Link>
                  </div>
                </div>
              )}
              {/* Renderizar o QR code apenas se o pagamento for pix */}
              {paymentMethod === "pix" && (
                <div>
                  {" "}
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
                  </div>{" "}
                </div>
              )}
            </div>
          </div>
          </div>
          <div>
            {order.products.slice(0, 1).map((product, prodIndex) => (
              <div key={prodIndex}>
                <img
                  src={product.image}
                  alt={`Produto ${product.productId}`}
                  style={{ width: "10vw" }}
                />
                <div>{order.status}</div>
                <div>{order.trackingCode}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {pix && pix.map((order, index) => (
        <div key={index} style={{ marginTop: "15rem" }}>
          <div>
            <div className="tab-buttons">
              <span
                style={activeTab === 0 ? tabStyle : {}}
                onClick={() => handleTabClick(0)}
              >
                Pagar Pix
              </span>
          
            </div>
            <div className="tab-content">

              {activeTab === 0 && (
                <div>
                  {" "}
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
                  </div>{" "}
                </div>
              )}
             
            </div>
          </div>
          <div>
            {order.products.slice(0, 1).map((product, prodIndex) => (
              <div key={prodIndex}>
                <img
                  src={product.image}
                  alt={`Produto ${product.productId}`}
                  style={{ width: "10vw" }}
                />
                <div>{order.status}</div>
                <div>{order.trackingCode}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {creditCard && creditCard.map((order, index) => (
        <div key={index} style={{ marginTop: "15rem" }}>
          <div>
            {order.products.slice(0, 1).map((product, prodIndex) => (
              <div key={prodIndex}>
                <img
                  src={product.image}
                  alt={`Produto ${product.productId}`}
                  style={{ width: "10vw" }}
                />
                <div>{order.status}</div>
                <div>{order.trackingCode}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default AllOrderDetails;
