import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";

const DiscountProductsByCategoryAndPorcentage = () => {
  const [products, setProducts] = useState(null);
  const { discount, category } = useParams();
  const { apiUrl } = useConfig();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/products/discount/${discount}/category/${category}`
        );
        setProducts(response.data.productsWithDiscountAndCategory);
      } catch (error) {
        console.error("Erro ao obter produtos:", error);
      }
    };

    fetchData();
  }, [discount, category]);

  const formatPrice = (price) => {
    // Arredonda o preço para duas casas decimais e formata como moeda brasileira
    return parseFloat(price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  return (
    <div>
      <Header/>
      <Navbar/>
      {Array.isArray(products) &&
        products.map((product) => (
          <div key={product._id}>
            <Header></Header>
            <Navbar></Navbar>
            <Link to={`/products/${product.name}/${product._id}`}>
              <img src={product.variations[0].urls[0]} alt={product.name} />
              <h2>{product.name}</h2>
             
            </Link>
            <p>{product.description}</p>
              <p>Desconto: {product.discountPercentage}%</p>
              <p> R${product.price.toFixed(2)}</p>
              <p style={{ textDecoration: 'line-through', color: '#8c8c8c' }}>Preço anterior: {formatPrice(product.previousPrice.toFixed(2))}</p>
          </div>
        ))}
    </div>
  );
};

export default DiscountProductsByCategoryAndPorcentage;
