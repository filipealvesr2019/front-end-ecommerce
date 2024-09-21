// CategoryProducts.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./CategoryProducts.module.css";
import { useConfig } from "../context/ConfigContext";
const CategoryProducts = () => {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { apiUrl } = useConfig();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/subcategoriesAndProductsByName/${category}/${subcategory}`
        );
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao obter produtos da subcategoria:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subcategory]);

  if (loading) {
    return <p>Carregando produtos...</p>;
  }
  // Função para remover acentos
  const removeAccents = (name) => {
    return name
      .normalize("NFD") // Normaliza a string para decompor caracteres acentuados
      .replace(/[\u0300-\u036f]/g, "") // Remove os diacríticos (acentos)
      .toLowerCase() // Converte para letras minúsculas
      .replace(/\s+/g, "-") // Substitui espaços por hífens
      .replace(/[^\w\-]+/g, ""); // Remove caracteres não alfanuméricos (exceto hífens)
  };
  return (
    <div>
      <h1>{subcategory} Products</h1>
      <ul className={styles.CategoryProducts}>
        {products.map((product) => (
          <Link
            to={`/products/${removeAccents(product.name)}/${product._id}`}
            key={product._id}
            className={styles.CategoryProducts__productcard}
          >
            <li className={styles.CategoryProducts__productcard}>
              <img
                src={product.variations[0].urls[0]}
                alt={product.name}
                className={styles.CategoryProducts__image}
              />
              <p className={styles.CategoryProducts__price}>
                {" "}
                R${product.variations[0].sizes[0].price.toFixed(2)}
              </p>

              <h3 className={styles.CategoryProducts__productName}>
                {product.name}
              </h3>
              {/* Renderização adicional conforme necessário */}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default CategoryProducts;
