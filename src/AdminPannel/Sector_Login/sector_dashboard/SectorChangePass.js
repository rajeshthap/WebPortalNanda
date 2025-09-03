import React from "react";
import "../../techassets/techcss/TechLeft.css";
import "../../techassets/techcss/TechDashboard.css";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import { Row, Col, Form, Button } from "react-bootstrap";
import TechFooter from "../../technicalcomponents/footer/TechFooter";
import "../../Project_login/pro_assests/ProjectLeftnav.css";
import "../../Directorate_login/direc_assets/css/DirectorateDashboard.css";
import "../../Project_login/pro_assests/ChangePassword.css";
import SectorNandaGaura from "./SectorNandaGaura";
import SectorLeftNav from "../sectorleftnav/SectorLeftNav";
import "../../District_login/dis_assets/CSS/DistrictChangePassword.css";

const SectorChangePass = () => {
  return (
    <>
      <div>
        {/* Main Container */}
        <div className="main-container">
          {/* Navigation */}
          <SectorLeftNav />
          {/* Main Content */}
          <div className="main">
            <SectorNandaGaura />
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
                          placeholder="GUPTAKASHI [01]" disabled
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
                        <Form.Label>Supervisor Incharge</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Dr Akhilesh Mishra"  disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Supervisor Mobile No.</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="9411320889"  disabled
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
                    <Button className="pro-edit-btn dis-edit-btn">Edit Password</Button>
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

export default SectorChangePass;
