import React from "react";
import "../../../techassets/techcss/TechDashboard.css";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import { Row, Col, Pagination, Table } from "react-bootstrap";
import "../../pro_assests/ResetSectorPassword.css";
import TechFooter from "../../../technicalcomponents/footer/TechFooter";
import "../../../Project_login/pro_assests/ProjectLeftnav.css";
import ProjectLeftNav from "../../project_leftnav/ProjectLeftNav";
import ProjectNandaGaura from "../ProjectNandaGaura";

const TwelthExcelPFMS = () => {
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
                <h1>
                  12th Passing Girl Application Approved by CDPO : Praroop 2
                  2024-25
                </h1>
              </div>
              <div className="pro-list-data">
                <h2>Nanda Gaura PFMS Format list (All Approved by CDPO)</h2>
              </div>
              <Row>
                <Col lg={6} md={6} sm={12}>
                  <div className="search-container">
                    <form>
                      <input
                        className="search"
                        id="searchleft"
                        type="search"
                        name="q"
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <label className="button search-btn-project" htmlFor="searchleft">
                        <span className="mglass">&#9906;</span>
                      </label>
                    </form>
                  </div>
                </Col>
              </Row>

              {/* Responsive Table */}
              <div className="table-responsive-lg table-container">
                <Table className="pro-thead" striped bordered hover>
                  <thead>
                    <tr>
                      <th>Full Name in English</th>
                      <th>Full Name in Recognized Official Lang</th>
                      <th>Gender</th>
                      <th>Address Line 1</th>
                      <th>Addrress Line 2</th>
                      <th>Addrress Line 3</th>
                      <th>District </th>
                      <th>State</th>
                      <th>Country</th>
                      <th>Bank Name</th>
                      <th>IFSC code</th>
                      <th>Account Number</th>
                      <th>Aadhar No.</th>
                      <th>Pincode</th>
                      <th>Scheme Specific ID </th>
                      <th>Center Share Payment Amount</th>
                      <th>State Share Payment Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>AARTI</td>
                      <td className="t-d-p">AARTI</td>
                      <td className="t-d-p">F</td>
                      <td>Tadikhet [0506410]</td>
                      <td>BHUJAN [01]</td>
                      <td>TANA PANYALI(5064100141)</td>
                      <td>Almora</td>
                      <td>Uttarakhand</td>
                      <td>India</td>
                      <td>Uttarakhand Gramin Bank</td>
                      <td>SBIN0RRUTGB</td>
                      <td>4443009635</td>
                      <td>353314661199</td>
                      <td></td>
                      <td>Nanda(Praroop2)-2024-0006118</td>
                      <td></td>
                      <td>51,000</td>
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
                    <Pagination className="pro-paging">
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

export default TwelthExcelPFMS;
