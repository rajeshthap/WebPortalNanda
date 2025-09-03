import React from "react";
import "../../../techassets/techcss/TechLeft.css";
import "../../../techassets/techcss/TechDashboard.css";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import { Row, Col, Table, Pagination } from "react-bootstrap";
import NandaTech from "../../../technicalcomponents/dashboard/NandaTech";
import TechFooter from "../../../technicalcomponents/footer/TechFooter";
import DirectorateLeftnav from "../../leftnavigation/DirectorateLeftnav";
import "../../../Directorate_login/direc_assets/css/DistrictWise.css";
import { FaCheckCircle } from "react-icons/fa";
import { BsDatabaseFillGear } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";

const PraroopFinal2023 = () => {
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
                <h1>Praroop  Application Received on this Portal 2023</h1>
              </div>
              <Row>
                <Col lg={6} md={6} sm={12}>
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
                      <label class="button search-btn " for="searchleft">
                        <span class="mglass">&#9906;</span>
                      </label>
                    </form>
                  </div>
                </Col>
              </Row>
              <div className="table-responsive-lg">
                <Table className="nd-our-staff">
                  <thead>
                    <tr>
                      <th
                        colSpan="6"
                        className="text-center direc-12th-heading nd-direc-border"
                      >
                        12th Applications Received 2023
                      </th>
                      <th
                        colSpan="3"
                        className="text-center direc-12th-heading"
                      >
                        New born child Applications Received 2023
                      </th>
                    </tr>
                    <tr>
                      <th>S.No</th>
                      <th>District Name</th>
                      <th>Project Name</th>
                      <th>Received</th>
                      <th>Approved by CDPO</th>
                      <th>Rejected by CDPO</th>
                      <th>Received</th>
                      <th>Approved by CDPO</th>
                      <th>Rejected by CDPO</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Almora</td>
                      <td>20</td>
                      <td>
                        <span class="badge  rounded-pill text-dark-white d-inline-block nd-btn-Received ">
                          <BsDatabaseFillGear /> Received{" "}
                          <span className="badge nd-data-Received text-center">
                            20
                          </span>
                        </span>
                      </td>
                      <td>
                        <span class="badge  rounded-pill text-dark-white d-inline-block nd-btn-approved">
                          <FaCheckCircle /> Approved{" "}
                          <span className="badge nd-data-approved text-center">
                            100
                          </span>
                        </span>
                      </td>
                      <td>
                        <span class="badge  rounded-pill text-dark-white d-inline-block nd-btn-rejected">
                          <IoMdCloseCircle /> Rejected{" "}
                          <span className="badge nd-data-rejected text-center">
                            01
                          </span>
                        </span>
                      </td>
                      <td>
                        <span class="badge  rounded-pill text-dark-white d-inline-block nd-btn-Received ">
                          <BsDatabaseFillGear /> Received{" "}
                          <span className="badge nd-data-Received text-center">
                            20
                          </span>
                        </span>
                      </td>
                      <td>
                        <span class="badge  rounded-pill text-dark-white d-inline-block nd-btn-approved">
                          <FaCheckCircle /> Approved{" "}
                          <span className="badge nd-data-approved text-center">
                            100
                          </span>
                        </span>
                      </td>
                      <td>
                        <span class="badge  rounded-pill text-dark-white d-inline-block nd-btn-rejected">
                          <IoMdCloseCircle /> Rejected{" "}
                          <span className="badge nd-data-rejected text-center">
                            01
                          </span>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <Row>
                <Col lg={6} md={6} sm={12}>
                  {" "}
                  <div className="tech-staff-perviose">
                    <div>Showing 1 to 10 of 105 entries</div>
                  </div>{" "}
                </Col>
                <Col lg={6} md={6} sm={12}>
                  {" "}
                  <div className="tech-staff-table">
                    {" "}
                    <Pagination className="direct-paging">
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
                  </div>{" "}
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

export default PraroopFinal2023;
