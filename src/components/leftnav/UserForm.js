import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import "../../assets/css/ModalOne.css";

function UserForm() {
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isUserIdPresent = localStorage.getItem("user_id");
    const isFormIdPresent = localStorage.getItem("form_id");
    console.log("user_id all",isUserIdPresent)
    console.log("form_id all",isFormIdPresent)
    // if (isUserIdPresent || isFormIdPresent) {
    //   setAlreadySubmitted(true);
    //   console.log("User has already submitted the form.");
    // } else {
    //   setAlreadySubmitted(false);
    // }
  }, []);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = () => {
   if (!isChecked) {
      alert("Please check the box before continuing.");
      return;
    }
    navigate("/NandaStepOne");
    
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <div className="text-center text-white">
            <Form className="d-flex align-items-center justify-content-center">
             
              
            </Form>
            
            <button className="nd-chek-box" >
             <Form.Check
                type="checkbox"
                id="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              
              /> <div onClick={handleSubmit}>ऑनलाइन आवेदन </div>
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default UserForm;