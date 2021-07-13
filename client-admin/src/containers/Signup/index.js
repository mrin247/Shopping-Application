import React from "react";
import Layout from "../../compoents/Layout";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

import Input from "../../compoents/UI";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * @author
 * @function Signup
 **/

const Signup = (props) => {
  
  const auth = useSelector((state) => state.auth);
  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Row>
              <Col md={6}>
                <Input
                  label="First Name"
                  type="text"
                  placeholder="First Name"
                  value=""
                  onChange={() => {}}
                />
              </Col>
              <Col md={6}>
                <Input
                  label="Last Name"
                  type="text"
                  placeholder="Last Name"
                  value=""
                  onChange={() => {}}
                />
              </Col>
            </Row>
            <Form>
              <Input
                label="Email"
                type="email"
                placeholder="Email"
                value=""
                onChange={() => {}}
                errorMessage="We'll never share your email with anyone else."
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

export default Signup;
