import React from "react";
import Header from "../Header/index";
import { Col, Container, Jumbotron, Row } from "react-bootstrap";
//import './style.css';
import { NavLink } from "react-router-dom";
import "./styles.css";

const Layout = (props) => {
  // ! Render Layout component
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li>
                  <NavLink exact to={"/"}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/page"}>Page</NavLink>
                </li>
                <li>
                  <NavLink to={"/category"}>Category</NavLink>
                </li>
                <li>
                  <NavLink to={"/orders"}>Orders</NavLink>
                </li>
                <li>
                  <NavLink to={"/products"}>Products</NavLink>
                </li>
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: "auto" }}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
};

export default Layout;
