import React from 'react'

import Header from './Header'
import { useLocation } from 'react-router-dom'
import { logPageView } from '../../analytics'
import { Helmet } from 'react-helmet'

const ProfileDetails = () => {
  const location = useLocation();
  useEffect(() => {
    logPageView();
  }, [location]);
  return (
    <div>
        <Helmet>
        <title>Perfil - Loja Mediewal</title>
        <meta
          name="description"
          content="Veja as últimas novidades em nossa loja, com uma seleção de produtos novos."
        />
      </Helmet>
        <Header></Header>
    </div>
  )
}

export default ProfileDetails