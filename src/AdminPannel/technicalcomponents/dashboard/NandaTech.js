import React from "react";
import "../../techassets/techcss/NandaTech.css";
// import Twelve from "../../assets/images/12thpass.png";
import { Row, Col } from "react-bootstrap";
function NandaTech() {
  return (
    <div>
      <Row className="p-1 nd-nanda-main">
        <Col lg={12} md={12} sm={12}>
          <div className="nd-nanda-title mt-2">
            <h1>नंदा गौरा योजना पैनल</h1>
          </div>
        </Col>
       
      </Row>
    </div>
  );
}

export default NandaTech;
