import React, { useState } from "react";
import "../../assets/css/UserRegistration.css";
import "../../assets/css/ModalOne.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    setPhone("");
    setError("");
    setSuccess("");
    setLoading(false);
  };

  const handleShow = () => {
    setShow(true);
    setPhone("");
    setError("");
    setSuccess("");
  };

  const handleSendOtp = async () => {
    setError("");
    setSuccess("");

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("कृपया एक वैध 10 अंकों का मोबाइल नंबर दर्ज करें।");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://brjobsedu.com/Nandagora/api/send-otp/", {
        phone:phone,
      });

      if (response.status === 200) {
        setSuccess("OTP सफलतापूर्वक भेजा गया!");
        setTimeout(() => {
          handleClose();
          navigate("/UserOtp", {
            state: {
              phone,
              purpose: "forgot",
            },
          });
        }, 1500);
      }
    } catch (err) {
      console.error("Axios error:", err);

      if (err.response?.status === 404) {
        setError("यह मोबाइल नंबर पंजीकृत नहीं है।");
      } else if (err.response?.status === 400) {
        setError("कृपया मोबाइल नंबर प्रदान करें।");
      } else {
        setError("सर्वर त्रुटि: कृपया बाद में पुनः प्रयास करें।");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <p onClick={handleShow} style={{ cursor: "pointer" }}>
        पासवर्ड भूल गए हैं?
      </p>

      <Modal show={show} onHide={handleClose} size="md">
        <Form onSubmit={(e) => e.preventDefault()}>
          <Modal.Header closeButton>
            <Modal.Title className="nd-modal-title">
              पासवर्ड रीसेट फॉर्म
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="nd-modal-body">
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form.Group className="mb-3 nd-label-input">
              <Form.Label>पंजीकृत मोबाइल नंबर दर्ज करें</Form.Label>
              <Form.Control
                type="tel"
                placeholder="10 अंकों का मोबाइल नंबर"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="nd-forgot-input"
                maxLength={10}
                required
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer className="nd-registration">
            <Button
              variant="secondary"
              className="nd-primary-btn"
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? "OTP भेजा जा रहा है..." : "OTP भेजें"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ForgotPassword;
