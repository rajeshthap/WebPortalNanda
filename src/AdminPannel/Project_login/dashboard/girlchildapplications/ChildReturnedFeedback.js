import React from "react";
import "../../../techassets/techcss/TechDashboard.css";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import { Row, Col, Pagination, Table } from "react-bootstrap";
import "../../pro_assests/ResetSectorPassword.css";
import TechFooter from "../../../technicalcomponents/footer/TechFooter";
import "../../../Project_login/pro_assests/ProjectLeftnav.css";
import ProjectLeftNav from "../../project_leftnav/ProjectLeftNav";
import ProjectNandaGaura from "../ProjectNandaGaura";

const ChildReturnedFeedback = () => {
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
                <h1>Project-wise Feedback Returned(Praroop 1)</h1>
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
                <Table className="pro-thead" striped bordered>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Form ID</th>
                      <th>Adhar No.</th>
                      <th>Mobile No.</th>
                      <th>Girl Name</th>
                      <th>Mother Name</th>
                      <th>Father Name </th>
                      <th>DOB</th>
                      <th>District</th>
                      <th>Project</th>
                      <th>AWC</th>
                      <th>Feedback</th>
                      <th>Return Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td className="t-d-p">Nanda-2023-00097</td>
                      <td className="t-d-p">306189086975</td>
                      <td>8791506433</td>
                      <td>Harshita Shahi</td>
                      <td>Pushpa</td>
                      <td>Ramesh Chandra Singh Shahi</td>
                      <td>2023-05-25</td>
                      <td>Bageshwar</td>
                      <td>Kapkot [0506303]</td>
                      <td>GOLNA</td>
                      <td>अभिभावक आधार स्पष्ट लगाना है, शपथ पत्र लगाना है</td>

                      <td>2023-12-27 10:56:23</td>
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

export default ChildReturnedFeedback;
