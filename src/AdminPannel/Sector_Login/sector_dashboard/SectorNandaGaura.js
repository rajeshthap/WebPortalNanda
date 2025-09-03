import React from "react";
import "../../Sector_Login/sector_assets/CSS/SectorNanda.css";
import "../../../assets/css/DashBoardIndex.css";
import { Row, Col } from "react-bootstrap";
import { PiDeviceMobile } from "react-icons/pi";

function SectorNandaGaura() {
  // Get sector and project from localStorage
  const sectorName = localStorage.getItem("sector") || "Sector Name";
  const DistrictName = localStorage.getItem("district") || "district Name";

  return (
    <div>
      <Row className="p-1 nd-nanda-main">
        <Col lg={12} md={12} sm={12} className="nd-dis-name">
          <div className="sector-nanda-title">
            <h1>नंदा गौरा योजना ({sectorName}) ({DistrictName})</h1>
          </div>
          <div className="sector-nanda-title">
            <h2>
              <PiDeviceMobile className="nd-tech-contact" />
              Technical Department No :<span> +91 9876-543210</span>
            </h2>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default SectorNandaGaura;
