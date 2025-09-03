import React from "react";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import TechFooter from "../../../technicalcomponents/footer/TechFooter";
import "../../../District_login/dis_assets/CSS/DistrictLeftNav.css";
import "../../../Directorate_login/direc_assets/css/DirectorateDashboard.css";
import "../../../Project_login/pro_assests/ChangePassword.css";
import DistrictNandaGoura from "../DistrictNandaGoura";
import DistrictLeftNav from "../../dis_leftnav/DistrictLeftNav";
import { Button, Col, Pagination, Row, Table } from "react-bootstrap";
import "../../../District_login/dis_assets/CSS/ProjectWiseView.css";
import { MdOutlineDocumentScanner } from "react-icons/md";

const PraroopExcel = () => {
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
                <h1>Praroop 2 District Samiti Format | 2024</h1>
              </div>
              <div className="pro-list-data">
                <h2>Nanda Gaura District Comittee Format Report</h2>
                <h2>This list shows applications received</h2>
              </div>
                <Row>
                             
                              <Col lg={6} md={6} sm={6}>
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
                              <Col lg={6} md={6} sm={6} className="nd-staff-print">
                                <div>
                                  <Button variant="secondary" className="nd-btn-prt">
                                    Print
                                  </Button>
                                  <Button variant="warning" className="mx-2 nd-btn-copy">
                                    Copy
                                  </Button>
                                </div>
                              </Col>
                            </Row>
              <div className="table-responsive-lg table-container">
                <Table className="district-thead" striped bordered hover>
                  <thead>
                    <tr>
                      <th
                        rowSpan="2"
                        className="text-center direc-12th-heading"
                      >
                        S.No
                      </th>
                      <th
                        colSpan="14"
                        className="text-center direc-12th-heading"
                      >
                        Details of Beneficiary
                      </th>
                      <th
                        colSpan="2"
                        className="text-center direc-12th-heading"
                      >
                        Details of Father
                      </th>
                      
                      <th
                        colSpan="2"
                        className="text-center direc-12th-heading"
                      >
                        Details of Mother
                      </th>
                      <th rowSpan="2">Copy of Family Register Attached (Y/N)</th>
                      <th rowSpan="2">Domicile Attached (Y/N)</th>
                      <th rowSpan="2">Affidavit of Nt more than two girls benefitted with scheme, attached(Y/N)</th>
                      <th rowSpan="2">Annual Income of Family(according to income Certificate) in Rs.</th>
                      <th rowSpan="2">Income Certificate No.</th>
                      <th rowSpan="2">Income Certificate Date</th>
                      <th
                        colSpan="3"
                        className="text-center direc-12th-heading"
                      >
                        Amount in Rs. 51,000/-
                      </th>
                     
                    </tr>
                    <tr>
                      {/* Details of Beneficiary Columns */}
                      <th>VIEW</th>
                      <th>Name</th>
                      <th>District</th>
                      <th>Project</th>
                      <th>Sector</th>
                      <th>High School Certificate Attached(Y./N)</th>
                      <th>DOB</th>
                      <th>Caset Category</th>
                      <th>Certificate of Unmarried Attached(Y/N)</th>
                      <th>12th pass Certificate (Y/N)</th>
                      <th>Name of Board</th>
                      <th>Aadhar No</th>
                      <th>Mobile No</th>
                      <th>Pan Card No</th>
                      <th>Name</th>
                      <th>Pan Card No</th>
                      <th>Name</th>
                      <th>Pan Card No</th>
                      <th>Bank Name</th>
                      <th>IFSC Code</th>
                      <th>Beneficiary A/C No.</th>
                                           
                    </tr>

                  </thead>
                  <tbody>
                   <tr>
                   <td >1</td>
                   <td>
                        <div className="td-p">
                        <Button className="view-report">
                         
                          <span class="badge  rounded-pill text-dark-white d-inline-block nd-btn-district nd-btn-district1">
                          
                            View Form{" "}
                            <MdOutlineDocumentScanner className="pro-report-view1" />
                          </span>
                        </Button>
                        </div>
                      </td>
                      <td>PRIYANSHI</td>
                      <td>Pauri Garhwal</td>
                      <td>Beeronkhal [0506101]</td>
                      <td>BAIJRAU [01]</td>
                      <td>Y</td>
                      <td>2007-08-01</td>
                      <td>SC</td>
                      <td>Y</td>
                      <td>Y</td>
                      
                      <td>UK BOARD</td>
                      <td
                      >907807539405</td>
                      <td>8449699683</td>
                      <td>IJSPP3731C</td>
                      <td>KISHORI LAL</td>
                      <td>BRIPL8149P</td>
                      <td>MANODARI DEVI</td>
                      <td>IPEPD4227M</td>
                      <td>Y</td>
                      <td>Y</td>
                      <td>y</td>
                      <td>70000</td>
                      <td>UK24ES0900285931</td>
                      <td>2024-09-04</td>
                      <td>STATE BANK OF INDIA</td>
                      <td>SBIN0008429</td>
                      <td>32428858503</td>

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

export default PraroopExcel;
