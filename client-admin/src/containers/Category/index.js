import React, { useEffect, useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { addCategory, getAllCategory } from "../../actions/category.action";
import Layout from "../../compoents/Layout";
import Input from "../../compoents/UI/Input";
import Modal from "../../compoents/UI/Modal";

// ! Import Icons
import {
  IoCheckboxOutline,
  IoCheckbox,
  IoChevronDownCircleSharp,
  IoChevronForwardCircleSharp,
} from "react-icons/io5";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

/**
 * @author
 * @function Category
 **/

const Category = (props) => {
  // ! State
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentcategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);

  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  // ! Extract category data from store
  const category = useSelector((state) => state.category);

  // ! Returns a refernce to the store.dispatch() method
  const dispatch = useDispatch();

  // ! Dispatch action to add category after modal close
  const handleClose = () => {
    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));

    // Reset
    setCategoryName("");
    setParentcategoryId("");

    setShow(false);
  };
  const handleShow = () => setShow(true);

  // ! Dispatch action to update category after modal close

  const updateCategory = () => {
    setUpdateCategoryModal(true);
  };

  // ! This recursive function render categories by maintaining and returning an array
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }

    return myCategories;
  };

  // ! This recursive function create category list linerly by maintaining and returning an array named options
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  // act when image for new category added
  const handlecategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  // ! Render Categories
  return (
    <Layout sidebar>
      <Container fluid>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoCheckbox />,
                uncheck: <IoCheckboxOutline />,
                halfCheck: <IoCheckboxOutline />,
                expandClose: <IoChevronForwardCircleSharp />,
                expandOpen: <IoChevronDownCircleSharp />,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <button>Delete</button>
            <button onClick={updateCategory}>Edit</button>
          </Col>
        </Row>
      </Container>
      {/* // ! Add category modal */}
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add new Category"}
      >
        <Input
          value={categoryName}
          placeholder={"Category Name"}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <select
          className="form-control"
          value={parentCategoryId}
          onChange={(e) => setParentcategoryId(e.target.value)}
        >
          <option>select category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          name="categoryImage"
          onChange={handlecategoryImage}
        />
      </Modal>
      {/* // ! Edit category modal */}
      <Modal
        show={updateCategoryModal}
        handleClose={() => {
          setUpdateCategoryModal(false);
        }}
        modalTitle={"Update Categories"}
        size="lg"
      >
        <Row>
          <Col>
            <Input
              value={categoryName}
              placeholder={"Category Name"}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Col>
          <Col>
            <select
              className="form-control"
              value={parentCategoryId}
              onChange={(e) => setParentcategoryId(e.target.value)}
            >
              <option>select category</option>
              {createCategoryList(category.categories).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </Col>
          <Col>
            <select className="form-control">
              <option value="">Select type</option>
              <option value="store">Store</option>
              <option value="product">Product</option>
              <option value="page">page</option>
            </select>
          </Col>
        </Row>

        <input
          type="file"
          name="categoryImage"
          onChange={handlecategoryImage}
        />
      </Modal>
    </Layout>
  );
};

export default Category;

/**
 * <Input
            value={categoryName}
            placeholder={"Category Name"}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <select
            className="form-control"
            value={parentCategoryId}
            onChange={(e) => setParentcategoryId(e.target.value)}
          >
            <option>select category</option>
            {createCategoryList(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          <input
            type="file"
            name="categoryImage"
            onChange={handlecategoryImage}
          />
 */
