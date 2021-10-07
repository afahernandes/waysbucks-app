import React, {  useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { API } from "../../config/api";
import Swal from "sweetalert2";

function RegisterModal(props) {
  const { handleClose, show, login } = props;
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
  });

  function toSwitch() {
    handleClose();
    login();
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(formData);
      const response = await API.post("/register", body, config);

      console.log(response);

      // Notification
      if (response.status === 200) {
        Swal.fire({
          text: "Success create account !",
          icon: 'success',
          confirmButtonColor: 'red',
        }).then(
          handleClose
        )
      } else {
        Swal.fire({
          text: "Failed create account !",
          icon: 'error',
          confirmButtonColor: 'red',
        })
      }
    } catch (error) {
      Swal.fire({
        text: "Failed create account !",
        icon: 'error',
        confirmButtonColor: 'red',
      })
      console.log(error);
    }
  };

  function handleChange(e) {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Body>
          <Form onSubmit={handleOnSubmit}>
            <h2 style={{ color: "red" }}>
              <b>Register</b>
            </h2>
            <Form.Group className="formGroup" controlId="formBasicEmail">
              <Form.Label className="fromLabel">Email address</Form.Label>
              <Form.Control
                className="formInput"
                onChange={(e) => handleChange(e)}
                type="email"
                name="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="formGroup" controlId="formBasicPassword">
              <Form.Label className="fromLabel">Password</Form.Label>
              <Form.Control
                className="formInput"
                onChange={(e) => handleChange(e)}
                type="password"
                name="password"
                placeholder="Enter Password"
              />
            </Form.Group>
            <Form.Group className="formGroup" controlId="formBasicFullname">
              <Form.Label className="fromLabel">Full Name</Form.Label>
              <Form.Control
                className="formInput"
                onChange={(e) => handleChange(e)}
                type="text"
                name="fullname"
                placeholder="Enter Fullname"
              />
            </Form.Group>
            <Button className="button1" style={{ width: "100%" }} type="submit">
              Register
            </Button>

            <Form.Label className="formLabelCenter">
              Already have an account ?
              <Form.Label onClick={toSwitch}>
                <b>Click Here</b>
              </Form.Label>
            </Form.Label>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default RegisterModal;
