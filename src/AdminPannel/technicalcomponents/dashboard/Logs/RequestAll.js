import React from "react";
import Pagination from "react-bootstrap/Pagination";
import "../../../techassets/techcss/TechLeft.css";
import "../../../techassets/techcss/TechDashboard.css";
import Table from "react-bootstrap/Table";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import "../../../techassets/techcss/CDPO.css";
import TechLeftnav from "../../leftnavbar/TechLeftnav";
import NandaTech from "../NandaTech";
import TechFooter from "../../footer/TechFooter";
import { Button, Col, Row } from "react-bootstrap";

const RequestAll = () => {
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
                <h1>Request by Applicant</h1>
              </div>
              <Row>
              <div className="nd-staff-mobresp">
                <Col lg={6} md={6} sm={6} className="nd-staff-print11">
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
                      <label className="button search-btn" for="searchleft">
                        <span className="mglass">&#9906;</span>
                      </label>
                    </form>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={6} className="nd-staff-print ">
                  
                    <Button variant="secondary" className="nd-btn-prt">
                      Print
                    </Button>
                   
                  
                </Col>
                </div>
              </Row>
              <div className="table-responsive-lg">
                <Table className="nd-our-staff">
                  <thead className="tech-thead">
                    <tr>
                      <th>S.No</th>
                      <th>Candidate Name</th>
                      <th>Mobile No</th>
                      <th>Adhar No</th>
                      <th>District</th>
                      <th>Project</th>
                      <th>Request Description</th>
                      <th>Status</th>
                      <th>Response</th>
                      <th>Entry Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>PARIDHI</td>
                      <td>9634930197</td>
                      <td>867064032497</td>
                      <td>Haridwar</td>
                      <td>Roorkee02 [0506811]</td>
                      <td>DATE OF BIRTH mismatch as per application form.</td>
                      <td>Pending	</td>
                      <td></td>
                      <td>2024-12-24 19:03:08</td>
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
                    <Pagination className="tech-paging">
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

export default RequestAll;
