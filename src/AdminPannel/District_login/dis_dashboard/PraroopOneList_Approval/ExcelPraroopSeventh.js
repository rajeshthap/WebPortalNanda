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

const ExcelPraroopSeventh = () => {
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
              <div className="nd-district-heading" >
                <h1>Praroop 1 District Samiti Format Part VII </h1>
              </div>
              <div className="pro-list-data">
                <h2>Nanda Gaura District Comittee Format Report </h2>
                <h3>
                This list shows applications Approved by CDPO from 14 August 2024 - 29 January 2025
Number of Forms in this list will fluctuate.
                </h3>
              </div>
              <Row>
              <div className="nd-staff-mobresp">
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
                </div>
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
                        colSpan="6"
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
                      <th rowSpan="2">
                        Copy of Family Register Attached (Y/N)
                      </th>
                      <th rowSpan="2">Domicile Attached (Y/N)</th>
                      <th rowSpan="2">
                        Affidavit of Not more than two girls benefitted with
                        scheme, attached(Y/N)
                      </th>
                      <th rowSpan="2">
                        Annual Income of Family(according to income Certificate)
                        in Rs.
                      </th>
                      <th rowSpan="2">Income Certificate No.</th>
                      <th rowSpan="2">Income Certificate Date</th>
                      <th
                        colSpan="3"
                        className="text-center direc-12th-heading"
                      >
                        Amount in Rs. 11,000/-
                      </th>
                    </tr>
                    <tr>
                      {/* Details of Beneficiary Columns */}
                      <th>VIEW</th>
                      <th>Child Name</th>
                      <th>District</th>
                      <th>Project</th>

                      <th>
                        Certificate of Institutial Delivery Attached(Y./N)
                      </th>
                      <th>DOB</th>
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
                      <td>1</td>
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
                      <td>Tehri Garhwal</td>
                      <td>Bhilangana [0505901]</td>

                      <td>Y</td>
                      <td>2024-01-02</td>
                      <td>PRAVESH SINGH</td>
                      <td>IBSPS7587D</td>
                      <td>MAKANI</td>

                      <td>DZHPG5182E</td>
                      <td>Y</td>
                      <td>Y</td>
                      <td>Y</td>
                      <td>60000</td>
                      <td>uk23es0900006020</td>
                      <td>2023-07-13</td>
                      <td>PUNJAB NATIONAL BANK</td>
                      <td>PUNB0693300</td>
                      <td>6933000100135724</td>
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

export default ExcelPraroopSeventh;
