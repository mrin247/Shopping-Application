/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  addCategory,
  deleteCategories,
  getAllCategory,
  updateCategories,
} from "../../actions";
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
import UpdateCategoriesModal from "./components/updateCategoriesModal";

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
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
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
    updateCheckedAndExpandedcategories();
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
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });
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

  // ! This function updates category fields in the update category modal in client side
  const handleCategoryInput = (key, value, index, type) => {
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  // ! uddate checked and expanded categoriees
  const updateCheckedAndExpandedcategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    // Find category of checked items
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });
    // Find category of expanded items
    const expandedArray = [];
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });
    // Push checkedArray and expandedArray to the state
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);

    console.log({ checked, expanded, categories, checkedArray, expandedArray });
  };

  // ! Dispatch action to update category after modal close
  const updateCategoriesForm = () => {
    const form = new FormData();

    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    dispatch(updateCategories(form)).then((result) => {
      if (result) {
        dispatch(getAllCategory());
      }
    });

    setUpdateCategoryModal(false);
  };

  // ! Function to Render update categories modal

  // ! Function to Render add categories modal
  const renderAddCategoriesModal = () => {
    return (
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
    );
  };
  // ! Function to delete Categpries
  const deleteCategoriesOnClick = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    const expandedIdsArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));

    const idsArray = expandedIdsArray.concat(checkedIdsArray);
    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategories(checkedIdsArray)).then((result) => {
        if (result) {
          dispatch(getAllCategory());
          setDeleteCategoryModal(false);
        }
      });
    }
  };

  // ! function to render delete category modal
  const renderDeleteCategoryModal = () => {
    return (
      <Modal
        modalTitle={"Confirm"}
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        buttons={[
          {
            label: "No",
            color: "primary",
            onClick: () => {
              alert("NO");
            },
          },
          {
            label: "Yes",
            color: "danger",
            onClick: deleteCategoriesOnClick,
          },
        ]}
      >
        <h5>Expanded</h5>
        {expandedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
        <h5>checked</h5>
        {checkedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
      </Modal>
    );
  };
  // ! Dispatch action to delete category after modal close
  const deleteCategory = () => {
    updateCheckedAndExpandedcategories();
    setDeleteCategoryModal(true);
  };

  const categoryList = createCategoryList(category.categories);

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
            <button onClick={deleteCategory}>Delete</button>
            <button onClick={updateCategory}>Edit</button>
          </Col>
        </Row>
      </Container>
      {/* // ! Add category modal */}
      {renderAddCategoriesModal()}
      {/* // ! Edit category modal */}
      <UpdateCategoriesModal
        show={updateCategoryModal}
        handleClose={updateCategoriesForm}
        modalTitle={"Update Categories"}
        size="lg"
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleCategoryInput={handleCategoryInput}
        categoryList={categoryList}
      />

      {/* // ! delete category modal */}
      {renderDeleteCategoryModal()}
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
