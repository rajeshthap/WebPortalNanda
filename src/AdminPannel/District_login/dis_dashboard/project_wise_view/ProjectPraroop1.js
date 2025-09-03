import React from "react";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import TechFooter from "../../../technicalcomponents/footer/TechFooter";
import "../../../District_login/dis_assets/CSS/DistrictLeftNav.css";
import DistrictNandaGoura from "../DistrictNandaGoura";
import DistrictLeftNav from "../../dis_leftnav/DistrictLeftNav";
import { Row, Col, Pagination, Table } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { BsDatabaseFillGear } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";
import "../../../District_login/dis_assets/CSS/ProjectWiseView.css";

const ProjectPraroop1 = () => {
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
              <div className="nd-district-heading">
                <h1>Project-wise Applications Recieved (Praroop 1)</h1>
              </div>
              <div className="pro-list-data">
                <h2>Nanda Gaura New Born Girl Child Application Report</h2>
              </div>
              <Row>
              <div className="nd-staff-mobresp">
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
                      <label class="button search-btn1 " for="searchleft">
                        <span class="mglass">&#9906;</span>
                      </label>
                    </form>
                  </div>
                </Col>
                </div>
              </Row>

              {/* Responsive Table */}
              <div className="table-responsive-lg table-container">
                <Table className="district-thead" striped bordered hover>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>District Name</th>
                      <th>Project Name</th>
                      <th>Application Recieved</th>
                      <th>Approved by CDPO</th>
                      <th>Rejected by CDPO</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td className="t-d-p">rudraprayag</td>
                      <td className="t-d-p">Agastymuni [0505801]</td>

                      <td>
                        <span class="badge  rounded-pill text-dark-white d-inline-block nd-btn-Received ">
                          <BsDatabaseFillGear /> Received{" "}
                          <span className="badge nd-data-Received text-center">
                            141
                          </span>
                        </span>
                      </td>
                      <td>
                        <span class="badge  rounded-pill text-dark-white d-inline-block nd-btn-approved">
                          <FaCheckCircle /> Approved{" "}
                          <span className="badge nd-data-approved text-center">
                            142
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
                  <div className="tech-staff-perviose">
                    <div>Showing 1 to 10 of 105 entries</div>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <div className="tech-staff-table">
                    <Pagination className="dis-paging">
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

export default ProjectPraroop1;
