import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { isAuthenticated } from "../API";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import AddOrder from "./AddOrder";
import AllOrders from "./AllOrders";

const Home = () => {
  const navigate = useNavigate();

  const { user } = isAuthenticated();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <Container>
      <Header />
      <br />
      {user && (
        <Row>
          <Col lg={4} className="shadow-sm p-3 mb-5 bg-white rounded">
            <Row>
              <h3>My Orders:</h3>
              <br />
            </Row>{" "}
            <br />
            <Row>
              <AllOrders />
            </Row>
          </Col>
          <Col></Col>
          <Col lg={7}>
            <AddOrder />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Home;
