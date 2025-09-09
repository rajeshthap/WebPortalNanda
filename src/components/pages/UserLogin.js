import React, { useState, useRef,useEffect } from "react";
import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import axios from "axios";

import "../../assets/css/MainHome.css";
import News from "../../assets/images/news.png";
import Twelve from "../../assets/images/12thpass.png";
import LoginIcon from "../../assets/images/login.png";
import UserRegistration from "../modal/UserRegistration";
import ForgotPassword from "../modal/ForgotPassword";
import HomePage from "../pages/HomePage";

function UserLogin() {

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();
  // back button code
      useEffect(() => {
        window.history.pushState(null, "", window.location.href);
        const handlePopState = () => {
          window.history.pushState(null, "", window.location.href);
        };
        window.addEventListener("popstate", handlePopState);
        return () => {
          window.removeEventListener("popstate", handlePopState);
        };
      }, [navigate]);
  
  const validatePhone = (phone) => /^\d{10}$/.test(phone);

  const handleCaptcha = (value) => {
    setCaptchaVerified(!!value);
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  if (!captchaVerified) {
    setError("कृपया CAPTCHA सत्यापित करें।");
    return;
  }

  if (!phone || !password) {
    setError("कृपया मोबाइल नंबर और पासवर्ड भरें।");
    return;
  }

  if (!validatePhone(phone)) {
    setError("कृपया मान्य 10 अंकों का मोबाइल नंबर दर्ज करें।");
    return;
  }

   try {
  const response = await axios.post("https://brjobsedu.com/Nandagora/api/login/", {
    phone,
    password,
  });

  console.log("Login API response:", response.data);

const { access, refresh, user_data: user } = response.data || {};

  if (!user) {
    console.warn("User data missing from response");
    setError("सर्वर से उपयोगकर्ता जानकारी प्राप्त नहीं हुई।");
    return;
  }

  if (!user.id) {
    console.warn("User ID missing");
    setError("उपयोगकर्ता जानकारी अमान्य है।");
    return;
  }

  localStorage.setItem("access_token", access || "");
  console.log("Access token set in localStorage:", access);
  localStorage.setItem("refresh_token", refresh || "");
  localStorage.setItem("user_id", user.id);
  localStorage.setItem("user", JSON.stringify({
    id: user.id,
    name: user.name || "",
    phone: user.phone || "",
    aadhaar: user.aadhaar || "",
    block: user.block || "",
    district: user.district || ""
  }));

  console.log("Logged in user:", user);
  alert("Login Successfully");
  navigate("/UserDashboard");

} catch (error) {
  if (error.response) {
    console.error("Login error:", error.response.data);
    setError(error.response.data?.detail || "लॉगिन विफल रहा। कृपया सही जानकारी दर्ज करें।");
  } else if (error.request) {
    setError("सर्वर से कोई प्रतिक्रिया नहीं मिली। कृपया नेटवर्क जांचें।");
  } else {
    setError("कुछ गलत हो गया। कृपया पुनः प्रयास करें।");
  }
}

};


  return (
    <div className="row">
      <div className="nd-main-banner">
        <div className="nd-banner-home">
          <Row>
            {/* Left Info Section */}
            <Col lg={8} md={8} sm={12} className="mt-5 nd-main-col nd-main-data">
              <div className="nd-update col-lg-8 col-sm-12 d-flex align-items-center gap-3">
                <img src={News} alt="news" />
                <Marquee>
                  नंदा गौरा योजना के तहत 12वीं पासआउट 2024 के लिए नए आवेदन केवल 30-नवंबर-2024 तक भरे जा सकते हैं।
                </Marquee>
              </div>
              <div className="nd-subupdate">
                <a href="/12thpassfile.jpg" target="_blank" rel="noopener noreferrer">
                  <p>
                    <img src={Twelve} alt="12वीं पासआउट 2024" />
                    12वीं पासआउट 2024 के लिए नए आवेदन की अंतिम तिथि 20 दिसंबर 2024 तक बढ़ाने के संबंध
                  </p>
                </a>
              </div>
              <p className="nd-subdata mt-4">नंदा गौरा योजना</p>
            </Col>

            {/* Right Login Section */}
            <Col lg={4} md={4} sm={12} className="mt-5 nd-main-login">
              <Card className="mt-4 p-3 nd-Login-form">
                <p className="text-center nd-login-title">आवेदन करने हेतु पोर्टल खुला हुआ है</p>
                <p className="text-center nd-login-subtitle">आवेदक/उपयोगकर्ता लॉगिन फॉर्म</p>

                <Form className="nd-form" onSubmit={handleLogin}>
                  <h1 className="nd-sign">
                    <img src={LoginIcon} alt="sign" className="p-2" /> साइन इन करें
                  </h1>

                  {error && <Alert variant="danger">{error}</Alert>}

                  <Form.Group className="mb-3">
                    <Form.Label className="nd-form-label">पंजीकृत मोबाइल नंबर</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="पंजीकृत मोबाइल नंबर"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="nd-form-control"
                      maxLength={10}
                      inputMode="numeric"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="nd-form-label">आपका पासवर्ड</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="आपका पासवर्ड"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="nd-form-control"
                    />
                  </Form.Group>

                  <Form.Group className="text-center">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                      onChange={handleCaptcha}
                    />
                    <Button
                      type="submit"
                      className="mt-3 nd-primary-btn nd-primary-btn1"
                      disabled={!captchaVerified}
                    >
                      साइन इन
                    </Button>
                  </Form.Group>

                  <Row className="mt-3">
                    <Col lg={6} md={6} sm={6} className="nd-user-regis">
                      <ForgotPassword />
                    </Col>
                    <Col lg={6} md={6} sm={6} className="nd-user-regis">
                      <UserRegistration />
                    </Col>
                    <Col lg={12}>
                      <p className="text-center">Login/Reg. Tutorial</p>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Col>
          </Row>
          
        </div>
      </div>
      <HomePage/>
    </div>
  );
}

export default UserLogin;
