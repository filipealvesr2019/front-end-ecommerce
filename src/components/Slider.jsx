import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link, useNavigate } from 'react-router-dom';
import SliderSkeleton from './SliderSkeleton';
import './Slider.css';

const Slider = ({ alt, imageWidth, imageHeight, autoPlayInterval, dataFetch }) => {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        setLoading(false);
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

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      {loading ? (
        <div style={{ marginTop: "15rem" }}>
          <SliderSkeleton />
        </div>
      ) : (
        <>
          {categories.map((category, index) => (
            <div key={index} style={{ display: index === currentIndex ? 'block' : 'none' }}>
              {category.slider.map((subcategoryImages, subIndex) => (
                <div key={subIndex}>
                  {subcategoryImages.map((image, imageIndex) => (
                    <div key={imageIndex} style={{ display: 'inline-block', margin: '10px' }}>
                      <Link to={`/categories/${encodeURIComponent(category.name)}`}>
                        <img src={image.imageUrl} alt={`Image ${image._id}`} className="categoriesImageStyle" />
                      
                      </Link>
                      
                    </div>
                  ))}
                  
                </div>
              ))}
               <div className="indicator-container" style={{ textAlign: 'center', marginTop: '10px' }}>
            {categories.map((_, index) => (
              <span
                key={index}
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => handleIndicatorClick(index)}
                style={{ cursor: 'pointer', border:"none" , padding: '5px', margin: '0 5px', borderRadius: '50%', background: index === currentIndex ? '#000' : '#999' }}
              ></span>
            ))}
          </div>
            </div>
          ))}
          <div className='arrowContainer'>
          <div               className="arrowIcon"
 style={{ position: 'absolute', top: '55%', transform: 'translateY(-50%)', left: "50px", cursor: 'pointer', color: "black", fontSize: '24px', }} onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length)} >
            <ArrowBackIosIcon style={{ fontSize: '2rem' }} />
          </div>
          <div  className="arrowIcon" style={{ position: 'absolute', top: '55%', transform: 'translateY(-50%)', right: "60px", cursor: 'pointer', color: "black",  fontSize: '24px' }} onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length)}>
            <ArrowForwardIosIcon style={{ fontSize: '2rem', position:"absolute", }} />
          </div>

          </div>
         
        </>
      )}
    </div>
  );
};

export default Slider;
