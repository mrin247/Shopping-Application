import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../actions/category.action";
import Layout from "../../compoents/Layout";

/**
 * @author
 * @function Category
 **/

const Category = (props) => {

  // ! Extract category data from store
  const category = useSelector((state) => state.category);

  // ! Returns a refernce to the store.dispatch() method
  const dispatch = useDispatch();

  // ! Render every time
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  // ! This recursive function render categories by maintaining and returning an array
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
      <li key={category._id}>
        {category.name}
        {category.children.length > 0 ? <ul>{renderCategories(category.children)}</ul>: null}
      </li>
      );
    }

    return myCategories;
  };

  // ! Render Categories
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <button>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ul>{renderCategories(category.categories)}</ul>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Category;
