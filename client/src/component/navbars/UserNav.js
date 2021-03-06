import { useHistory } from "react-router-dom";
import { Nav, Dropdown, Image } from "react-bootstrap";
import cart from "../../assets/cart.svg";
import logout from "../../assets/logout.svg";
import user from "../../assets/user.svg";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import img1 from "../../assets/profile.jpg";

import { API} from "../../config/api";
function UserNav(props) {
  const router = useHistory();
  
  const [state, dispatch] = useContext(AppContext);
  const [profile, setProfile] = useState({});

  console.log("profile",profile)
  const goToProfile = () => router.push("/profile");
  const goToCart = () => router.push("/cart");
  
  const getUser = async () => {
    try {
   //   setWait(true)
      const getProfile = await API.get("/profile");
      setProfile(getProfile.data.data.users);
  //  setWait(false)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, [state]);

  console.log("Len",state.cart.length)
const path="http://localhost:5000/uploads/";
  return (
    <>
      <Nav.Link onClick={goToCart}>
        <Image src={cart} alt="cart" style={{ marginTop: "6px" }} />
        {state.cart.length > 0 ? 
                    (<span className="cart-notif" >{state.cart.length}</span>):""
                }
      </Nav.Link>
      <Dropdown as={Nav.Item} className="ml-3" >
        <Dropdown.Toggle as={Nav.Link} style={{ marginRight: "10px" }}>
          {profile.image ? (
            <Image
              src={path+profile.image}
              alt="profile"
              style={{
                width: "50px",
                height: "50px",
                position: "relative",
                transform: "translate(15px, -3px)",
              }}
              className="img-avatar"
            />
          ) : (
            <Image
              src={img1}
              alt="profile"
              className="img-avatar"
              style={{
                width: "50px",
                height: "50px",
                position: "relative",
                transform: "translate(15px, -3px)",
              }}
            />
          )}
        </Dropdown.Toggle>
        <Dropdown.Menu align="right" className="dropdown-menu" >
          <Dropdown.Item onClick={goToProfile} >
            <Image src={user} alt="profile" className="img-icon mr-3" />
            Profile
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={props.handleLogout}>
            <Image src={logout} alt="logout" className="img-icon mr-3" />
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default UserNav;
