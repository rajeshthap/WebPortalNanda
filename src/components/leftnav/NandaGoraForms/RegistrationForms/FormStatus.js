import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../../assets/css/LeftNav.css";
import { IoCloseCircle } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import DashHeader from "../../DashHeader";
import "../../../../assets/css/NandaStepOne.css";
import "../../../../assets/css/HomePage.css";
import Footer from "../../../footer/Footer";
import InnerNavigation from "../../InnerNavigation";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormStatuspending from "../../FormStatuspending";
import NandaYojana from "../../NandaYojana";
import TwelfthFormStatus from "./TwelfthFormStatus";
import Accordion from "react-bootstrap/Accordion";

const FormStatus = () => {
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {},
    step4: {},
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    if (!user_id) {
      console.error("No user_id  found in localStorage");
      setLoading(false);
      return;
    }
    console.log("user_id", user_id);

    const fetchStep1 = axios.get(
      `https://brjobsedu.com/Nandagora/api2/phase1/update/${user_id}/`
    );
    const fetchStep2 = axios.get(
      `https://brjobsedu.com/Nandagora/api2/phase2b/update/${user_id}/`
    );
    const fetchStep3 = axios.get(
      `https://brjobsedu.com/Nandagora/api2/phase3b/update/${user_id}/`
    );
    const fetchStep4 = axios.get(
      `https://brjobsedu.com/Nandagora/api2/phase4/update/${user_id}/`
    );

    Promise.allSettled([fetchStep1, fetchStep2, fetchStep3, fetchStep4])
      .then((results) => {
        const data = {
          step1: results[0].status === "fulfilled" ? results[0].value.data : {},
          step2: results[1].status === "fulfilled" ? results[1].value.data : {},
          step3: results[2].status === "fulfilled" ? results[2].value.data : {},
          step4: results[3].status === "fulfilled" ? results[3].value.data : {},
        };
        setFormData(data);
      })
      .catch((error) => {
        console.error("Error fetching form status:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user_id]);

  const isStepComplete = (step) => {
    switch (step) {
      case 1:
        return !!formData.step1.form_id;
      case 2:
        return !!formData.step2.form_id;
      case 3:
        return !!formData.step3.form_id;
      case 4:
        return !!formData.step4.form_id;
      default:
        return false;
    }
  };

  const getStatusIcon = (step) =>
    isStepComplete(step) ? (
      <FaCheckCircle className="text-success" />
    ) : (
      <IoCloseCircle className="text-danger" />
    );

  const allStepsCompleted = [1, 2, 3, 4].every((step) => isStepComplete(step));
  const firstIncompleteStep = [1, 2, 3, 4].find(
    (step) => !isStepComplete(step)
  );

  const stepToRouteMap = {
    1: "/NandaStepOne",
    2: "/NandaStepTwo",
    3: "/NandaStepThree",
    4: "/NandaStep4th",
  };

  const handleProceedClick = () => {
    if (firstIncompleteStep) {
      const route = stepToRouteMap[firstIncompleteStep] || "/NandaStepOne";
      navigate(route);
    }
  };

  const { step1 } = formData;

  return (
    <>
      <DashHeader />
      <div className="main-container">
        <InnerNavigation />
        <div className="main">
          <NandaYojana />

          <Accordion defaultActiveKey="1" className="mb-3 mt-4">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Your Form Status Page</Accordion.Header>
              <Accordion.Body>
                <div className="box-container">
                  <Row>
                    <div className="nd-step1">
                      <h3>Your Form Status Page</h3>
                    </div>

                    <Row className="nd-personalinfo nd-personalID">
                      <Col lg={3}>Form ID</Col>
                      <Col lg={9}>{step1.form_id || "none"}</Col>
                    </Row>
                    <Row className="nd-personalinfo nd-personalID">
                      <Col lg={3}>Girl Name</Col>
                      <Col lg={9}>{step1.kanya_name || "none"}</Col>
                    </Row>
                    <Row className="nd-personalinfo nd-personalID">
                      <Col lg={3}>DOB (Y-M-D)</Col>
                      <Col lg={9}>{step1.dob || "none"}</Col>
                    </Row>
                    <Row className="nd-personalinfo nd-personalID">
                      <Col lg={3}>Father Name</Col>
                      <Col lg={9}>{step1.fath_name || "none"}</Col>
                    </Row>
                    <Row className="nd-personalinfo nd-personalID">
                      <Col lg={3}>Mother Name</Col>
                      <Col lg={9}>{step1.moth_name || "none"}</Col>
                    </Row>
                    <Row className="nd-personalinfo nd-personalID">
                      <Col lg={3}>District</Col>
                      <Col lg={9}>{step1.district || "none"}</Col>
                    </Row>
                    <Row className="nd-personalinfo nd-personalID">
                      <Col lg={3}>Project</Col>
                      <Col lg={9}>{step1.project || "none"}</Col>
                    </Row>
                    <Row className="nd-personalinfo nd-personalID">
                      <Col lg={3}>Sector</Col>
                      <Col lg={9}>{step1.sector || "none"}</Col>
                    </Row>
                    <Row className="nd-personalinfo nd-personalID">
                      <Col lg={3}>AWC (AWC/MINI AWC)</Col>
                      <Col lg={9}>{step1.awc_name || "none"}</Col>
                    </Row>
                    <Row className="nd-personalinfo nd-personalID">
                      <Col lg={3}>AWC Code</Col>
                      <Col lg={9}>{step1.awc_code || "none"}</Col>
                    </Row>

                    {[1, 2, 3, 4].map((step) => (
                      <Row key={step} className="nd-personalinfo nd-personalID">
                        <Col
                          lg={3}
                          className="nd-personalID-txt nd-steps-checks"
                        >
                          Step {step}
                        </Col>
                        <Col
                          lg={9}
                          className={
                            isStepComplete(step)
                              ? "personalID-complete"
                              : "personalID-pendding"
                          }
                        >
                          {getStatusIcon(step)}
                        </Col>
                      </Row>
                    ))}

                    {allStepsCompleted ? (
                      <div className="text-center nd-f-12 text-success">
                        सभी चरण सफलतापूर्वक जमा किए गए हैं। धन्यवाद!
                      </div>
                    ) : (
                      <>
                        <div className="text-center nd-f-12">
                          फॉर्म अंतिम रूप से सबमिट नहीं किया गया हैं
                        </div>
                        <div className="text-center nd-f-12">
                          <FormStatuspending />
                          अगले अधूरे चरण पर आगे बढ़ें।
                        </div>
                        <div className="nd-btnn text-center">
                          <Button
                            className="mt-3 nd-primary-btn"
                            onClick={handleProceedClick}
                            disabled={loading}
                          >
                            Proceed to Step {firstIncompleteStep || 1}
                          </Button>
                        </div>
                      </>
                    )}
                  </Row>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <div>
            <TwelfthFormStatus />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default FormStatus;
