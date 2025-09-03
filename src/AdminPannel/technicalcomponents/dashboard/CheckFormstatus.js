import React from "react";
// import { Link } from "react-router-dom";
import "../../techassets/techcss/TechLeft.css";
import "../../techassets/techcss/TechDashboard.css";
import "../../techassets/techcss/CheckFormstatus.css";
import Searchicon from "../../../assets/images/search-icon.png";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import { Button, Row, Form, Col } from "react-bootstrap";
import TechLeftnav from "../leftnavbar/TechLeftnav";
import NandaTech from "./NandaTech";
import TechFooter from "../footer/TechFooter";
import Accordion from "react-bootstrap/Accordion";
import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
const CheckFormstatus = () => {
  return (
    <>
      <div>
        {/* Main Container */}
        <div className="main-container">
          {/* Navigation */}
          <TechLeftnav />

          {/* Main Content */}

          <div className="main">
            <NandaTech />

            <div className="box-container">
              <div className="nd-tech-heading">
                <h1>Check form status</h1>
              </div>
              <div className="tech-nd-search">
                <label className="mt-2">
                  Enter Registered Mobile no./Aadhar No.
                </label>

                <div className="form search-box mt-2">
                  <i className="search">
                    <img src={Searchicon} alt="search-icon" />
                  </i>

                  <Form.Control
                    type="text"
                    className="form-control form-input"
                    placeholder="Search..."
                  />
                  <span className="left-pan">
                    <Button className="tech-nd-btn-success">
                      fetch form status{" "}
                    </Button>
                  </span>
                </div>
              </div>
              <Row className=" mt-3 tech-mll-0">
                <Col lg={6} md={6} sm={12}>
                  <Row className="tech-nd-status-data">
                    <div className="tech-checkform mt-2">
                      <div class="nd-tech-status">Name </div>
                      <div class="nd-tech-status"> KHUSBOO </div>
                    </div>
                    <div className="tech-checkform">
                      <div class="nd-tech-status">Mobile No. </div>
                      <div class="nd-tech-status">+91 7451-922223 </div>
                    </div>
                    <div className="tech-checkform">
                      <div class="nd-tech-status">Aadhar No. </div>
                      <div class="nd-tech-status">846227855026 </div>
                    </div>
                    <div className="tech-checkform mb-2">
                      <div class="nd-tech-status">Registration Time </div>
                      <div class="nd-tech-status">2024-11-21 12:58:22</div>
                    </div>
                   
                  </Row>
                </Col>

                <Col lg={6} md={6} sm={12} className="accrdion-form">
                  <Accordion className="nd-tech-accordion">
                   <Accordion.Item eventKey="1" className="nd-tech-body">
                      <Accordion.Header className="nd-tech-body">
                        Nanda Praroop 1
                      </Accordion.Header>
                      <Accordion.Body className="nd-tech-body">
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt"
                          >
                            Form ID
                          </Col>
                          <Col lg={9} md={9} sm={12}>
                            Nanda-2024-00010612
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt"
                          >
                            Kanya Name
                          </Col>
                          <Col lg={9} md={9} sm={12}>
                            {" "}
                            अंशिका
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt"
                          >
                            DOB (Y-M-D)
                          </Col>
                          <Col lg={9} md={9} sm={12}>
                            {" "}
                            2024-09-26
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt"
                          >
                            Father Name
                          </Col>
                          <Col lg={9} md={9} sm={12}>
                            {" "}
                            बलवेन्द्र सिंह
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt"
                          >
                            Mother Name
                          </Col>
                          <Col lg={9} md={9} sm={12}>
                            {" "}
                            अनुष्का
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt"
                          >
                            District
                          </Col>
                          <Col lg={9} md={9} sm={12}>
                            {" "}
                            Usnagar
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt"
                          >
                            Project
                          </Col>
                          <Col lg={9} md={9} sm={12}>
                            {" "}
                            Bazpur [0506701]
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt"
                          >
                            AWC (AWC/MINI AWC)
                          </Col>
                          <Col lg={9} md={9} sm={12}>
                            {" "}
                            MACHLI MOHALLA 1(AWC)
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt"
                          >
                            AWC Code
                          </Col>
                          <Col lg={9} md={9} sm={12}>
                            {" "}
                            5067010308
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt"
                          >
                            AWC Code
                          </Col>
                          <Col lg={9} md={9} sm={12}>
                            {" "}
                            5060030417
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            className="nd-personalID-txt nd-steps-checks"
                          >
                            Step 1
                          </Col>
                          <Col
                            lg={9}
                            md={9}
                            sm={9}
                            className="personalID-complete"
                          >
                            {" "}
                            <div className="nd-check">
                              <FaCheckCircle />
                            </div>
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt nd-steps-checks"
                          >
                            Step 2
                          </Col>
                          <Col
                            lg={9}
                            md={9}
                            sm={12}
                            className="personalID-complete"
                          >
                            {" "}
                            <FaCheckCircle />
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt nd-steps-checks"
                          >
                            Step 3
                          </Col>
                          <Col
                            lg={9}
                            md={9}
                            sm={12}
                            className="personalID-complete"
                          >
                            {" "}
                            <FaCheckCircle />
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt nd-steps-checks"
                          >
                            Step 4
                          </Col>
                          <Col
                            lg={9}
                            md={9}
                            sm={12}
                            className="personalID-complete"
                          >
                            {" "}
                            <FaCheckCircle />
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2" className="nd-tech-body">
                      <Accordion.Header className="nd-tech-header">
                        Nanda Praroop 2 (2023)
                      </Accordion.Header>
                      <Accordion.Body>No Data (2023)</Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3" className="nd-tech-body">
                      <Accordion.Header className="nd-tech-header">
                        Nanda Praroop 2(2024)
                      </Accordion.Header>
                      <Accordion.Body className="nd-tech-header">
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt"
                          >
                            Form ID
                          </Col>
                          <Col lg={9} md={9} sm={12}>
                            Nanda(Praroop2)-2024-000650
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt"
                          >
                            Girl Name
                          </Col>
                          <Col lg={9} md={9} sm={12}>
                            {" "}
                            vishtest
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt"
                          >
                            DOB (Y-M-D)
                          </Col>
                          <Col lg={9} md={9} sm={12}>
                            {" "}
                            2002-01-01
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt"
                          >
                            Father Name
                          </Col>
                          <Col lg={9} md={9} sm={12}>
                            {" "}
                            testing3
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt"
                          >
                            Mother Name
                          </Col>
                          <Col lg={9} md={9} sm={12}>
                            {" "}
                            testing
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt"
                          >
                            District
                          </Col>
                          <Col lg={9} md={9} sm={12}>
                            {" "}
                            Dehradun
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt"
                          >
                            Project
                          </Col>
                          <Col lg={9} md={9} sm={12}>
                            {" "}
                            Doiwala [0506003]
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt"
                          >
                            Sector
                          </Col>
                          <Col lg={9} md={9} sm={12}>
                            {" "}
                            CHHIDDARWALA [04]
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt"
                          >
                            AWC (AWC/MINI AWC)
                          </Col>
                          <Col lg={9} md={9} sm={12}>
                            {" "}
                            KHAIRI KALA(AWC)
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt"
                          >
                            AWC Code
                          </Col>
                          <Col lg={9} md={9} sm={12}>
                            {" "}
                            5060030417
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={3}
                            className="nd-personalID-txt nd-steps-checks"
                          >
                            Step 1
                          </Col>
                          <Col
                            lg={9}
                            md={9}
                            sm={9}
                            className="personalID-complete"
                          >
                            {" "}
                            <div className="nd-check">
                              <FaCheckCircle />
                            </div>
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt nd-steps-checks"
                          >
                            Step 2
                          </Col>
                          <Col
                            lg={9}
                            md={9}
                            sm={12}
                            className="personalID-complete"
                          >
                            {" "}
                            <FaCheckCircle />
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt nd-steps-checks"
                          >
                            Step 3
                          </Col>
                          <Col
                            lg={9}
                            md={9}
                            sm={12}
                            className="personalID-complete"
                          >
                            {" "}
                            <FaCheckCircle />
                          </Col>
                        </Row>
                        <Row className="nd-personalinfo nd-personalID">
                          <Col
                            lg={3}
                            md={3}
                            sm={12}
                            className="nd-personalID-txt nd-steps-checks"
                          >
                            Step 4
                          </Col>
                          <Col
                            lg={9}
                            md={9}
                            sm={12}
                            className="personalID-pendding"
                          >
                            {" "}
                            <IoCloseCircle />
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>
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

export default CheckFormstatus;
