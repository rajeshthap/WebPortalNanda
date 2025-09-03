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

const RequestDone = () => {
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
                <h1>Request : DONE</h1>
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
                <Col lg={6} md={6} sm={12} className="nd-staff-print">
                  <div>
                    <Button variant="secondary" className="nd-btn-prt">
                      Print
                    </Button>
                    <Button variant="warning" className="mx-2 nd-btn-copy">
                      Copy
                    </Button>
                    <Button variant="success" className="nd-btn-prt">
                      excel
                    </Button>
                  </div>
                </Col>
              </Row>
              <div className="table-responsive-lg">
                <Table striped bordered hover size="sm" className="nd-our-staff">
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
                      <td>217</td>
                      <td>ज़ुनैरा</td>
                      <td>9084296834</td>
                      <td>972884257671</td>
                      <td>Nanital</td>
                      <td>Ramnagar [0506609]</td>
                      <td>date of birth submitted wrong by mistake.</td>
                      <td>-</td>
                      <td>Mention Details of your issue</td>
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

export default RequestDone;
