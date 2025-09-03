import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TwelfthStepOneView from "./TwelfthStepOneView";
import TwelfthStepTwoView from "./TwelfthStepTwoView";
import TwelfthStepThreeView from "./TwelfthStepThreeView"; 
import TwelfthStepFourView from "./TwelfthStepFourView";

function EditStepButtonComponent({ step, data }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    if (step === "one") {
      navigate("/TwelthStepTwo");
    } else if (step === "two") {
      navigate("/TwelthStepThree");
    } else if (step === "three") {
      navigate("/TwelfthStepFour"); 
    } else if (step === "four") {
      navigate("/dashboard"); 
    }
  };

  const getStepComponent = () => {
    if (step === "one") return <TwelfthStepOneView />;
    if (step === "two") return <TwelfthStepTwoView />;
    if (step === "three") return <TwelfthStepThreeView />;
    if (step === "four") return <TwelfthStepFourView />;
    return null;
  };

  return (
    <>
      <Button variant="primary" onClick={handleOpen}>
        {step === "one"
          ? "स्टेप 1 एडिट करें"
          : step === "two"
          ? "स्टेप 2 एडिट करें"
          : step === "three"
          ? "स्टेप 3 देखें/एडिट करें"
          : "स्टेप 4 दस्तावेज़ देखें/एडिट करें"}
      </Button>

      <Modal
        show={showModal}
        onHide={handleClose}
        size="xl"
        centered
        fullscreen="xl-down"
        dialogClassName="custom-step-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {step === "one"
              ? "स्टेप 1 एडिट करें"
              : step === "two"
              ? "स्टेप 2 एडिट करें"
              : step === "three"
              ? "स्टेप 3 देखें/एडिट करें"
              : "स्टेप 4 दस्तावेज़ देखें/एडिट करें"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4">{getStepComponent()}</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            बंद करें
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditStepButtonComponent;
