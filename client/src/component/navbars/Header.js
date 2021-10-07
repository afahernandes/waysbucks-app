import React, { useContext } from "react";
import { Navbar, Container, Nav,  NavLink } from "react-bootstrap";
import Icon from "../../assets/brandlogo.svg";
import GuestNav from "./GuestNav";
import AdminNav from "./AdminNav";
import UserNav from "./UserNav";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppContext";


function Header() {
  const router = useHistory();
  const [state, dispatch] = useContext(AppContext);
  
  function handleLogout(){
      dispatch({
        type: "LOGOUT",
      });
      router.push('/');
    }

    function hadleHome(){
      
        router.push('/');
      }
  

  return (
    <div>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand>
            <NavLink >
              
              <img src={Icon} onClick={hadleHome} style={{padding: '4px'}} alt="brand" />
            </NavLink>
          </Navbar.Brand>
            <Nav className="me-auto"></Nav>
            <Nav>
              {state.isLogin?(state.user.role==="Administrator"?<AdminNav  handleLogout={handleLogout}/> : <UserNav handleLogout={handleLogout}  /> ) : <GuestNav />}
            </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
