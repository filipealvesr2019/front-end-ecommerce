import SignUpForm from './SignUpForm'
import UpdateForm from './UpdateForm'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Protected = () => {
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const userId = Cookies.get('userId'); // Obtenha o token do cookie

  useEffect(() => {
    const checkUserRegistration = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/custumer/${userId}`);
        setIsUserRegistered(true);
      } catch (error) {
        setIsUserRegistered(false);
      }
    };

    checkUserRegistration();
  }, [userId]);

  return (
    <div>
      
      {isUserRegistered ? <UpdateForm /> : <SignUpForm />}

    </div>
  );
};

export default Protected;
