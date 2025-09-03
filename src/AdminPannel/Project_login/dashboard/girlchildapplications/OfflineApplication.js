import React from "react";
import "../../../techassets/techcss/TechDashboard.css";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import TechFooter from "../../../technicalcomponents/footer/TechFooter";
import "../../../Project_login/pro_assests/ProjectLeftnav.css";
import ProjectLeftNav from "../../project_leftnav/ProjectLeftNav";
import { Button, Col, Row } from "react-bootstrap";
import ProjectNandaGaura from "../ProjectNandaGaura";

const OfflineApplication = () => {
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
                <h1>Upload Offline Recieved Application Praroop 1</h1>
              </div>
              <Row>
                <Col lg={12} sm={12} md={12}>
                  <div className="pro-offline-text">
                    <h2>
                      Read this before proceeding | आगे बढ़ने से पहले इसे पढ़ें{" "}
                    </h2>
                    <p className="pro-offline-text1">
                      Download this excel format & fill this excel with detals
                      of all applications recieved.(enter data in english only
                      as hindi is not supported)
                    </p>
                    <p className="m-or-left m-or-left1">OR</p>
                    <p className="pro-offline-text1">
                      इस एक्सेल प्रारूप को डाउनलोड करें और इस एक्सेल में प्राप्त
                      सभी आवेदनों का विवरण भरें। (डेटा केवल अंग्रेजी में दर्ज
                      करें क्योंकि हिंदी समर्थित नहीं है)
                    </p>
                    <div className="pro-offline-btn">
                      <a
                        href="/cdpo_wise_praroop_1_offline_recieved_list_format.xlsx"
                        target="_blank"
                        download
                      >
                        {" "}
                        <Button className="offline-btn">
                          Download Excel Formet
                        </Button>
                      </a>
                    </div>
                    <h3 className="mt-2">
                      Already Uploaded and Submitted for Verification
                    </h3>
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

export default OfflineApplication;
