import React from "react";
import "../../../techassets/techcss/TechDashboard.css";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import { Row, Col, Pagination, Table, Button } from "react-bootstrap";
import TechFooter from "../../../technicalcomponents/footer/TechFooter";
import SectorNandaGaura from "../SectorNandaGaura";
import { SiGoogleforms } from "react-icons/si";
import { FaCheckCircle } from "react-icons/fa";
import SectorLeftNav from "../../sectorleftnav/SectorLeftNav";
import "../../../Sector_Login/sector_assets/CSS/SectorDashboard.css";

const  PraroopTwoAllApp = () => {
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
                <h1>Praroop 2 All Applications Recieved</h1>
              </div>
              <div className="pro-list-data">
                <h2>Nanda Gaura Real-time Application Report | SECTOR : GUPTAKASHI [01]
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
                      <label class="button search-btn-sector " for="searchleft">
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
                <Table className="" striped bordered hover>
                  <thead className="sector-thead">
                    <tr>
                      <th>S.No</th>
                      <th>Form ID</th>
                      <th>Girl Name</th>
                      <th>Aadhar Name</th>
                      <th>Mother Name</th>
                      <th>Father Name</th>
                      <th>DOB</th>
                      <th>Caset Category</th>
                      <th>Sector</th>
                      <th>AWC (Code)</th>
                      <th>Final Submit</th>
                      <th colSpan="3" className="merged-column">
                        Supervisor Recommendation
                      </th>
                      <th colSpan="3" className="text-center merged-cdpo">
                        {" "}
                        CDPO Recommendation
                      </th>
                      <th>View Details Form</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Nanda(Praroop2)-2024-0007345</td>
                      <td>SHIFA</td>
                      <td className="t-d-p">992634952003</td>
                      <td className="t-d-p">SAJEEDA BEGUM</td>
                      <td>MOHD FAROOK</td>
                      <td>2006-03-02</td>
                      <td>General</td>
                      <td>NAGARPALIKA GADARPUR [09]</td>
                      <td>WARD NO 07 4(5067020922)</td>
                      <td>2024-10-14 12:11:55</td>
                      <td>
                        <span class="badge  rounded-pill d-inline-block nd-feedback-submit ">
                        Feedback Submitted{" "}
                          <FaCheckCircle className="pro-feed-view" />
                        </span>
                      </td>
                      <td>
                      
                      Recommendation to Accept{" "}
                          
                      
                      </td>
                      <td>
                        <span class="badge  rounded-pill d-inline-block nd-feedback-complete ">
                        Accept{" "}
                          <FaCheckCircle className="pro-feed-view" />
                        </span>
                      </td>
                      <td>
                        <span class="badge  rounded-pill d-inline-block nd-feedback-submit ">
                        Feedback Submitted{" "}
                          <FaCheckCircle className="pro-feed-view" />
                        </span>
                      </td>
                      <td>
                       
                      Recommendation to Accept{" "}
                         
                        
                      </td>
                     
                      <td>
                        <span class="badge  rounded-pill d-inline-block nd-feedback-complete ">
                        Accept{" "}
                          <FaCheckCircle className="pro-feed-view" />
                        </span>
                      </td>
                    

                      <td className="pr-p">
                        <div className="pro-rest-btn">
                            <Button className="reset-btn">View Form <SiGoogleforms className="pro-feed-view"/></Button>
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

export default  PraroopTwoAllApp;