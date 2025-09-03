import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../../assets/css/MainHome.css";
import "../../assets/css/CreatePasswordRegis.css";

function UserOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const phoneFromState = location.state?.phone || localStorage.getItem("phone") || "";
  const purpose = location.state?.purpose === "forgot" ? "forgot" : "register";

  const [phone] = useState(phoneFromState);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (!phone) {
      setError("मोबाइल नंबर नहीं मिला। कृपया पहले फॉर्म भरें।");
    }
  }, [phone]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/UserLogin");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleVerifyOtp = async () => {
    setError("");
    setSuccess("");

    if (!otp || otp.length < 4) {
      setError("कृपया मान्य OTP दर्ज करें।");
      return;
    }

    try {
      const response = await axios.post("https://brjobsedu.com/Nandagora/api/verify-otp/", {
        phone,
        otp,
      });

      if (response.status === 200 && response.data.success) {
        localStorage.setItem("phone", phone);
        setSuccess("OTP सत्यापित हो गया है। कृपया प्रतीक्षा करें...");

        setTimeout(() => {
          const redirectPath =
            purpose === "forgot" ? "/CreateNewPassword" : "/CreatePasswordRegis";
          navigate(redirectPath);
        }, 1500);
      } else {
        setError("OTP अमान्य है। कृपया पुनः प्रयास करें।");
      }
    } catch (error) {
      console.error("OTP Verify Error:", error);
      setError("OTP सत्यापन में समस्या हुई। कृपया बाद में प्रयास करें।");
    }
  };

  const goBack = () => navigate("/UserLogin");

  return (
    <Container className="nd-user-reg mt-2">
      <Row>
        <div className="nd-user-otp mt-5">
          <Form>
            <div className="text-center nd-regis-heading">
              <h5 className="mt-2">OTP सत्यापन फॉर्म</h5>
              <div className="countdown-timer">समय शेष: {countdown} सेकंड</div>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Row className="p-3">
              <Col lg={12}>
                <Form.Group className="mb-3 nd-req-text">
                  <Form.Label>
                    मोबाइल नंबर <span className="alert-txt">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="shadow1"
                    value={phone}
                    readOnly
                  />
                </Form.Group>
              </Col>

              <Col lg={12}>
                <Form.Group className="mb-3 nd-req-text">
                  <Form.Label>
                    OTP दर्ज करें <span className="alert-txt">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="OTP दर्ज करें"
                    className="shadow1"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    inputMode="numeric"
                  />
                </Form.Group>
              </Col>

              <div className="nd-registration mt-4 d-flex justify-content-between">
                <Button variant="secondary" className="nd-back-btn" onClick={goBack}>
                  वापस जाएं
                </Button>
                <Button
                  variant="secondary"
                  className="nd-primary-btn nd-primary-btn1"
                  onClick={handleVerifyOtp}
                >
                  OTP सत्यापित करें
                </Button>
              </div>
            </Row>
          </Form>
        </div>
      </Row>
    </Container>
  );
}

export default UserOtp;
