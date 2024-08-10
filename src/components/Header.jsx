import React from "react";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartState } from "../context/Context";
import { AiFillDelete } from "react-icons/ai";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="menu_link">
            <b style={{ color: "white" }}>P</b>•Store
          </Link>
        </Navbar.Brand>
        <Nav defaultActiveKey="/">
          <Nav.Item>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/about" eventKey="link-1">
              About
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Navbar.Text className="search">
          <FormControl
            style={{ width: 450 }}
            placeholder="Search Your Product"
            className="m-auto"
            onChange={(e) =>
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              })
            }
          />
        </Navbar.Text>

        <Nav>
          <Dropdown align="end">
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="28" />
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ width: 370 }}>
              {cart.length > 0 ? (
                <>
                  {cart.map((addItem) => (
                    <span className="cartItem">
                      <img
                        src={addItem.image}
                        className="cartItemImg"
                        alt={addItem.name}
                      />

                      <div className="cartItemDetail">
                        <span>{addItem.name}</span>
                        <span>₹ {addItem.price.split(".")[0]}</span>
                      </div>

                      <AiFillDelete
                        fontSize={20}
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: addItem,
                          })
                        }
                      />
                    </span>
                  ))}

                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span
                  style={{
                    padding: 10,
                  }}
                >
                  Cart is Empty
                </span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
