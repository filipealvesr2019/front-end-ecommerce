import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useConfig } from '../context/ConfigContext';

const DiscountImageLinkPerPercentage = ({ alt }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageUrl15, setImageUrl15] = useState('');
  const { apiUrl } = useConfig();

  // Fetch image URL from API on component mount
  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/bannerByDiscount/50`);
        setImageUrl(response.data.banners[0].image); // Assuming you want the first banner
      } catch (error) {
        console.error('Error fetching image URL:', error);
        // Handle error gracefully, e.g., display a placeholder image or error message
      }
    };

    fetchImageUrl();
  }, []);
  // Fetch image URL from API on component mount
  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const response = await axios.get(`${apiUrl}//localhost:3001/api/bannerByDiscount/15`);
        setImageUrl15(response.data.banners[0].image); // Assuming you want the first banner
      } catch (error) {
        console.error('Error fetching image URL:', error);
        // Handle error gracefully, e.g., display a placeholder image or error message
      }
    };

    fetchImageUrl();
  }, []);
  return (
    <>
    <div style={{display:"flex", gap:"1rem", margin:"0 auto"}}>

    <Link to={`/productsByDiscountPercentage/70`}>
      <img src={imageUrl} alt={alt}  style={{width:"40vw"}}/>
    </Link> 
      <Link to={`/productsByDiscountPercentage/15`}  >
      <img src={imageUrl15} alt={alt} style={{width:"40vw"  }}/>
    </Link> 
    </div>
    </>
  );
};

export default DiscountImageLinkPerPercentage;
