import React from "react";
import "../../techassets/techcss/TechLeft.css";
import "../../techassets/techcss/TechDashboard.css";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import { Row, Col, Card } from "react-bootstrap";
import TechFooter from "../../technicalcomponents/footer/TechFooter";
import "../../Sector_Login/sector_assets/CSS/SectorLeftNav.css";
// import ProjectPraroopOne from "./ProjectBarChart/ProjectPraroopOne";
import "../../Sector_Login/sector_assets/CSS/SectorChangePass.css";
import SectorLeftNav from "../sectorleftnav/SectorLeftNav";
import SectorNandaGaura from "./SectorNandaGaura";
import SectorBarcharOne from "./sectorbarchart/SectorBarcharOne";
import SectorBarchartTwo from "./sectorbarchart/SectorBarchartTwo";

const SectorDashBoard = () => {
  return (
    <>
      <div>
        {/* Main Container */}
        <div className="main-container">
          {/* Navigation */}
          <SectorLeftNav />
          {/* Main Content */}
          <div className="main">
            <SectorNandaGaura />
            <div className="box-container">
              <div className="nd-tech-heading">
                <h1>Dashboard-Sector login </h1>
              </div>
              <Row className="mt-3">
                <Col lg={6} md={6} sm={12}>
                  <div className="nd-dis-heading1">
                    <h2>Real Time Stats for Praroop 1</h2>
                  </div>
                  <Card className="project-card-box">
                    <Card.Body>
                      <SectorBarcharOne />
                    </Card.Body>
                  </Card>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <div className="nd-dis-heading1">
                    <h2>Real Time Stats for Praroop 2 (2024)</h2>
                  </div>
                  <Card className="project-card-box">
                    <Card.Body>
                    <SectorBarchartTwo />
                    </Card.Body>
                  </Card>
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

export default SectorDashBoard;
