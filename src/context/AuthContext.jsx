import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false); // Renomeado para isCustomer

  useEffect(() => {
    const storedToken = Cookies.get('token');
    const storedRole = Cookies.get('role');
    setLoggedIn(Boolean(storedToken));
    setIsCustomer(storedRole === 'customer');
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });

      const userRole = response.data.user.role;

      setLoggedIn(true);
      setIsCustomer(userRole === 'customer');
      Cookies.set('token', response.data.token);
      Cookies.set('role', userRole);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Erro, email ou senha inválidos!', { position: toast.POSITION.TOP_CENTER });
      } else {
        console.error('Erro na solicitação de login', error);
      }
    }
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    setLoggedIn(false);
    setIsCustomer(false);
  };

  const values = {
    loggedIn,
    isCustomer, // Atualizado para isCustomer
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);