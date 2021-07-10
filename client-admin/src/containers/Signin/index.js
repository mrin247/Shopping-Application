import React from "react";
import Layout from "../../compoents/Layout";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Input from "../../compoents/UI";

import { login } from "../../actions";
import { useDispatch } from "react-redux";

/**
 * @author
 * @function Signin
 **/

const Signin = (props) => {
  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();

    const user = {
      email: "dummy@mail.com",
      password: "dummy-password",
    };

    dispatch(login(user));
  };

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
                value=""
                onChange={() => {}}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Password"
                value=""
                onChange={() => {}}
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
