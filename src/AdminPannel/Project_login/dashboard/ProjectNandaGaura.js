import React from "react";
import "../../Project_login/pro_assests/ProjectNandaGaura.css";
import "../../../assets/css/DashBoardIndex.css";

import { Row, Col } from "react-bootstrap";
function ProjectNandaGaura() {
  return (
    <div>
      <Row className="p-1 nd-nanda-main">
        <Col lg={12} md={12} sm={12}>
          <div className="project-nanda-title">
            <h1> नंदा गौरा योजना (Project Name)</h1>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ProjectNandaGaura;
