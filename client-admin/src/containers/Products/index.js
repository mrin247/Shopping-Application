import React, { useState } from "react";
import Layout from "../../compoents/Layout";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import Input from "../../compoents/UI";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions/product.action";

/**
 * @author
 * @function Products
 **/

const Products = (props) => {
  // ! State
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPhotos, setProductPhotos] = useState([]);

  // ! Extract category data from store

  const category = useSelector((state) => state.category);

  // ! Returns a refernce to the store.dispatch() method
  const dispatch = useDispatch();

  // // ! Render every time
  // useEffect(() => {
  //   //dispatch(getAllCategory());
  // }, []);

  // ! Dispatch action to add category after modal close
  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("description", description);
    form.append("category", categoryId);
    for (let pic of productPhotos) {
      form.append("productPhotos", pic);
    }

    dispatch(addProduct(form));

    setShow(false);
  };
  const handleShow = () => setShow(true);

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
  const handleProductPhotos = (e) => {
    setProductPhotos([...productPhotos, e.target.files[0]]);
  };

  // ! Render Products
  return (
    <Layout sidebar>
      <Container fluid>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Products</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            label="Name"
            value={name}
            placeholder={"Product Name"}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Price"
            value={price}
            placeholder={"Product Price"}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            label="Quantity"
            value={quantity}
            placeholder={"Product Quantity"}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Input
            label="Description"
            value={description}
            placeholder={"Product Description"}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="form-control"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option>select category</option>
            {createCategoryList(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>

          {productPhotos.length > 0
            ? productPhotos.map((pic, index) => (
                <div key={index}>{pic.name}</div>
              ))
            : null}

          <input
            type="file"
            name="productPhotos"
            onChange={handleProductPhotos}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Products;
