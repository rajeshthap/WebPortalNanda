import React from "react";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import TechFooter from "../../../technicalcomponents/footer/TechFooter";
import "../../../District_login/dis_assets/CSS/DistrictLeftNav.css";
import "../../../Project_login/pro_assests/ChangePassword.css";
import DistrictNandaGoura from "../DistrictNandaGoura";
import DistrictLeftNav from "../../dis_leftnav/DistrictLeftNav";
import { Row, Col, Pagination, Table, Button } from "react-bootstrap";
import { IoMdCloseCircle } from "react-icons/io";
import "../../../District_login/dis_assets/CSS/ProjectWiseView.css";
import { MdOutlineDocumentScanner } from "react-icons/md";

const ApprovalRejectedCDPO = () => {
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
                <h1>List of Application Rejected by CDPO | Praroop 1</h1>
              </div>
              <div className="pro-list-data">
                <h2>This list shows applications received till date</h2>
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

              {/* Responsive Table */}
              <div className="table-responsive-lg table-container-data">
                <Table className="district-thead" striped bordered hover>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>View</th>

                      <th>
                        <div className="nd-district-td1">
                          Once Removed this will be send to cdpo for
                          Re-evaluation
                        </div>
                      </th>
                      <th>Form ID</th>
                      <th>Aadhar No</th>
                      <th>Mobile No</th>
                      <th>Girl Name</th>
                      <th>Mother Name</th>
                      <th>Father Name</th>
                      <th>DOB</th>
                      <th>District</th>
                      <th>Project</th>
                      <th>AWC</th>
                      <th>Reason For Rejection</th>
                      <th>Return Time</th>
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
                      <td>
                        <div className="td-p">
                          <Button className="view-report-cdpo">
                            <span class="badge  rounded-pill text-dark-white d-inline-block nd-cdpo-district nd-btn-district1">
                              Removed Form Rejected{" "}
                              <IoMdCloseCircle className="pro-form-view" />
                            </span>
                          </Button>
                        </div>
                      </td>
                      <td>Nanda(Praroop2)-2024-00011609</td>
                      <td>261657083472</td>
                      <td>9412081075</td>
                      <td>
                        <div className="nd-district-td1">Diya baunthiyal</div>
                      </td>
                      <td>CHANDRAKANTA BAUNTHIYAL</td>
                      <td>KHEMCHANDRA BAUNTHIYAL</td>
                      <td>
                        <div className="nd-district-td2">2006-02-01</div>
                      </td>
                      <td>Pauri Garhwal</td>
                      <td>Jaiharikhal [0506105]</td>
                      <td>BAUNTHA</td>
                      <td>
                        <div className="nd-district-td">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s
                        </div>
                      </td>
                      <td>
                        <div className="nd-district-td1">
                          2024-12-10 10:58:22
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

export default ApprovalRejectedCDPO;
