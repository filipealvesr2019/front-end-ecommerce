import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link, useNavigate } from 'react-router-dom';
import SliderSkeleton from './SliderSkeleton';
import './Slider.css'
const Slider = ({ alt, imageWidth, imageHeight, autoPlayInterval, dataFetch }) => {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simula um delay de 2 segundos
        // await new Promise(resolve => setTimeout(resolve, 2000));
        
        const response = await axios.get('http://localhost:3001/api/categories');
        console.log('Categories Response:', response.data);

        if (response.data.categories && Array.isArray(response.data.categories)) {
          setCategories(response.data.categories.slice(0, 3)); // Mostrar apenas as primeiras três categorias
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);  // Definir carregamento como falso após tentativa de buscar dados
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const nextImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    };

    const autoPlayTimer = setInterval(nextImage, autoPlayInterval || 4000);

    return () => clearInterval(autoPlayTimer);
  }, [currentIndex, categories, autoPlayInterval]);



  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    fontSize: '24px',
  };

  return (

    <div style={{ position: 'relative', textAlign: 'center' }}>
    {loading ? (
      <div style={{
        marginTop:"15rem"
      }}><SliderSkeleton/></div>  // Exibir carregamento enquanto os dados não são carregados
    ) : (
      <>
        {categories.map((category, index) => (
          <div key={index} style={{ display: index === currentIndex ? 'block' : 'none' }}>
            {category.slider.map((subcategoryImages, subIndex) => (
              <div key={subIndex}>
                {subcategoryImages.map((image, imageIndex) => (
                  <div key={imageIndex} style={{ display: 'inline-block', margin: '10px'  }}>
                    <Link to={`/categories/${encodeURIComponent(category.name)}`}>
                      <img src={image.imageUrl} alt={`Image ${image._id}`} class="categoriesImageStyle"/>
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
        <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, cursor: 'pointer', fontSize: '24px' }} onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length)}>
          <ArrowBackIosIcon style={{ fontSize: '2rem' }} />
        </div>
        <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: 0, cursor: 'pointer', fontSize: '24px' }} onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length)}>
          <ArrowForwardIosIcon style={{ fontSize: '2rem' }} />
        </div>
      </>
    )}
  </div>

  );
};

export default Slider;
