import React, { useEffect, useState } from "react";
import Layout from "../../compoents/Layout";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Input from "../../compoents/UI/Input";

import { isUserLoggedIn, login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

/**
 * @author
 * @function Signin
 **/

const Signin = (props) => {
  // Make state using useState hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  // ! Extract authentication data from store
  const auth = useSelector((state) => state.auth);

  // ! Returns a refernce to the store.dispatch() method
  const dispatch = useDispatch(); 

  // ! user login function called on submitting form data
  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    // ! Dispatch action to login user (user object passed as parameter)
    dispatch(login(user));
  };

  // ! Check if authenticated or not
  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }

  // ! Render singin form
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                label="Email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signin;
