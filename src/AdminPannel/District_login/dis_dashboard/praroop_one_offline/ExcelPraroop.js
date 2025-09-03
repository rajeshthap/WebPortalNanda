import React from "react";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import TechFooter from "../../../technicalcomponents/footer/TechFooter";
import "../../../District_login/dis_assets/CSS/DistrictLeftNav.css";
import "../../../Directorate_login/direc_assets/css/DirectorateDashboard.css";
import "../../../Project_login/pro_assests/ChangePassword.css";
import DistrictNandaGoura from "../DistrictNandaGoura";
import DistrictLeftNav from "../../dis_leftnav/DistrictLeftNav";
import { Col, Pagination, Row, Table } from "react-bootstrap";
import "../../../District_login/dis_assets/CSS/ProjectWiseView.css";

const ExcelPraroop = () => {
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
                <h1>Project-wise Applications Recieved (Praroop 1)</h1>
              </div>
              <div className="pro-list-data">
                <h2>Nanda Gaura District Comittee Format Report</h2>
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
                      <th rowSpan="2">Copy of Family Register Attached (Y/N)</th>
                      <th rowSpan="2">Domicile Attached (Y/N)</th>
                      <th rowSpan="2">Affidavit of two girls attached (Y/N)</th>
                      <th rowSpan="2">Annual Income of Family(according to income Certificate) in Rs.</th>
                      <th rowSpan="2">Income Certificate No.</th>
                      <th rowSpan="2">Income Certificate Date</th>
                      <th
                        colSpan="3"
                        className="text-center direc-12th-heading"
                      >
                        Amount in Rs. 11,000/-
                      </th>
                      <th rowSpan="2">CDPO Feedback</th>
                    </tr>
                    <tr>
                      {/* Details of Beneficiary Columns */}
                      <th>Child Name</th>
                      <th>District</th>
                      <th>Project</th>
                      <th>Sector</th>
                      <th>Certificate of Institutional Delivery (Y/N)</th>
                      <th>DOB</th>
                      <th>Name</th>
                      <th>Pan Card No.</th>
                      <th>Name</th>
                      <th>Pan Card No.</th>
                      <th>Copy Of Family Registre Attached (Y/N)</th>
                      <th>Domicile Attached (Y/N)</th>
                      <th>Affidavit of Not more than two girls benefitted with scheme, attached(Y/N)</th>
                    </tr>
                  </thead>
                  <tbody>
                   <tr>
                   <td colSpan="21" className="text-center">No data available in table</td>
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

export default ExcelPraroop;
