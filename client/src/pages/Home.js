import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Banner from "../assets/banner.svg";
import CardList from "../component/CardList";
import { API } from "../config/api";

function Home() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await API("/products");
      console.log(response);
      setProducts(response.data.data.data);
      } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="mt-5"> 
      <Container>
        <Row
          className="justify-content-md-center"
          style={{ marginBottom: "20px" }}
        >
          <Col md="10">
            <img src={Banner} alt="v" style={{ width: "100%" }} />
            <h3 className="header3 mt-3 mb-3">Let’s Order</h3>
            <CardList data={products} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
