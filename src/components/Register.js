import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { AddUser, isAuthenticated } from "../API";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    phone_number: "",
    password: "",
    error: "",
    loading: false,
  });
  const { name, phone_number, password, error, loading } = values;

  useEffect(() => {
    const { user } = isAuthenticated();
    if (user) {
      navigate("/");
    }
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    AddUser({ name, phone_number, password })
      .then((data) => {
        if (data) {
          if (data.error) {
            setValues({ ...values, error: data.error, loading: false });
          } else {
            localStorage.setItem("jwt", JSON.stringify(data));
            setValues({
              ...values,
              loading: false,
            });
            navigate("/");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const RegisterForm = () => {
    return (
      <Container style={{ padding: "2rem" }}>
        <Form style={{ width: "100%" }}>
          <Form.Group>
            <Form.Label>
              <h4>Full Name</h4>
            </Form.Label>
            <Form.Control onChange={handleChange("name")} value={name} />
          </Form.Group>
          <br />
          <br />
          <Form.Group>
            <Form.Label>
              <h4>Phone Number</h4>
            </Form.Label>
            <Form.Control
              onChange={handleChange("phone_number")}
              value={phone_number}
            />
          </Form.Group>
          <br />
          <br />
          <Form.Group className="mb-3">
            <Form.Label>
              <h4>Password</h4>
            </Form.Label>
            <Form.Control
              onChange={handleChange("password")}
              type="password"
              value={password}
            />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit" onClick={clickSubmit}>
            Submit
          </Button>
        </Form>
      </Container>
    );
  };

  const showError = () => (
    <Alert
      key="danger"
      variant="danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </Alert>
  );
  const showLoading = () =>
    loading && (
      <Alert key="info" variant="info">
        Loading...
      </Alert>
    );

  return (
    <div>
      <Header />
      <Container className="shadow mt-5 px-0 col-sm-11 col-md-8 col-lg-6">
        <h1 className="text-center bg-light py-3">Create a new Account</h1>
        {showLoading()}
        {showError()}
        {RegisterForm()}
        <p style={{ textAlign: "center" }}>
          Already have an account? Please <Link to="/login">login</Link>.
        </p>
        <br />
      </Container>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Register;
