import React from "react";
import "../../../../assets/css/DashBoardIndex.css";

import { Row, Col } from "react-bootstrap";
function GirlsBornStep() {
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
             
              कन्या के जन्म पर (प्रथम चरण हेतु){" "}
            </h2>
          </div>
        </Col>
        
      </Row>
    </div>
  );
}

export default GirlsBornStep;
