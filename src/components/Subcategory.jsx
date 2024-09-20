import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import IconToggle from './IconToggle';
import Header from './Header';
import { useConfig } from '../context/ConfigContext';
import { Helmet } from 'react-helmet';
const Subcategory = () => {
  const { category, subcategory } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);

  const ITEMS_PER_PAGE = 10; // Número de produtos por página
  const { apiUrl } = useConfig();

  

  const location = useLocation();

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/subcategoriesAndProducts/${category}/${subcategory}?page=${currentPage}`);
      const { products: productsData } = await response.json();
  
      setProducts(productsData);
    } catch (error) {
      console.error('Erro ao obter produtos:', error);
    }
  };
  

  const fetchTotalPages = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/subcategoriesAndProducts/${category}/${subcategory}`);
      const { totalPages } = await response.json();
  
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Erro ao obter total de páginas:', error);
    }
  };
  

  useEffect(() => {
    fetchProducts();
    fetchTotalPages();
  }, [category, subcategory, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <Header/>
      {location.pathname === "/categorias" && (
        <Helmet>
          <title>Categorias - Loja Mediewal</title>
          <meta
            name="description"
            content="Veja as últimas novidades em nossa loja, com uma seleção de produtos novos."
          />
        </Helmet>
      )}


      <h1>{subcategory} Products</h1>
      <ul
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          listStyleType: 'none',
        }}
      >
        {products.map((product) => (
          <Link to={`/products/${product.name}/${product._id}`} key={product._id}>
            <li>
              <img
                src={product.variations[0].urls[0]}
                alt={product.name}
                style={{ width: '100%', marginBottom: '10px' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
              <IconToggle productId={product._id} isFavorite={product.isFavorite} />
                
                <span>{product.name}</span>
                <span>{Number(product.variations[0].price && product.variations[0].price).toFixed(2).padStart(5, '0')}</span>
              </div>
            </li>
          </Link>
        ))}
      </ul>
      
      {/* Renderizar o componente de paginação do Material-UI */}
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </Stack>

    </div>
  );
};

export default Subcategory;
