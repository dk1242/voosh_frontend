import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../API";

const Header = () => {
  const { user } = isAuthenticated();
  return (
    <Container className="shadow-sm p-3 mb-5 bg-white rounded">
      <Row>
        <Col lg={6} md={6} sm={8}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1>Voosh Assignment</h1>
          </Link>
        </Col>
        <Col></Col>
        <Col
          lg={2}
          md={4}
          style={{
            display: "flex",
            justifyContent: "right",
            alignItems: "end",
            marginBottom: "0.5rem",
            fontSize: "20px",
          }}
        >
          {!user ? (
            <>
              {" "}
              <span>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {" "}
                  LogIn
                </Link>
              </span>
              &nbsp;&nbsp;/&nbsp;&nbsp;
              <span>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Register
                </Link>
              </span>
            </>
          ) : (
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={() => {
                localStorage.removeItem("jwt");
                window.location.reload();
              }}
            >
              LogOut
            </Link>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
