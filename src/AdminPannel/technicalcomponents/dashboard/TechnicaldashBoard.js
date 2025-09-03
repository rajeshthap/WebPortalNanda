import React from "react";
import "../../techassets/techcss/TechLeft.css";
import "../../techassets/techcss/TechDashboard.css";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import BornBoby from "../PieChart/BornBaby";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import { Row, Col } from "react-bootstrap";
import dashICon from "../../../assets/images/girls-dash-icon.png"
import BornICon from "../../../assets/images/Born-Girl-icon.png"
import TechLeftnav from "../leftnavbar/TechLeftnav";
import NandaTech from "./NandaTech";
import TechFooter from "../footer/TechFooter";
const TechnicaldashBoard = () => {
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
                <h1>Dashboard-Technical Department Login login</h1>
              </div>
              <Row>
                <Col lg={4} md={4} sm={12} className="mb-2">
                  <Card>
                    <Card.Body>
                      <Row>
                        <Col lg={12} md={12} sm={12}>
                          <Card.Title>कन्या के जन्म पर</Card.Title></Col>
                        <Col lg={12} md={12} sm={12}>
                          <Form.Select aria-label="Default select example" className="tech-select">
                            <option>Select State</option>
                            <option value="almora">Almora</option>
                            <option value="bageshwar">Bageshwar</option>
                            <option value="chamoli">Chamoli</option>
                            <option value="champawat">Champawat</option>
                            <option value="dehradun">Dehradun</option>
                            <option value="haridwar">Haridwar</option>
                            <option value="nanital">Nanital</option>
                            <option value="pauri">Pauri Garhwal</option>
                            <option value="pithoragarh">Pithoragarh</option>
                            <option value="rudraprayag">Rudraprayag</option>
                            <option value="tehri">Tehri Garhwal</option>
                            <option value="usnagar">Usnagar</option>
                            <option value="uttarkashi">Uttarkashi</option>
                          </Form.Select></Col>
                      </Row>
                      <Card.Text>
                        <BornBoby />
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={4} md={4} sm={12} className="mb-2">
                  <Card>
                    <Card.Body>
                      <Row>
                        <Col lg={12} md={12} sm={12}>
                          <Card.Title>बालिका के इंटर उत्तीर्ण करने पर</Card.Title></Col>
                        <Col lg={12} md={12} sm={12}>
                          <Form.Select aria-label="Default select example" className="tech-select">
                            <option>Select State</option>
                            <option value="almora">Almora</option>
                            <option value="bageshwar">Bageshwar</option>
                            <option value="chamoli">Chamoli</option>
                            <option value="champawat">Champawat</option>
                            <option value="dehradun">Dehradun</option>
                            <option value="haridwar">Haridwar</option>
                            <option value="nanital">Nanital</option>
                            <option value="pauri">Pauri Garhwal</option>
                            <option value="pithoragarh">Pithoragarh</option>
                            <option value="rudraprayag">Rudraprayag</option>
                            <option value="tehri">Tehri Garhwal</option>
                            <option value="usnagar">Usnagar</option>
                            <option value="uttarkashi">Uttarkashi</option>
                          </Form.Select></Col>
                      </Row>
                      <Card.Text>
                        <BornBoby />
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={4} md={4} sm={12} className="mb-2">
                  <Card>
                    <Card.Body>
                      <Row>
                        <Col lg={12} md={12} sm={12}>
                          <Card.Title>नारी निकेतन, अनाथ आश्रम में पलने वाली बालिका के इंटर उत्तीर्ण करने पर</Card.Title></Col>
                        <Col lg={12} md={12} sm={12}>
                          <Form.Select aria-label="Default select example" className="tech-select">
                            <option>Select State</option>
                            <option value="almora">Almora</option>
                            <option value="bageshwar">Bageshwar</option>
                            <option value="chamoli">Chamoli</option>
                            <option value="champawat">Champawat</option>
                            <option value="dehradun">Dehradun</option>
                            <option value="haridwar">Haridwar</option>
                            <option value="nanital">Nanital</option>
                            <option value="pauri">Pauri Garhwal</option>
                            <option value="pithoragarh">Pithoragarh</option>
                            <option value="rudraprayag">Rudraprayag</option>
                            <option value="tehri">Tehri Garhwal</option>
                            <option value="usnagar">Usnagar</option>
                            <option value="uttarkashi">Uttarkashi</option>
                          </Form.Select></Col>
                      </Row>
                      <Card.Text>
                        <BornBoby />
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="">
                <Col lg={6} md={6} sm={12} className="mb-2">
                  <div className="card texh-nd-dashdata">
                    <div className="card-body card-body tech-nd-data">
                      <div className="d-flex flex-shrink-0 me-3 tech-nd-title mb-2">
                        <div className="avatar ">
                          <div className="avatar-title  "> <img src={dashICon} alt="search-icon" /><i className="bx bxs-pie-chart-alt text-white"></i></div>
                        </div> <div className="tech-nd-sub">Total Submitted Form(12 girls)</div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div class="flex-grow-1">
                          <p class="mb-1 tech-nd-card-title">Step</p>
                          <h4 className="mb-0">Total Submitted</h4>
                          <h4 className="mb-0">Feedback by Supervisor</h4>
                          <h4 className="mb-0">Feedback by CDPO</h4>
                        </div>
                        <div class="flex-grow-1">
                          <p class="mb-1 tech-nd-card-title">Total Forms</p>
                          <h4 className="mb-0">31490</h4>
                          <h4 className="mb-0">31491</h4>
                          <h4 className="mb-0">31462</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12} className="mb-2">
                  <div className="card texh-nd-dashdata1">
                    <div className="card-body card-body tech-nd-data">
                      <div className="d-flex flex-shrink-0 me-3 tech-nd-title mb-3">
                        <div className="avatar-title1 ">
                          <div className="avatar-title  "> <img src={BornICon} alt="search-icon" /><i className="bx bxs-pie-chart-alt text-white"></i></div>
                        </div> <div className="tech-nd-sub">Total Submitted Form(New Born Girl)</div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div class="flex-grow-1">
                          <p class=" mb-1 tech-nd-card-title1">Step</p>
                          <h4 className="mb-0">Total Submitted</h4>
                          <h4 className="mb-0">Feedback by Supervisor</h4>
                          <h4 className="mb-0">Feedback by CDPO</h4>
                        </div>
                        <div class="flex-grow-1">
                          <p class=" mb-1 tech-nd-card-title1">Total Forms</p>
                          <h4 className="mb-0">8578</h4>
                          <h4 className="mb-0">8081</h4>
                          <h4 className="mb-0">7466</h4>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default TechnicaldashBoard;
