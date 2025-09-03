import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function CreateNewPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const [phone, setPhone] = useState();
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
const phone_no = localStorage.getItem("phone");

  // Load phone from location.state or localStorage
  useEffect(() => {
    const phoneFromState = location.state?.phone;
    if (phoneFromState) {
      setPhone(phoneFromState);
      localStorage.setItem("resetPhone", phoneFromState);
    } else {
      const savedPhone = localStorage.getItem("phone");
      if (savedPhone) {
        setPhone(savedPhone);
      }
    }
  }, [location.state]);

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    

    try {
      const response = await axios.post(
        "https://brjobsedu.com/Nandagora/api/Resetpassword/",
        {
          phone:phone_no,
          password: password,
          confirm_password: confirm_password,
        }
      );

      console.log("Phone submitted:", phone);

      if (response.status === 200 || response.data.success) {
        setSuccess("पासवर्ड सफलतापूर्वक अपडेट किया गया।");
        localStorage.removeItem("resetPhone");
        setTimeout(() => navigate("/UserLogin"), 3000);
      } else {
        setError("पासवर्ड रीसेट करने में असफल। कृपया पुनः प्रयास करें।");
      }
    } catch (err) {
      console.error("Reset Password Error:", err);
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "पासवर्ड रीसेट में समस्या हुई।";
      setError(msg);
    }
  };

  const goBack = () => navigate(-1);

  return (
    <Container className="nd-user-reg mt-2">
      <Row>
        <div className="nd-user-otp mt-5">
          <Form>
            <div className="text-center nd-regis-heading">
              <h5 className="mt-2">नया पासवर्ड सेट करें</h5>
            </div>

            <Row className="p-3">
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Col lg={12}>
                <Form.Group className="mb-3 nd-req-text">
                  <Form.Label>
                    मोबाइल नंबर <span className="alert-txt">*</span>
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="10 अंकों का मोबाइल नंबर"
                    className="shadow1"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={10} disabled
                  />
                </Form.Group>
              </Col>

              <Col lg={12}>
                <Form.Group className="mb-3 nd-req-text">
                  <Form.Label>
                    नया पासवर्ड <span className="alert-txt">*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="नया पासवर्ड"
                    className="shadow1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} autoComplete="new-password"
                  />
                </Form.Group>
              </Col>

              <Col lg={12}>
                <Form.Group className="mb-3 nd-req-text">
                  <Form.Label>
                    पासवर्ड पुनः लिखें <span className="alert-txt">*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="पासवर्ड पुनः लिखें"
                    className="shadow1"
                    value={confirm_password}
                    onChange={(e) => setConfirm_password(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <div className="nd-registration mt-4">
                <Button
                  variant="secondary"
                  className="nd-back-btn me-2"
                  onClick={goBack}
                >
                  वापस जाएं
                </Button>
                <Button
                  variant="primary"
                  className="btn nd-primary-btn"
                  onClick={handleSubmit}
                >
                  पासवर्ड सेव करें
                </Button>
              </div>
            </Row>
          </Form>
        </div>
      </Row>
    </Container>
  );
}

export default CreateNewPassword;
