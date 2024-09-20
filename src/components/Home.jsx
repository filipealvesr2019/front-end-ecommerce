import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import CategoryCarousel from "./CategoryCarousel";
import DiscountImageCarousel from "./DiscountImageCarousel ";
import NewArrivals from "./NewArrivals";
import Slider from "../components/Slider";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { logPageView } from "../../analytics";
import { Helmet } from "react-helmet";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);

  return (
    <div>
      {location.pathname === "/" && (
             <Helmet>
             <title>Home - Loja Mediewal</title>
             <meta
               name="description"
               content="Veja as últimas novidades em nossa loja, com uma seleção de produtos novos."
             />
           </Helmet>
      )}

      <Slider />
      <Categories />

      <CategoryCarousel />

      <Header />

      <div
        style={{ display: "flex", marginTop: "3rem", flexDirection: "column" }}
      >
        <NewArrivals />{" "}
      </div>
      <Navbar></Navbar>
      <Footer />
    </div>
  );
};

export default Home;
