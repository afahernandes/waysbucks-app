import { useState } from "react";
import { useContext } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";

function CardProduct({ item }) {
  const router = useHistory();
  const [state, dispatch] = useContext(AppContext);

  const [show, setShow] = useState(false);
  const [showRegis, setShowRegis] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShowRegis = () => setShowRegis(true);
  const handleCloseRegis = () => setShowRegis(false);

  const handlePushToDetail = (id) => {
    if (!state.isLogin) {
      return handleShow();
    } else {
      console.log(id);
      router.push(`product/${id}`);
    }
  };
  return (
    <>
      <Row >
        <Col key={item.id} id={item.id} className="mb-4" >
          <Card onClick={() => handlePushToDetail(item.id)}>
            <Card.Img
              src={item.image}
              width={"100%"}
              style={{ objectFit: "cover" }}
            />
            <Card.Body style={{ backgroundColor: "#F6E6DA" }}>
              <p className="tittleProduct">{item.tittle} </p>
              <p className="tittlePrice">Rp {item.price.toLocaleString()} </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <LoginModal
        show={show}
        handleClose={handleClose}
        regis={handleShowRegis}
      />
      <RegisterModal
        show={showRegis}
        handleClose={handleCloseRegis}
        login={handleShow}
      />
    </>
  );
}

export default CardProduct;
