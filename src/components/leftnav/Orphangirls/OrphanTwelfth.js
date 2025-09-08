import React from "react";
import "../../../assets/css/DashBoardIndex.css";

import { Row, Col } from "react-bootstrap";
function OrphanTwelfth() {
  return (
    <div>
      <Row className="p-1 nd-nanda-main">
        <Col lg={3} md={3} sm={12}>
          <div className="nd-nanda-title">
            <h1> नंदा गौरा योजना</h1>
          </div>
        </Col>
        <Col lg={9} md={9} sm={12}>
          <div className="nd-nanda-pdf">
            <h2>
              {" "}
             
              कक्षा 12वीं उत्तीर्ण अनाथ छात्राओं (2025-26) के लिए अवसर{" "}
            </h2>
          </div>
        </Col>
        
      </Row>
    </div>
  );
}

export default OrphanTwelfth;
