import React from "react";
import "../../../techassets/techcss/TechDashboard.css";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import { Row, Col, Pagination, Table } from "react-bootstrap";
import "../../pro_assests/ResetSectorPassword.css";
import TechFooter from "../../../technicalcomponents/footer/TechFooter";
import "../../../Project_login/pro_assests/ProjectLeftnav.css";
import ProjectLeftNav from "../../project_leftnav/ProjectLeftNav";
import ProjectNandaGaura from "../ProjectNandaGaura";

const TwelthReturnFeedBack = () => {
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
                <h1>Project-wise Feedback Returned(Praroop 2) 2024-25</h1>
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
              <div className="table-responsive-lg table-container-data ">
                <Table className="pro-thead" striped bordered hover>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Form ID</th>
                      <th>Aadhar No.</th>
                      <th>Mobile No.</th>
                      <th>Girl Name</th>
                      <th>Mother Name</th>
                      <th>Father Name</th>
                      <th>DOB </th>
                      <th>District</th>
                      <th>Project</th>
                      <th>Sector</th>
                      <th>AWC</th>
                      <th>
                      Feedback
                      </th>
                      <th>Return Time</th>
                     
                   
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td className="t-d-p">Nanda(Praroop2)-2024-0001717</td>
                      <td className="t-d-p">709841782810</td>
                      <td>9927213315</td>
                      <td><div className="t-td">NANDINI MISHRA </div></td>
                      <td><div className="t-td">GEETA MISHRA</div></td>
                     
                      <td> <div className="t-td">KAMAL CHANDRA MISHRA   </div></td>
                    
                      <td><div className="t-td">2007-08-21</div></td>
                      <td>Almora</td>
                      <td><div className="t-td">Garud [0506302]</div></td>
                      <td><div className="t-td">KANDHAR [05]</div></td>
                      <td>
                      LOHAGARHI
                      </td>
                      <td>
                        <div className="feedback-td">
                      सभी परिवारके सदस्योके बैक स्टैटमेंन्टअपलोडकरे तथा आंगनबाडी कार्यकत्रीएव प्रधानाचार्यके प्रमाणपत्रपरही हस्ताक्षरएव मोहर लगा करेही प्रमाण् पत्रअपलोडकरें
                      </div>
                      </td>
                    
                    <td><div className="t-td">2024-10-02 15:57:10 </div></td>
                    
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

export default TwelthReturnFeedBack;
