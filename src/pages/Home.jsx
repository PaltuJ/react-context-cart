import React from "react";
import { CartState } from "../context/Context";
import SingleProduct from "../components/SingleProduct";
import "./styles.css";
import FilterSection from "../components/FilterSection";

const Home = () => {
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();
  // console.log(products);
  const transFormProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    // Filtering by stock
    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    // Filtering by fast delivery
    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    // Filtering by rating
    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    // Filtering by search query
    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return sortedProducts;
  };
  return (
    <section id="container">
      <div className="home">
        <FilterSection />
        <div className="productContainer">
          {transFormProducts().map((item) => {
            return <SingleProduct item={item} key={item.id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Home;
