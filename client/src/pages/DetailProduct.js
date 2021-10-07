import { useContext } from "react";
import { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CardTopping from "../component/CardTopping";
import { AppContext } from "../context/AppContext";
import { API } from "../config/api";
import { useEffect } from "react";
import Loading from "../component/Loading";
import PopUp from "../component/modals/PopUp";

function DetailProduct() {
  const { id } = useParams();
  const [state, dispatch] = useContext(AppContext);
  const [products, setProduct] = useState([]); 
  const [message, setMessage] = useState("");
  const [toppings, setToppings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPop, setShowPop] = useState(false);
     
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const responseProduct = await API("/product/" + id);
      const responseTopping = await API("/toppings");
      console.log("product", responseProduct);
      setProduct(responseProduct.data.data);
      setToppings(responseTopping.data.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch data toppings
  // const fetchToppings = async () => {
  //   try {
  //     setLoading(true);
  //     const responseTopping = await API("/toppings");
  //     setToppings(responseTopping.data.data.data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // fetch data on render
  useEffect(() => {
    fetchProduct();
  //  fetchToppings();
  }, []);

  const [checkedToppings, setCheckedToppings] = useState({});
  const handleChange = (event) => {
    setCheckedToppings({
      ...checkedToppings,
      [event.target.id]: event.target.checked,
    });
  };

  const selectedToppingsId = [];
  for (var key in checkedToppings) {
    if (checkedToppings.hasOwnProperty(key)) {
      checkedToppings[key]
        ? selectedToppingsId.push(key)
        : selectedToppingsId.splice(key, 1);
    }
  }
  //console.log(selectedToppingsId);

  const selectedToppings = selectedToppingsId.map((selectedToppingId) =>
    toppings.find((topping) => topping.id == selectedToppingId)
  );

  //console.log(selectedToppings);
  const subTotal = selectedToppings
    .map((selectedTopping) => selectedTopping.price)
    .reduce((prev, curr) => prev + curr, products.price);
  //console.log(subTotal);

  const handleAddCart = (e) => {
    e.preventDefault();

      console.log(selectedToppingsId);
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          id: products.id,
          product: products,
          toppings: selectedToppings,
          initialPrice: subTotal,
          quantity: 1,
          subTotal: subTotal,
        },
      });
      dispatch({
        type: "SAVE_CART",
      });
      setShowPop(true);
      setMessage("Success added item to cart!");
      setCheckedToppings({})

  };

  return loading || !products || toppings.length < 1 ? (
    <Loading />
  ) : (
    <>
         <Row className="justify-content-md-center">
          <Col xs={4} className="mt-4">
            <img src={products.image} width={"100%"} alt="product" />
          </Col>
          <Col xs={6}>
            <div className="d-flex flex-column justify-content-space-beetwen ">
              <div>
                <h1 className="header3">{products.tittle}</h1>
                <p className="tittlePrice">
                  Rp {products.price.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="header3">Choose Toppings</p>
                <Row className="scroll-toppings">
                  {toppings.map((topping) => (
                    <CardTopping
                      topping={topping}
                      key={topping.id}
                      onChange={handleChange}
                      checked={checkedToppings[topping.id] || false}
                    />
                  ))}
                </Row>
              </div>
              <div>
                <Row>
                  <Col xs={6}>
                    <p className="header3">Subtotal</p>
                  </Col>
                  <Col xs={6} style={{ textAlign: "right" }}>
                    <p className="header3">Rp {subTotal.toLocaleString()}</p>
                  </Col>
                </Row>
              </div>

              <div>
                <Button 
                  className="button1"
                  onClick={handleAddCart}
                  style={{ width: "100%" }}
                  type="submit"
                >
                  Add To Cart
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      <PopUp show={showPop} hide={() => setShowPop(false)} message={message} />
      
    </>
  );
}
export default DetailProduct;
