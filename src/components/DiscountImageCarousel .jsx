import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useConfig } from '../context/ConfigContext';
const DiscountImageCarousel = ({ alt, imageWidth, imageHeight, autoPlayInterval }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { apiUrl } = useConfig();

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const response50 = await axios.get(`${apiUrl}/api/sliderByDiscount/50`);
        const response15 = await axios.get(`${apiUrl}/api/sliderByDiscount/15`);
        const response70 = await axios.get(`${apiUrl}/api/sliderByDiscount/70`);

        setImageUrls([
          response50.data.sliders[0].image,
          response15.data.sliders[0].image,
          response70.data.sliders[0].image,
        ]);
      } catch (error) {
        console.error('Error fetching image URLs:', error);
        // Handle error gracefully, e.g., display a placeholder image or error message
      }
    };

    fetchImageUrls();
  }, []);

  useEffect(() => {
    // Função para avançar para a próxima imagem no carrossel
    const nextImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    };

    // Configurar o temporizador para avançar automaticamente
    const autoPlayTimer = setInterval(nextImage, autoPlayInterval || 4000);

    // Limpar o temporizador quando o componente for desmontado
    return () => clearInterval(autoPlayTimer);
  }, [currentIndex, imageUrls, autoPlayInterval]);

  // Estilos CSS
  const carouselContainerStyle = {
    position: 'relative',
    textAlign: 'center',
  };

  const imageStyle = {
    width: imageWidth || '100svw',
    height: imageHeight || '80svh',
    objectFit: 'cover',
    borderRadius: '8px',
  };

  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    fontSize: '24px',
  };

  return (
    <div style={carouselContainerStyle}>
      <Link to={`/products/discount/${[50, 15, 70][currentIndex]}/category/Feminina`}>
        <img src={imageUrls[currentIndex]} alt={alt} style={imageStyle} />
      </Link>
      <div style={{ ...arrowStyle, left: 0 }} onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length)}>
      <ArrowBackIosIcon style={{fontSize:"2rem"}}/>
      </div>
      <div style={{ ...arrowStyle, right: 0 }} onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length)}>
        <ArrowForwardIosIcon style={{fontSize:"2rem"}}/>
      </div>
    </div>
  );
};

export default DiscountImageCarousel;
