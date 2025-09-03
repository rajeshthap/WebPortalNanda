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
const RequestPending = () => {
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
                        class="search"
                        id="searchleft"
                        type="search"
                        name="q"
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <label className="button search-btn " for="searchleft">
                        <span className="mglass">&#9906;</span>
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
              <div className="table-container table-responsive-lg">
                <Table className="nd-our-staff" striped bordered hover>
                  <thead className="tech-thead">
                    <tr>
                      <th>S.No</th>
                      <th>Candidate Name</th>
                      <th>Form Type</th>
                      <th>Dob</th>
                      <th>User Status</th>
                      <th>Mobile No</th>
                      <th>Adhar No</th>
                      <th>District</th>
                      <th>Project</th>
                      <th className="tech-table-w">Request Description</th>
                      <th>Status</th>
                      <th className="tech-tbl-min-w">Entry Time</th>
                      <th>Response1</th>
                      <th>Response2</th>
                      <th>Response3</th>
                      <th>Response4</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Aayat</td>
                      <td>new born</td>
                      <td>2023-06-16</td>
                      <td>final</td>
                      <td>7617570972</td>
                      <td>300951820329</td>
                      <td>Dehradun</td>
                      <td>Vikasnagar [0506007]</td>
                      <td>Mam bank statement Arthik janganana Praman Patra tikakaran card upload kar diya hai</td>
                      <td>Pending</td>
                      <td>2025-01-24 20:48:50</td>
                      <td className="tech-tbl"><Button variant="info" className="nd-btn-prt">Return form for correction</Button></td>
                      <td><Button variant="secondary" className="nd-btn-prt">Ignore</Button></td>
                      <td className="tech-tbl-w"><Button variant="info" className="nd-btn-prt">Contact Supervisor</Button></td>
                      <td className="tech-tbl-w">
                        <Button variant="success" className="nd-btn-prt">
                          Ask for details
                        </Button>
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

export default RequestPending;
