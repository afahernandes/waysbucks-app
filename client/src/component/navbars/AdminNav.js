import { useHistory } from 'react-router-dom';
import { Nav, Dropdown, Image } from 'react-bootstrap';
import { useContext } from 'react';

import img1 from "../../assets/brandlogo.svg";
import img2 from "../../assets/transaction.svg";
import img3 from "../../assets/product.svg";
import img4 from "../../assets/topping.svg";
import img5 from "../../assets/logout.svg";
import { AppContext } from '../../context/AppContext';

function AdminNav(props) {
    const router = useHistory();
    const [state, dispatch] = useContext(AppContext);
   
    console.log("STATE",state)
    const goToTransaction = () => { router.push('/transaction') };
    const goToAddProduct = () => { router.push('/addproduct') };
    const goToAddTopping = () => { router.push('/addtopping') };
  
   
    
    return (
        <div>
            <Nav >
                <Dropdown >
                    <Dropdown.Toggle as={Nav.Link} style={{marginRight:'10px'}}><Image src={img1} alt="account" style={{width:"60px",height:"60px", position : 'relative' , transform : 'translate(15px, -3px)'}} /></Dropdown.Toggle>
                    <Dropdown.Menu align="right"  className="dropdown-menu" >
                        <Dropdown.Item onClick={goToTransaction} className="mb-3"><img src={img2} alt="profile" className="img-icon mr-3" />Transactions</Dropdown.Item>
                        <Dropdown.Item onClick={goToAddProduct} className="mb-3"><img src={img3} alt="profile" className="img-icon mr-3" />Add Product</Dropdown.Item>
                        <Dropdown.Item onClick={goToAddTopping} className="mb-3"><img src={img4} alt="profile" className="img-icon mr-3" />Add Topping</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={props.handleLogout}><img src={img5} alt="profile" className="img-icon mr-3" />Log Out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>
        </div>
    )
};

export default AdminNav;