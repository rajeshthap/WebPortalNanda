import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import OrphanStepOneView from "./OrphanStepOneView";
import OrphanStepTwoView from "./OrphanStepTwoView";

function EditOrphan({ step, data }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    if (step === "one") {
      navigate("/OrphanStepTwo"); 
    } else if (step === "two") {
      navigate("/dashboard"); 
    }
  };

  const getStepComponent = () => {
    if (step === "one") return <OrphanStepOneView />;
    if (step === "two") return <OrphanStepTwoView />;
    return null;
  };

  return (
    <>
      <Button variant="primary" onClick={handleOpen}>
        {step === "one"
          ? "स्टेप 1 एडिट करें"
          : step === "two"
          ? "स्टेप 2 दस्तावेज़ देखें/एडिट करें"
          : step === "three"
          }
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
              ? "स्टेप 2 दस्तावेज़ देखें/एडिट करें"
              : step === "three"
            }
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

export default EditOrphan;
