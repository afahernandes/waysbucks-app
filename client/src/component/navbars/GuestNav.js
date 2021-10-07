import {useState} from 'react';
import {Button, Nav} from 'react-bootstrap';
import RegisterModal from '../modals/RegisterModal';
import LoginModal from '../modals/LoginModal';

function GuestNav(props) {
    const [show, setShow] = useState(false);
    const [showRegis, setShowRegis] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const handleShowRegis = () => setShowRegis(true);
    const handleCloseRegis = () => setShowRegis(false);
  
   
    return (
        <div>
            <Nav>
            <Button onClick={handleShow} variant="outline-red"  className="button2">Login</Button>
                <Button onClick={handleShowRegis} variant="red"  className="button2">Register</Button>
                
              <LoginModal show={show} handleClose={handleClose} regis={handleShowRegis} setData={props.setData} />
              <RegisterModal show={showRegis} handleClose={handleCloseRegis} login={handleShow}/>
            </Nav>
        </div>
    )
};

export default GuestNav;