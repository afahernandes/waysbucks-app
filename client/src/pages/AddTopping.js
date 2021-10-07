import React, { useState } from "react";
import { Form, Button, Image } from "react-bootstrap";
import attach from "../assets/attach.svg";
import { API } from "../config/api";
import img1 from "../assets/imagenull.jpg";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

function AddTopping() {
const history=useHistory();
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    price: "",
    name: "",
  });
  console.log("Preview", preview);
  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("name", form.name);
      formData.set("price", form.price);
      formData.set("image", preview);

      console.log(form);
      const response = await API.post("/topping", formData, config);
      console.log(response);
      Swal.fire(
        "Success",
        "Success Add Topping",
        "success"
      ); 
      history.push("/addtopping");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mt-5">
      <div className="row text-red">
        <div className="col-md-7">
          <h3>Topping</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mt-5 mb-4">
              <Form.Control
                className="carts-input"
                name="name"
                onChange={(e) => handleChange(e)}
                placeholder="Topping Name"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                className="carts-input"
                name="price"
                type="number"
                min={0}
                onChange={(e) => handleChange(e)}
                placeholder="Price"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="formInputImage mb-5" controlId="ImageUpload">
              <Form.Label className="d-flex justify-content-between">
              <span style={{color:"#8c8b8b"}}>Upload File</span>
                <Form.Control
                  name="image"
                  onChange={(e) => {
                    setPreview(e.target.files[0]);
                    // setImage(e.target.files[0].name);
                  }}
                  type="file"
                  hidden
                />
                <Image src={attach} style={{ width: "14px" }} />
              </Form.Label>
            </Form.Group>

            <center>
              <Form.Group className="formGroup">
                <Button
                  type="submit"
                  className="button1 "
                  style={{ width: "90%" }}
                  block
                >
                  Add Topping
                </Button>
              </Form.Group>
            </center>
          </Form>
        </div>
        <div className="col-md-5">
        <center>
          {preview && preview !== null ? (
            <img src={URL.createObjectURL(preview)} alt="preview" width="80%" height="550px"  />
          ) : ( <img src={img1} alt="preview" width="80%" height="550px" />
  
          )}
          </center>
        </div>
      </div>
    </div>
  );
}

export default AddTopping;
