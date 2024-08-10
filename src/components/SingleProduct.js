import React from "react";
import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";
import { CartState } from "../context/Context";

const SingleProduct = ({ item }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  // console.log(cart);

  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={item.image} alt={item.name} />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>₹ {item.price.split(".")[0]}</span>
            {item.fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 Days Delivery</div>
            )}
            <Rating rating={item.ratings} />
          </Card.Subtitle>
          {cart.some((p) => p.id === item.id) ? (
            <Button
              onClick={() => {
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: item,
                });
              }}
              variant="danger"
            >
              Remove From Cart
            </Button>
          ) : (
            <Button
              onClick={() => {
                dispatch({
                  type: "ADD_TO_CART",
                  payload: item,
                });
              }}
              disabled={!item.inStock}
            >
              {!item.inStock ? "Out Of Stock" : "Add To Cart"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
