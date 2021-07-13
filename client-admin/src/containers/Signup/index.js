import React, { useState } from "react";
import Layout from "../../compoents/Layout";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

import Input from "../../compoents/UI";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions";

/**
 * @author
 * @function Signup
 **/

const Signup = (props) => {
  // Make state using useState hook
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  // ! Extract authentication data from store
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  // ! Returns a refernce to the store.dispatch() method
  const dispatch = useDispatch();

  // ! user signup function called on submitting form data
  const userSignup = (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    // ! Dispatch action to signup user (user object passed as parameter)
    dispatch(signup(user));
  };

  // ! Check if authenticated or not
  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }

  // ! Loading screen
  if (user.loading) {
    return <p>Loading...</p>;
  }

  // ! Render signup form
  return (
    <Layout>
      <Container>
        {user.message}
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userSignup}>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
              </Row>
              <Input
                label="Email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                errorMessage="We'll never share your email with anyone else."
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

export default Signup;
