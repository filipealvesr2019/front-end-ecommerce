import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importe o Link do React Router
import Header from "./Header";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";
import axios from "axios";

const MyOrders = () => {
  const userId = Cookies.get("userId");
  const { logout, loggedIn } = useAuth();
  const [boletos, setBoletos] = useState([]);
  const [pix, setPix] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      axios
        .get(`http://localhost:3001/api/pedidos/${userId}`)
        .then((response) => {
          setBoletos(response.data.boleto); // Assuming 'boleto' is the key containing
          setPix(response.data.pix); // Assuming 'boleto' is the key containing orders
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Erro ao obter os pedidos:", error);
        });
    }
  }, [loggedIn, userId]);

  return (
    <>
      <Header></Header>
      <Navbar></Navbar>
      {boletos.map((order, index) => (
        <div key={index} style={{ marginTop: "15rem" }}>
          <span>{order.billingType}</span>
          <span href>{order.bankSlipUrl}</span>

          <div>
            {order.products.map((product, prodIndex) => (
              <div key={prodIndex}>
                <Link to={`/order/${product.productId}`}> {/* Use o Link aqui */}
                  <img src={product.image} alt={`Produto ${product.productId}`} style={{width:"10vw"}}/>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
      {pix.map((order, index) => (
        <div key={index} style={{ marginTop: "15rem" }}>
          <span>{order.billingType}</span>
          <div>
            {order.products.map((product, prodIndex) => (
              <div key={prodIndex}>
                <Link to={`/order/${product.productId}`}> {/* Use o Link aqui */}
                  <img src={product.image} alt={`Produto ${product.productId}`} style={{width:"10vw"}}/>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default MyOrders;
