import React from "react";
import "../Style/menu.css";
import { useParams } from "react-router-dom";
import useFetch from "../ApiService/useFetch";
import ProductDetails from "../Components/Dish/ProductDetail";

const Details = ({ addToBasket }) => {
  const { id } = useParams();
  const {
    data: details,
    error,
    isPending,
  } = useFetch(
    "https://db01-4-menuservice.herokuapp.com/api/public/products/" + id
  );

  return (
    <div>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {details && (
        <ProductDetails details={details} addToBasket={addToBasket} />
      )}
    </div>
  );
};

export default Details;
