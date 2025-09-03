import React from "react";
import "../../assets/css/DashBoardIndex.css";
import Twelve from "../../assets/images/12thpass.png";
import { Row, Col } from "react-bootstrap";
function DashboardIndex() {
  return (
    <div>
      <Row className="p-1 nd-nanda-main">
        <Col lg={3} md={3} sm={12}>
          <div className="nd-nanda-title">
            <h1> नंदा गौरा योजना</h1>
          </div>
        </Col>
        <Col lg={4} md={4} sm={12}>
          <div className="nd-nanda-pdf">
          <a
                href="/shashandesh_new.pdf"
                target="_blank"
                download
              > 
            <h2>
              {" "}
              <img src={Twelve} alt="नंदा गौरा योजना विषयक शासनादेश" />
              नंदा गौरा योजना विषयक शासनादेश{" "}
            </h2></a>
          </div>
        </Col>
        <Col lg={5} md={5} sm={12}>
          <div className="nd-nanda">
            <p>
              {" "}
              2024 में 12वीं उत्तीर्ण करने वाली लड़कियों के लिए आवेदन की आखिरी
              तारीख 30 नवंबर, 2024 तय की गई है।
              <br />
              12वीं का नया पंजीकरण अब बंद हो गया है, फॉर्म पूरा करने के लिए Form
              Status पर क्लिक करें और फॉर्म पूरा करें
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DashboardIndex;
