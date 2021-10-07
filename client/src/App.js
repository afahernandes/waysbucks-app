import React, { useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./component/navbars/Header";
import "./styles/styles.css";
import DetailProduct from "./pages/DetailProduct";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";
import Transactions from "./pages/Transactions";

import { Container, Row } from "react-bootstrap";

import AddProduct from "./pages/AddProduct";
import AddTopping from "./pages/AddTopping";
import Profile from "./pages/Profile";
import AdminRoute from "./component/routes/AdminRoute";
import PrivateRoute from "./component/routes/PrivateRoute";
import { API, setAuthToken } from "./config/api";
import { AppContext } from "./context/AppContext";
import EditProfile from "./pages/EditProfile";

// init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(AppContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, [state]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await API.get("/check-auth");
        if (response.status === 404) {
          return dispatch({
            type: "AUTH_ERROR",
          });
        }
        let payload = response.data.data.user;
        payload.token = localStorage.token;

        dispatch({
          type: "USER_SUCCESS",
          payload,
        });
        dispatch({
          type: "UPDATE_CART",
        });
      } catch (error) {
        console.log(error);
      }
    };
    checkUser();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Container>
          <Row className="justify-content-md-center">
            <Switch>
              <Route path="/" exact component={Home} />
              <PrivateRoute path="/profile" exact component={Profile} />
              <PrivateRoute path="/editprofile" exact component={EditProfile} />
              <PrivateRoute path="/product/:id" exact component={DetailProduct} />
              <PrivateRoute path="/cart" exact component={CartPage} />

              <AdminRoute path="/transaction" exact component={Transactions} />
              <AdminRoute path="/addproduct" exact component={AddProduct} />
              <AdminRoute path="/addtopping" exact component={AddTopping} />
              <Route component={NotFound} />
            </Switch>
          </Row>
        </Container>
      </div>
    </Router>
  );
}
export default App;
