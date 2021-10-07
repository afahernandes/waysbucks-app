import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Image } from "react-bootstrap";
import { API } from '../config/api';
import attach from "../assets/attach.svg";
import img1 from "../assets/profile.jpg";
import { AppContext } from '../context/AppContext';

function EditProfile() {
    const history = useHistory();
    const [profile, setProfile] = useState({});
    
    const [preview, setPreview] = useState(null); //For image preview
    const [form, setForm] = useState({
      fullname: "",
      email: "",
    });

    console.log("Preview", preview);
    console.log("Profil", form);

    
    
    const getUser = async () => {
        try {
          const getProfile = await API.get("/profile");
          console.log("profiles", getProfile);
          setProfile(getProfile.data.data.users);
          setForm({
            ...form,
            fullname:getProfile.data.data.users.fullname,
            email:getProfile.data.data.users.email,
          });
            } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        getUser();
      }, []);

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
        formData.set("fullname", form.fullname);
        formData.set("email", form.email);
        formData.set("image", preview);
  
        console.log("form",form);
  
        const response = await API.patch("/user", formData, config);
        console.log(response);
  
        history.push("/profile");
      } catch (error) {
        console.log(error);
      }
    };
    const path = "http://localhost:5000/uploads/";
    return (
    <div className="container mt-5  md-10">
        <div className="row text-red">
        <div className="col-md-4">
          <center>
          {preview && preview !== null ? (
            <img src={URL.createObjectURL(preview)} alt="preview" className="box-image" height={"460px"} />
          ) :profile.image ? (  
               <img src={path+profile.image} alt="preview" className="box-image" height={"460px"} />
         
          ) : ( <img src={img1} alt="preview" className="box-image" height={"460px"} />
  
          )}
          </center>
        </div>

              <div className="col-md-8">
          <h3>Update Profile</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mt-5 mb-4">
              <Form.Control
                className="carts-input"
                name="fullname"
                value={form.fullname}
                onChange={(e) => handleChange(e)}
                placeholder="Name"
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                className="carts-input"
                name="email"
                type="email"
                value={form.email}
                min={0}
                onChange={(e) => handleChange(e)}
                placeholder="Email"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="formInputImage mb-5" controlId="ImageUpload">
              <Form.Label className="d-flex justify-content-between">
                <span style={{color:"#8c8b8b"}}>{profile.image}</span>
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
                  Update Profile
                </Button>
              </Form.Group>
            </center>
          </Form>
        </div>
            </div>
        </div>
    );
}

export default EditProfile;