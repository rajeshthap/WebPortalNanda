import React from "react";
import "../../District_login/dis_assets/CSS/DistrictNandaGoura.css";
import "../../../assets/css/DashBoardIndex.css";
import { Row, Col } from "react-bootstrap";
import { PiDeviceMobile } from "react-icons/pi";
function DistrictNandaGoura() {
  return (
    <div>
      <Row className="p-1 nd-nanda-main">
        <Col lg={12} md={12} sm={12} className="nd-dis-name">
          <div className="district-nanda-title">
            <h1> नंदा गौरा योजना (District Name)</h1>
          </div>
          <div className="district-nanda-title">
            <h2> <PiDeviceMobile className="nd-tech-contact"/>Technical Department No : +91 9876-543210</h2>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DistrictNandaGoura;
