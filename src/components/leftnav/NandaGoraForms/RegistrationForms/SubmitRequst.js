import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "../../../../assets/css/LeftNav.css";

import "@fortawesome/fontawesome-free"; // Font Awesome library

import DashHeader from "../../DashHeader";
import "../../../../assets/css/NandaStepOne.css";
import "../../../../assets/css/HomePage.css";

import Footer from "../../../footer/Footer";

import InnerNavigation from "../../InnerNavigation";

import { Row, Col, Button } from "react-bootstrap";
import GirlsBornStep from "./GirlsBornStep";
import { Link } from "react-router-dom";

const SubmitRequst = ({ buttons }) => {
  const [isNavClosed, setIsNavClosed] = useState(false);

  const toggleNav = () => {
    setIsNavClosed(!isNavClosed);
  };

  return (
    <>
      <div>
        {/* Header */}
        <DashHeader />
        <div className="main-container">
          <InnerNavigation />

          {/* Main Container */}
          <div className="main">
            <GirlsBornStep />
            <div className="box-container">
              <Row>
                <Row>
                 
                  <div className="nd-step1">
                    <h3>Step 1 : व्यक्तिगत जानकारी</h3>
                  </div>
                </Row>
              

                 SubmitRequst
                <div className="nd-btnn text-center">
                 <Link to="/NandaStepTwo"> <Button  className="mt-3 nd-primary-btn"> सबमिट करे </Button></Link>
                </div>
               
              </Row>
            </div>
            <div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmitRequst;
