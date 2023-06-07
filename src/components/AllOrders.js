import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { GetOrders, isAuthenticated } from "../API";

const AllOrders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [values, setValues] = useState({ error: "", loading: false });
  const { user, token } = isAuthenticated();
  useEffect(() => {
    setValues({
      ...values,
      loading: true,
    });
    GetOrders(token, user._id)
      .then((data) => {
        setOrdersData(data);
        setValues({
          ...values,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        setValues({
          ...values,
          error: err,
          loading: false,
        });
      });
  }, []);
  return (
    <Container>
      {values.loading ? (
        <h5>Loading...</h5>
      ) : ordersData.length > 0 ? (
        ordersData.map((order, id) => {
          return (
            <Row key={id} className="shadow-lg p-3 mb-5 bg-white rounded">
              <br />
              <h5>Order Id: {order._id}</h5>
              <h6>
                Phone Number:{" "}
                <span style={{ color: "skyblue" }}>{order.phone_number}</span>
              </h6>
              <h6>
                Sub Total:{" "}
                <span style={{ color: "red" }}>Rs. {order.sub_total}</span>
              </h6>
              <br />
            </Row>
          );
        })
      ) : (
        <h6>No orders yet</h6>
      )}
    </Container>
  );
};

export default AllOrders;
