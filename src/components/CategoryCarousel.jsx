import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CategoryCarousel = () => {
  const [categories, setCategories] = useState([]);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://serveradmin-whhj.onrender.com/api/categories');
        console.log('Categories Response:', response.data);

        if (response.data.categories && Array.isArray(response.data.categories)) {
          setCategories(response.data.categories);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event) => {
    setTouchEndX(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX && touchEndX) {
      const deltaX = touchEndX - touchStartX;
      const threshold = 50; // Threshold para desencadear o movimento da categoria

      if (deltaX > threshold && currentIndex > 0) {
        // Swipe right, move to previous category
        setCurrentIndex(currentIndex - 1);
      } else if (deltaX < -threshold && currentIndex < categories.length - 1) {
        // Swipe left, move to next category
        setCurrentIndex(currentIndex + 1);
      }
    }
    // Reset touch values
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handleImageClick = async (categoryName, subcategoryName) => {
    console.log('Clicked on image. Redirecting to category subcategories:', categoryName, subcategoryName);

    try {
      const response = await axios.get(`https://serveradmin-whhj.onrender.com/api/subcategories/${categoryName}`);
      const subcategories = response.data;

      console.log('Fetched subcategories:', subcategories);

      if (subcategories && subcategories.length > 0) {
        console.log('Navigating to category subcategories:', categoryName);
        navigate(`/categories/${encodeURIComponent(categoryName)}/subcategories`);
      } else {
        console.log('No subcategories found. Redirecting to category products:', categoryName, subcategoryName);
        navigate(`/categories/${encodeURIComponent(categoryName)}/${encodeURIComponent(subcategoryName)}/products`);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      // Se ocorrer um erro ou não houver subcategorias, redirecione para a página de produtos
      navigate(`/categories/${encodeURIComponent(categoryName)}/${encodeURIComponent(subcategoryName)}/products`);
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        overflow: 'hidden',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          display: 'flex',
          width: `${categories.length * 100}%`,
          transform: `translateX(-${(100 / categories.length) * currentIndex}%)`,
          transition: 'transform 0.3s ease' // Tempo de transição reduzido para resposta mais rápida
        }}
      >
        {categories.map((category) => (
          <div key={category._id} style={{ width: `${100 / categories.length}%`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {category.images.map((subcategoryImages) => (
              subcategoryImages.map((image) => (
                <div key={image._id} style={{ width: '150px', height: '150px', textAlign: 'center', marginBottom: '1rem' }}>
                  <div onClick={() => handleImageClick(category.name, subcategoryImages.name)}>
                    <Link to={`/categories/${encodeURIComponent(category.name)}`}>
                      <img src={image.imageUrl} alt={`Image ${image._id}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', aspectRatio: '1/1' }} />
                    </Link>
                  </div>
                </div>
              ))
            ))}
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;