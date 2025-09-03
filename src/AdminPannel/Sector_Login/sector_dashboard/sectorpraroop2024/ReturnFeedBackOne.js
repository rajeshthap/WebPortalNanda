import React from "react";
import "../../../Sector_Login/sector_assets/CSS/SectorDashboard.css";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import { Row, Col, Pagination, Table } from "react-bootstrap";
import TechFooter from "../../../technicalcomponents/footer/TechFooter";
import SectorNandaGaura from "../SectorNandaGaura";
import SectorLeftNav from "../../sectorleftnav/SectorLeftNav";
const ReturnFeedBackOne = () => {
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
                <h1>Sector Feedback Returned(Praroop 1)</h1>
              </div>
              
               <Col lg={6} md={6} sm={12}>
                                <div class="search-container">
                                  <form>
                                    <input
                                      className="search"
                                      id="searchleft"
                                      type="search"
                                      name="q"
                                      placeholder="Search"
                                      aria-label="Search"
                                    />
                                    <label className="button search-btn-sector " for="searchleft">
                                      <span className="mglass">&#9906;</span>
                                    </label>
                                  </form>
                                </div>
                              </Col>

              {/* Responsive Table */}
              <div className="table-responsive-lg table-container">
                <Table className="" striped bordered hover>
                  <thead className="sector-thead">
                    <tr>
                      <th>S.No</th>
                      <th>Form ID</th>
                   
                      <th>Aadhar Name</th>
                      <th>Mobile No.</th>
                      <th>Girl Name</th>
                      
                      <th>Mother Name</th>
                      <th>Father Name</th>
                      <th>DOB</th>
                      <th>District</th>
                      <th>Project</th>
                      <th>AWC</th>
                      <th>FeedBack</th>
                      <th>Return Time</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Nanda-2023-000240</td>
                      <td>463005805901</td>
                      <td className="t-d-p">8755439837</td>
                      <td className="t-d-p">प्रिशा</td>
                      <td>ज्योति देवी</td>
                      <td>पवन सिंह</td>
                      <td>2023-09-13</td>
                      <td>Rudraprayag</td>
                      <td>Ukhimath [0505803]</td>
                      <td>NALA</td>
                      <td>father ka aadhar and pan card nahin hai</td>
                      <td>2024-01-31 14:45:50</td>
                     
                      
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

export default ReturnFeedBackOne;