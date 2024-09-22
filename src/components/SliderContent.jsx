import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useConfig } from '../context/ConfigContext';

const SliderContent = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { apiUrl } = useConfig();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/categories`);
        console.log('Categories Response:', response.data);

        if (response.data.categories && Array.isArray(response.data.categories)) {
          setCategories(response.data.categories.slice(0, 2)); // Mostrar apenas as primeiras três categorias
        } else {
          setCategories([]);
        }
      } catch (error) {
        setError(`Error fetching categories: ${error.message}`);
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  

  return (
    <div style={{ position: 'relative' }}>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', position: 'relative' }}>
        {categories.map((category, index) => (
          <div key={index} style={{ width: '150px', height: '150px', margin: '10px', textAlign: 'center' }}>
            {category.images.map((subcategoryImages, index) => (
              subcategoryImages.map(image => (
                <div key={image._id}>
                  <Link to={`/categories/${encodeURIComponent(category.name)}`}>
                    <img src={image.imageUrl} alt={`Image ${image._id}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: "50%", aspectRatio: "1/1" }} />
                  </Link>
                  <div style={{ marginTop: '5px' }}>{category.name}</div>
                </div>
              ))
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderContent;
