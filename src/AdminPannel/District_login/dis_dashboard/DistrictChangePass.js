import React from "react";
import "../../techassets/techcss/TechLeft.css";
import "../../techassets/techcss/TechDashboard.css";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import { Row, Col, Form, Button } from "react-bootstrap";
import TechFooter from "../../technicalcomponents/footer/TechFooter";
import "../../Project_login/pro_assests/ProjectLeftnav.css";
import "../../Directorate_login/direc_assets/css/DirectorateDashboard.css";
import "../../Project_login/pro_assests/ChangePassword.css";
import DistrictNandaGoura from "./DistrictNandaGoura";
import DistrictLeftNav from "../dis_leftnav/DistrictLeftNav";
import "../../District_login/dis_assets/CSS/DistrictChangePassword.css";

const DistrictChangePass = () => {
  return (
    <>
      <div>
        {/* Main Container */}
        <div className="main-container">
          {/* Navigation */}
          <DistrictLeftNav />
          {/* Main Content */}
          <div className="main">
            <DistrictNandaGoura />
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
                        <Form.Label>District</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Rudraprayag" disabled
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
                        <Form.Label>DPO Incharge</Form.Label>
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
                        <Form.Label>DPO Mobile No.</Form.Label>
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

export default DistrictChangePass;
