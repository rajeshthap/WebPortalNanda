import React from "react";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import TechFooter from "../../../technicalcomponents/footer/TechFooter";
import "../../../District_login/dis_assets/CSS/DistrictLeftNav.css";
import "../../../Directorate_login/direc_assets/css/DirectorateDashboard.css";
import "../../../Project_login/pro_assests/ChangePassword.css";
import DistrictNandaGoura from "../DistrictNandaGoura";
import DistrictLeftNav from "../../dis_leftnav/DistrictLeftNav";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";

const UploadFinalList2023 = () => {
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
              <div className="nd-tech-heading">
                <h1>Upload Final List | Praroop 2</h1>
              </div>
              <Row>
                <Col lg={12} sm={12} md={12} className="mt-3">
                  <div className="pro-offline-text dis-upload">
                    <h2>
                      Read this before proceeding | आगे बढ़ने से पहले इसे पढ़ें{" "}
                    </h2>
                    <p className="pro-offline-text1">
                      Important note:if committee have made changes to the list
                      please alter the list accordingly only then upload
                      comittee signed copy, as after submitting signed copy no
                      changes can be made to approved list.
                    </p>
                    <p className="m-or-left m-or-left1">OR</p>
                    <p className="pro-offline-text1">
                      महत्वपूर्ण लेख : यदि समिति ने सूची में परिवर्तन किया है तो
                      कृपया उसके अनुसार सूची में परिवर्तन करें, उसके बाद ही
                      समिति द्वारा हस्ताक्षरित प्रति अपलोड करें, क्योंकि
                      हस्ताक्षरित प्रति जमा करने के बाद अनुमोदित सूची में कोई
                      परिवर्तन नहीं किया जा सकता है।
                    </p>
                    <h3 className="mt-2">Upload Committee Signed Final Copy</h3>
                    <Form>
                      <Form.Control type="file" className="dis-input"></Form.Control>

                      <div className="pro-offline-btn">
                        {" "}
                       
                        <div>
                          <InputGroup>
                            <label className="upload-chekbox">
                              {" "}
                              list uploaded is exactly matching the signed Copy
                            </label>
                            <InputGroup.Checkbox className="mx-2" />
                          </InputGroup>
                          <div className="mt-2 dis-btn-fortward">
                          <Button className="offline-btn">
                          Fortward to Directorate 
                        </Button>
                        <h4 className="mt-2">This Link is Disabled for now</h4>
                        </div>
                        </div>
                      </div>
                    </Form>
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

export default UploadFinalList2023;
