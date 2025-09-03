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

const ExcelPraroopListThree = () => {
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
                <h1>
                  Nanda Gaura Praroop 3 Submited Forms 2024 (Pauri Garhwal)
                </h1>
              </div>
              <div className="pro-list-note">
                <h2>
                  Note: Form Already Submitted and Forwarded, but Documents are
                  Unverified
                </h2>
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
                      <label class="button search-btn1 " for="searchleft">
                        <span class="mglass">&#9906;</span>
                      </label>
                    </form>
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
                        rowSpan="2"
                        className="text-center direc-12th-heading"
                      >
                        Form ID
                      </th>

                      <th
                        colSpan="12"
                        className="text-center direc-12th-heading"
                      >
                        Details of Beneficiary
                      </th>

                      <th
                        rowSpan="2"
                        className="text-center direc-12th-heading"
                      >
                        Father Name
                      </th>
                      <th
                        rowSpan="2"
                        className="text-center direc-12th-heading"
                      >
                        Mother Name
                      </th>
                      <th
                        colSpan="3"
                        className="text-center direc-12th-heading"
                      >
                        Amount in Rs. 51,000/-
                      </th>
                    </tr>
                    <tr>
                      {/* Details of Beneficiary Columns */}

                      <th>Name</th>
                      <th>District</th>
                      <th>Project</th>
                      <th>VIEW</th>

                      <th>High School Certificate Attached(Y./N)</th>
                      <th>DOB</th>

                      <th>Certificate of Unmarried Attached(Y/N)</th>
                      <th>12th pass Certificate (Y/N)</th>
                      <th>Name of Board</th>
                      <th>Aadhar No</th>
                      <th>Mobile No</th>
                      <th>Pan Card No</th>

                      <th>Bank Name</th>
                      <th>IFSC Code</th>
                      <th>Beneficiary A/C No.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Nanda(Praroop3)-2024-00067</td>

                      <td>PRIYANSHI</td>
                      <td>Pauri Garhwal</td>
                      <td>Beeronkhal [0506101]</td>
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

                      <td>Y</td>
                      <td>2007-08-01</td>

                      <td>Y</td>
                      <td>Y</td>

                      <td>UK BOARD</td>
                      <td>907807539405</td>
                      <td>8449699683</td>
                      <td>IJSPP3731C</td>
                      <td>DEEPCHAND</td>
                      <td>ANITA DEVI</td>
                      <td>STATE BANK OF INDIA</td>

                      <td>SBIN0007546</td>
                      <td>32332768332</td>
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

export default ExcelPraroopListThree;
