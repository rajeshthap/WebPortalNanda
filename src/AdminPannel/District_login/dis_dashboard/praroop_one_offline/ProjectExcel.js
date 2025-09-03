import React from "react";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import TechFooter from "../../../technicalcomponents/footer/TechFooter";
import "../../../District_login/dis_assets/CSS/DistrictLeftNav.css";
import "../../../Project_login/pro_assests/ChangePassword.css";
import DistrictNandaGoura from "../DistrictNandaGoura";
import DistrictLeftNav from "../../dis_leftnav/DistrictLeftNav";
import { Row, Col, Pagination, Table, Button } from "react-bootstrap";
import { RiFileExcel2Line } from "react-icons/ri";
import "../../../District_login/dis_assets/CSS/ProjectWiseView.css";

const ProjectExcel = () => {
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
                <h1>List of Application Rejected by CDPO | Praroop 2 | 2024</h1>
              </div>
              <div className="pro-list-data">
                <h2>This list shows applications received till date</h2>
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

              {/* Responsive Table */}
              <div className="table-responsive-lg table-container">
                <Table className="district-thead" striped bordered hover>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>District Name</th>

                      <th>Project Name</th>
                      <th>CDPO</th>
                      <th>Mobile No</th>
                      <th>Offline Praroop 1</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td className="t-d-p">rudraprayag</td>
                      <td className="t-d-p">Agastymuni [0505801]</td>
                      <td>Renu yadav</td>

                      <td>8449481990</td>
                      <td>
                        <div className="td-p">
                          <Button className="view-report">
                            {/* <span className="pro-span-btn">45</span> View Sector Retport <GrView className="pro-report-view" /> */}

                            <span class="badge  rounded-pill text-dark-white d-inline-block nd-btn-district nd-btn-district1">
                              View Excel File{" "}
                              <RiFileExcel2Line className="pro-report-view1" />
                            </span>
                          </Button>
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

export default ProjectExcel;
