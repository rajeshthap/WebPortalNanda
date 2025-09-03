import React from "react";
import "../../techassets/techcss/TechLeft.css";
import "../../techassets/techcss/TechDashboard.css";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import { Row, Col, Form, Button } from "react-bootstrap";
import TechFooter from "../../technicalcomponents/footer/TechFooter";
import "../../Project_login/pro_assests/ProjectLeftnav.css";
import "../../Directorate_login/direc_assets/css/DirectorateDashboard.css";
import ProjectLeftNav from "../project_leftnav/ProjectLeftNav";
import "../../Project_login/pro_assests/ChangePassword.css";
import ProjectNandaGaura from "./ProjectNandaGaura";

const ChangePassword = () => {
  return (
    <>
      <div>
        {/* Main Container */}
        <div className="main-container">
          {/* Navigation */}
          <ProjectLeftNav />
          {/* Main Content */}
          <div className="main">
            <ProjectNandaGaura />
            <div className="box-container">
              <div className="nd-tech-heading">
                <h1>Profile Details</h1>
              </div>
              <Row>
                <Form>
                  <Row>
                    <Col lg={4} md={4} sm={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Login Type</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Garud" disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control
                             type="password" disabled value="........"
                          
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>CDPO Incharge</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Manju(INCHARGE)"  disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>CDPO Mobile No.</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="9876543210"  disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Type New Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Type New Password"
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Confirm your Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Confirm your Password"
                        />
                      </Form.Group>
                    </Col>
                    <div className="project-btn">
                    <Button className="pro-edit-btn">Edit Password</Button>
                    <Button className="pro-cancel-btn">Cancel</Button>
                    </div>
                  </Row>
                </Form>
              </Row>
            </div>
            <div>
              <TechFooter />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
