import React from "react";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import TechFooter from "../../../technicalcomponents/footer/TechFooter";
import "../../../District_login/dis_assets/CSS/DistrictLeftNav.css";
import "../../../Project_login/pro_assests/ChangePassword.css";
import { Row, Col, Pagination, Table, Button } from "react-bootstrap";
import { RiFileExcel2Line } from "react-icons/ri";
import "../../../District_login/dis_assets/CSS/ProjectWiseView.css";
import SectorNandaGaura from "../SectorNandaGaura";
import SectorLeftNav from "../../sectorleftnav/SectorLeftNav";
import { BsDatabaseFillGear } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { FaClockRotateLeft } from "react-icons/fa6";

const AllApplication = () => {
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
              <div className="nd-sector-heading">
                <h1>Praroop 1 All Applications Recieved : Online</h1>
              </div>
              <div className="pro-list-data">
                <h2>
                Nanda Gaura Real-time Application Report
                </h2>
              </div>
              <Row>
                <div className="nd-staff-mobresp">
                  <Col lg={6} md={6} sm={6} className="nd-staff-print11">
                    <div class="search-container">
                      <form>
                        <input
                          class="search"
                          id="searchleft"
                          type="search"
                          name="q"
                          placeholder="Search"
                          aria-label="Search"
                        />
                        <label
                          class="button search-btn-sector"
                          for="searchleft"
                        >
                          <span class="mglass">&#9906;</span>
                        </label>
                      </form>
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6} className="nd-staff-print ">
                    <Button variant="secondary" className="nd-btn-prt">
                      Print
                    </Button>
                    <Button variant="warning" className="mx-2 nd-btn-copy">
                      Copy
                    </Button>
                  </Col>
                </div>
              </Row>

              {/* Responsive Table */}
              <div className="table-responsive-lg table-container">
                <Table className="sector-thead" striped bordered hover>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>District Name</th>

                      <th>Project Name</th>
                      <th>Sector Name</th>
                      <th>AWC Name</th>
                      <th>AWC Type</th>
                      <th>AWC Code</th>
                      <th>Step 1</th>
                      <th>Step 2</th>
                      <th>Step 3</th>
                      <th>Step 4</th>
                      <th>Final</th>
                      <th>Accept</th>
                      <th>Cancel</th>
                      <th>Pending</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td className="t-d-p">Rudraprayag</td>
                      <td className="t-d-p">Ukhimath</td>
                      <td>GUPTAKASHI [01]</td>
                      <td>BHEMCHULA</td>
                      <td>AWC</td>
                      <td>5058030101</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>
                        <Button className="view-report">
                          <span class="badge  rounded-pill text-dark-white d-inline-block nd-btn-Received nd-btn-district1">
                            <BsDatabaseFillGear /> Final{" "}
                            <span className="badge nd-data-Received text-center">
                              01
                            </span>
                          </span>
                        </Button>
                      </td>
                      <td>
                        <Button className="view-report">
                          <span class="badge  rounded-pill text-dark-white d-inline-block nd-btn-approved nd-btn-district1">
                            <FaCheckCircle /> Accept{" "}
                            <span className="badge nd-data-approved text-center">
                              01
                            </span>
                          </span>
                        </Button>
                      </td>

                      <td>
                        <Button className="view-report">
                          <span class="badge  rounded-pill text-dark-white d-inline-block nd-btn-rejected nd-btn-district1">
                            <IoMdCloseCircle /> Cancel{" "}
                            <span className="badge nd-data-rejected text-center">
                              00
                            </span>
                          </span>
                        </Button>
                      </td>
                      <td>
                        <Button className="view-report">
                          <span class="badge  rounded-pill text-dark-white d-inline-block nd-btn-pending nd-btn-district1">
                            <FaClockRotateLeft /> Pending{" "}
                            <span className="badge nd-data-pending text-center">
                              00
                            </span>
                          </span>
                        </Button>
                      </td>

                      <td>
                        <div className="td-p">
                          <Button className="view-report">
                            {/* <span className="pro-span-btn">45</span> View Sector Retport <GrView className="pro-report-view" /> */}

                            <span class="badge  rounded-pill text-dark-white d-inline-block nd-btn-district nd-btn-district1">
                              View AWC Report{" "}
                              <RiFileExcel2Line className="pro-report-view1" />
                            </span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              <Row>
                <Col lg={6} md={6} sm={12}>
                  <div className="tech-staff-perviose">
                    <div>Showing 1 to 10 of 105 entries</div>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <div className="tech-staff-table">
                    <Pagination className="sector-paging">
                      <Pagination.First />
                      <Pagination.Prev />
                      <Pagination.Item>{1}</Pagination.Item>
                      <Pagination.Ellipsis />
                      <Pagination.Item>{10}</Pagination.Item>
                      <Pagination.Item>{11}</Pagination.Item>
                      <Pagination.Item active>{12}</Pagination.Item>
                      <Pagination.Next />
                      <Pagination.Last />
                    </Pagination>
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

export default AllApplication;
