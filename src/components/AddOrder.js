import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { AddOrderCall, isAuthenticated } from "../API";
import { useNavigate } from "react-router-dom";

const AddOrder = () => {
  const { user, token } = isAuthenticated();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    phone_number: "",
    sub_total: "",
    error: "",
    loading: false,
  });
  const { phone_number, sub_total, error, loading } = values;
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    AddOrderCall({ user_id: user._id, phone_number, sub_total }, token)
      .then((data) => {
        if (data) {
          if (data.error) {
            setValues({ ...values, error: data.error, loading: false });
          } else {
            setValues({
              ...values,
              phone_number: "",
              sub_total: "",
              loading: false,
            });
            window.location.reload();
          }
        }
      })
      .catch((err) => {
        setValues({
          ...values,
          error: err,
          loading: false,
        });
      });
  };

  const AddOrderForm = () => {
    return (
      <Container>
        <Form>
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
              <h4>Sub Total</h4>
            </Form.Label>
            <Form.Control
              onChange={handleChange("sub_total")}
              type="number"
              value={sub_total}
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
      <Container className="shadow p-3 mb-5 bg-white rounded">
        <h1 className="text-center bg-light py-3">Add a new Order</h1>
        <br />
        {showLoading()}
        {showError()}
        {AddOrderForm()}
      </Container>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default AddOrder;
