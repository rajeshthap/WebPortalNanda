import React from "react";
import "../../techassets/techcss/TechLeft.css";
import "../../techassets/techcss/TechDashboard.css";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import { Row, Col } from "react-bootstrap";
import dashICon from "../../../assets/images/girls-dash-icon.png";

import NandaTech from "../../technicalcomponents/dashboard/NandaTech";
import TechFooter from "../../technicalcomponents/footer/TechFooter";
import DirectorateLeftnav from "../leftnavigation/DirectorateLeftnav";
import "../../Directorate_login/direc_assets/css/DirectorateDashboard.css";
import NewBorn from "../../../assets/images/Born-Girl-icon.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const DirectorateDashboard = () => {
  return (
    <>
      <div>
        {/* Main Container */}
        <div className="main-container">
          {/* Navigation */}
          <DirectorateLeftnav />
          {/* Main Content */}
          <div className="main">
            <NandaTech />
            <div className="box-container">
              <div className="nd-tech-heading">
                <h1>Dashboard Application Received on this Portal 2024</h1>
              </div>
              <Row className="">
                <Col lg={6} md={6} sm={12} className="mb-2">
                  <div className="nd-tech-heading1">
                    <h2>Total Submited Form (12th girls)</h2>
                  </div>
                  <Row>
                    <Col lg={12} md={12} sm={12} className="d-flex">
                      <div class="card girlsbox flex-fill ">
                        <div class="card-body">
                          <Row>
                            <div className="col-md-9 col-lg-9 col-sm-9  ">
                              {" "}
                              <h1 class="text-dark-white nd-praroop-heading">
                                Praroop
                              </h1>
                              <div class="d-flex justify-content-between align-content-center">
                                <div className="direc-dashboard"> Steps</div>
                                <div className="direc-dashboard">
                                  {/* N0. of App... */}
                                  <OverlayTrigger
                                    overlay={
                                      <Tooltip id="tooltip-disabled ">
                                        Number of Application
                                      </Tooltip>
                                    }
                                  >
                                    <span className="d-inline-block">
                                      <span>N0. of App...</span>
                                    </span>
                                  </OverlayTrigger>
                                </div>
                              </div>
                              <div class="d-flex justify-content-between align-content-center">
                                <div className="direc-praroop-data">
                                  Praroop 2
                                </div>
                                <div className="direc-praroop-data">5000</div>
                              </div>
                              <div class="d-flex justify-content-between align-content-center">
                                <div className="direc-praroop-data">
                                  Praroop 3
                                </div>
                                <div className="direc-praroop-data">5000</div>
                              </div>
                              <div class="d-flex justify-content-between align-content-center">
                                <div className="direc-praroop-data direc-praroop-data1">
                                  Total Submitted (Praroop 2 + Praroop 3)
                                </div>
                                <div className="direc-praroop-data">30310</div>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3 col-sm-3">
                              <div class="ms-auto directorate ">
                                <div className="direc-icon text-center">
                                  <i class=" display-5 op-3 text-dark">
                                    {" "}
                                    <img
                                      src={dashICon}
                                      alt="dashICon"
                                      className="img-fluid"
                                    />
                                  </i>
                                </div>
                              </div>
                            </div>
                          </Row>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={6} md={6} sm={6} className="d-flex">
                      <div class="bg-praroop-feedback card flex-fill">
                        <div class="card-body">
                          <Row>
                            <div className="col-md-12 col-lg-12 col-sm-12 ">
                              {" "}
                              <h1 class="text-dark-white nd-praroop-heading">
                                Feedback
                              </h1>
                              <div class="d-flex justify-content-between align-content-center">
                                <div className="direc-dashboard">Steps</div>
                                <div className="direc-dashboard">
                                  {/* N0. of App... */}
                                  <OverlayTrigger
                                    overlay={
                                      <Tooltip id="tooltip-disabled">
                                        Number of Application
                                      </Tooltip>
                                    }
                                  >
                                    <span className="d-inline-block">
                                      <span>N0. of App...</span>
                                    </span>
                                  </OverlayTrigger>
                                </div>
                              </div>
                              <div class="d-flex justify-content-between align-content-center">
                                <div className="direc-praroop-data">
                                  supervisore
                                </div>
                                <div className="direc-praroop-data">30012</div>
                              </div>
                              <div class="d-flex justify-content-between align-content-center">
                                <div className="direc-praroop-data">CDPO</div>
                                <div className="direc-praroop-data">27122</div>
                              </div>
                            </div>
                          </Row>
                        </div>
                      </div>
                    </Col>
                    <Col lg={6} md={6} sm={6} className="nd-m-t">
                      <div class="bg-praroop-appo card">
                        <div class="card-body">
                          <Row>
                            <div className="col-md-12 col-lg-12 col-sm-12  ">
                              {" "}
                              <h1 class="text-dark-white nd-praroop-heading">
                                CDPO
                              </h1>
                              <div class="d-flex justify-content-between align-content-center">
                                <div className="direc-dashboard">Steps</div>
                                <div className="direc-dashboard">
                                  {/* N0. of App... */}
                                  <OverlayTrigger
                                    overlay={
                                      <Tooltip id="tooltip-disabled">
                                        Number of Application
                                      </Tooltip>
                                    }
                                  >
                                    <span className="d-inline-block">
                                      <span>N0. of App...</span>
                                    </span>
                                  </OverlayTrigger>
                                </div>
                              </div>
                              <div class="d-flex justify-content-between align-content-center">
                                <div className="nd-approved">Approved</div>
                                <div className="nd-approved">27122</div>
                              </div>
                              <div class="d-flex justify-content-between align-content-center">
                                <div className="nd-approved">Rejected CDPO</div>
                                <div className="nd-approved">257</div>
                              </div>
                            </div>
                          </Row>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>

                <Col lg={6} md={6} sm={12} className="mb-2">
                  <div className="nd-tech-heading1">
                    <h2>Total Submited Form (New Born girls)</h2>
                  </div>
                  <Row>
                    <Col lg={12} md={12} sm={12}>
                      <div class="bornbox card">
                        <div class="card-body">
                          <Row>
                            <div className="col-md-9 col-lg-9 col-sm-9  ">
                              {" "}
                              <h1 class="text-dark-white nd-praroop-heading">
                                Praroop
                              </h1>
                              <div class="d-flex justify-content-between align-content-center">
                                <div className="direc-dashboard">Steps</div>
                                <div className="direc-dashboard">
                                  {/* N0. of App... */}
                                  <OverlayTrigger
                                    overlay={
                                      <Tooltip id="tooltip-disabled">
                                        Number of Application
                                      </Tooltip>
                                    }
                                  >
                                    <span className="d-inline-block">
                                      <span>N0. of App...</span>
                                    </span>
                                  </OverlayTrigger>
                                </div>
                              </div>
                              <div class="d-flex justify-content-between align-content-center">
                                <div className="direc-praroop-data">
                                  Feedback by Supervisore
                                </div>
                                <div className="direc-praroop-data">8313</div>
                              </div>
                              <div class="d-flex justify-content-between align-content-center">
                                <div className="direc-praroop-data">
                                  Feedback by CDPO
                                </div>
                                <div className="direc-praroop-data ">7796</div>
                              </div>
                              <div class="d-flex justify-content-between align-content-center">
                                <div className="direc-praroop-data direc-praroop-data1">
                                  Total Submitted (Praroop 2 + Praroop 3)
                                </div>
                                <div className="direc-praroop-data direc-praroop-data1">
                                  8796
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-3 col-sm-3">
                              <div class="ms-auto directorate ">
                                <div className="direc-icon text-center">
                                  <i class=" display-5 op-3 text-dark">
                                    {" "}
                                    <img
                                      src={NewBorn}
                                      alt="dashICon"
                                      className="img-fluid"
                                    />
                                  </i>
                                </div>
                              </div>
                            </div>
                          </Row>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={6} md={6} sm={6}>
                      <div class="bg-praroop-feedback card">
                        <div class="card-body">
                          <Row>
                            <div className="col-md-12 col-lg-12 col-sm-12  ">
                              {" "}
                              <h1 class="text-dark-white nd-praroop-heading">
                                Feedback
                              </h1>
                              <div class="d-flex justify-content-between align-content-center">
                                <div className="direc-dashboard">Steps</div>
                                <div className="direc-dashboard">
                                  {/* N0. of App... */}
                                  <OverlayTrigger
                                    overlay={
                                      <Tooltip id="tooltip-disabled">
                                        Number of Application
                                      </Tooltip>
                                    }
                                  >
                                    <span className="d-inline-block">
                                      <span>N0. of App...</span>
                                    </span>
                                  </OverlayTrigger>
                                </div>
                              </div>
                              <div class="d-flex justify-content-between align-content-center">
                                <div className="direc-praroop-data">
                                  Supervisore
                                </div>
                                <div className="direc-praroop-data">30012</div>
                              </div>
                              <div class="d-flex justify-content-between align-content-center">
                                <div className="direc-praroop-data">CDPO</div>
                                <div className="direc-praroop-data">27122</div>
                              </div>
                            </div>
                          </Row>
                        </div>
                      </div>
                    </Col>
                    <Col lg={6} md={6} sm={6} className="nd-m-t">
                      <div class="bg-praroop-appo card">
                        <div class="card-body">
                          <Row>
                            <div className="col-md-12 col-lg-12 col-sm-12  ">
                              {" "}
                              <h1 class="text-dark-white nd-praroop-heading">
                                CDPO
                              </h1>
                              <div class="d-flex justify-content-between align-content-center">
                                <div className="direc-dashboard">Steps</div>
                                <div className="direc-dashboard">
                                  {/* N0. of App... */}
                                  <OverlayTrigger
                                    overlay={
                                      <Tooltip id="tooltip-disabled">
                                        Number of Application
                                      </Tooltip>
                                    }
                                  >
                                    <span className="d-inline-block">
                                      <span>N0. of App...</span>
                                    </span>
                                  </OverlayTrigger>
                                </div>
                              </div>
                              <div class="d-flex justify-content-between align-content-center">
                                <div className="nd-approved">Approved </div>
                                <div className="nd-approved">27122</div>
                              </div>
                              <div class="d-flex justify-content-between align-content-center">
                                <div className="nd-approved">Rejected</div>
                                <div className="nd-approved">62</div>
                              </div>
                            </div>
                          </Row>
                        </div>
                      </div>
                    </Col>
                  </Row>
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

export default DirectorateDashboard;
