import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../../assets/css/LeftNav.css";
import { IoCloseCircle } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import "../../../../assets/css/NandaStepOne.css";
import "../../../../assets/css/HomePage.css";
import Footer from "../../../footer/Footer";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormStatuspending from "../../FormStatuspending";

const UserOtp = ({ phone, onConfirm, onCancel }) => {
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const navigate = useNavigate();
// back button
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

  const verifyOtp = async () => {
    if (!otp) return alert("कृपया OTP दर्ज करें।");

    try {
      setVerifying(true);
      const res = await axios.post(
        "https://brjobsedu.com/Nandagora/api/verify-otp/",
        { phone, otp }
      );

      if (res.data.success) {
        alert("OTP सफलतापूर्वक सत्यापित हो गया!");
        onConfirm();
      } else {
        alert("अमान्य OTP। कृपया पुनः प्रयास करें।");
      }
    } catch (error) {
      console.error("OTP सत्यापन में त्रुटि:", error);
      alert("OTP सत्यापित करने में विफल। कृपया पुनः प्रयास करें।");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div>
      <Form.Group>
        <Form.Label>{phone} पर भेजा गया OTP दर्ज करें</Form.Label>
        <Form.Control
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </Form.Group>
      <div className="mt-2 text-end">
        <Button variant="secondary" onClick={onCancel} className="me-2">
          रद्द करें
        </Button>
        <Button onClick={verifyOtp} disabled={verifying}>
          {verifying ? "सत्यापन हो रहा है..." : "OTP सत्यापित करें और फॉर्म हटाएँ"}
        </Button>
      </div>
    </div>
  );
};

const TwelfthFormStatus = () => {
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {},
    step4: {},
  });
  const [loading, setLoading] = useState(true);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showUserOtp, setShowUserOtp] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const phone = user?.phone;
  const user_id = localStorage.getItem("user_id");
  const form_id = localStorage.getItem("form_id");

  const finalConfirm = JSON.parse(localStorage.getItem("finalconfirm")) || null;

  const requiredFilesStep4 = [
    "pp_photo",
    "stu_sign",
    "par_sign",
    "mark10",
    "mark12",
    "stu_adhar",
    "stu_pan",
    "stu_dom",
    "hou_tax",
    "inc_cer",
    "fam_reg",
    "cas_cer",
    "unm_cer",
    "old_ben",
    "gir_pas",
    "fam_pas",
    "fur_edu",
    "sch_doc",
    "aww_doc",
  ];

  useEffect(() => {
    if (!user_id) {
      console.error("User_id नहीं मिला");
      setLoading(false);
      return;
    }

    const fetchStep1 = axios.get(
      `https://brjobsedu.com/Nandagora/api4/step_one_updata__get/${user_id}/`
    );
    const fetchStep2 = axios.get(
      `https://brjobsedu.com/Nandagora/api4/phase2b/${user_id}/`
    );
    const fetchStep3 = axios.get(
      `https://brjobsedu.com/Nandagora/api4/step3a/${user_id}/`
    );
    const fetchStep4 = axios.get(
      `https://brjobsedu.com/Nandagora/api4/step4update/${user_id}/`
    );

    Promise.allSettled([fetchStep1, fetchStep2, fetchStep3, fetchStep4])
      .then((results) => {
        const step1Data =
          results[0].status === "fulfilled" ? results[0].value.data : {};
        const step2Data =
          results[1].status === "fulfilled" ? results[1].value.data : {};
        const step3Data =
          results[2].status === "fulfilled" ? results[2].value.data : {};
        const step4Data =
          results[3].status === "fulfilled" ? results[3].value.data : {};

        if (step1Data?.form_id) localStorage.setItem("form_id", step1Data.form_id);
        else if (step2Data?.form_id) localStorage.setItem("form_id", step2Data.form_id);
        else if (step3Data?.form_id) localStorage.setItem("form_id", step3Data.form_id);
        else if (step4Data?.form_id) localStorage.setItem("form_id", step4Data.form_id);

        setFormData({
          step1: step1Data,
          step2: step2Data,
          step3: step3Data,
          step4: step4Data,
        });
      })
      .catch((error) =>
        console.error("Twelfth form स्थिति प्राप्त करने में त्रुटि:", error)
      )
      .finally(() => setLoading(false));
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
        if (!formData.step4) return false;
        return requiredFilesStep4.every((fileKey) => !!formData.step4[fileKey]);
      case 5:
        return finalConfirm?.confirmed === true;
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

  const allStepsCompleted = [1, 2, 3, 4, 5].every((step) =>
    isStepComplete(step)
  );
  const firstIncompleteStep = [1, 2, 3, 4, 5].find(
    (step) => !isStepComplete(step)
  );
  const stepToRouteMap = {
    1: "/TwelthStepOne",
    2: "/TwelthStepTwo",
    3: "/TwelthStepThree",
    4: "/TwelfthStepFour",
    5: "/TwelfthFinalView", 
  };

  const handleProceedClick = () => {
    if (firstIncompleteStep)
      navigate(stepToRouteMap[firstIncompleteStep] || "/TwelthStepOne");
  };

  const sendOtp = async () => {
    if (!phone) return alert("LocalStorage में फोन नंबर नहीं मिला!");
    try {
      setSendingOtp(true);
      await axios.post("https://brjobsedu.com/Nandagora/api/send-otp/", {
        phone,
      });
      alert("आपके फोन पर OTP भेज दिया गया है।");
      setShowUserOtp(true);
    } catch (error) {
      console.error("OTP भेजने में त्रुटि:", error);
      alert("OTP भेजने में विफल। कृपया पुनः प्रयास करें।");
    } finally {
      setSendingOtp(false);
    }
  };

  const deleteForm = async () => {
    if (!form_id) {
      alert("Form ID नहीं मिली!");
      return;
    }
    try {
      setDeleting(true);
      await axios.delete(
        `https://brjobsedu.com/Nandagora/api4/Delete_for_12/${user_id}/`
      );
      alert("फॉर्म सफलतापूर्वक हटा दिया गया!");
      localStorage.removeItem("form_id");
      localStorage.removeItem("finalconfirm");
      localStorage.removeItem("user");
      navigate("/UserLogin");
    } catch (error) {
      console.error("Form हटाने में त्रुटि:", error);
      alert("फॉर्म हटाने में विफल। कृपया पुनः प्रयास करें।");
    } finally {
      setDeleting(false);
      setShowUserOtp(false);
    }
  };

  if (loading) return <p>लोड हो रहा है...</p>;

  return (
    <>
      <div className="main-container">
        <div className="main">
          <div className="box-container">
            <Row>
              <div className="nd-step1">
                <h3>बारहवीं फॉर्म स्थिति पृष्ठ</h3>
              </div>

              {[1, 2, 3, 4, 5].map((step) => (
                <Row key={step} className="nd-personalinfo nd-personalID">
                  <Col lg={3} className="nd-personalID-txt nd-steps-checks">
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
                  <div className="nd-btnn text-center">
                    <Button
                      className="mt-3 ms-2 btn-danger"
                      onClick={sendOtp}
                      disabled={sendingOtp || deleting}
                    >
                      {sendingOtp
                        ? "OTP भेजा जा रहा है..."
                        : deleting
                        ? "हटाया जा रहा है..."
                        : "फॉर्म हटाएँ"}
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center nd-f-12">
                    फॉर्म अंतिम रूप से सबमिट नहीं किया गया है
                  </div>
                  <div className="text-center nd-f-12">
                    <FormStatuspending /> अगले अधूरे चरण पर आगे बढ़ें।
                  </div>
                  <div className="nd-btnn text-center">
                    <Button
                      className="mt-3 nd-primary-btn"
                      onClick={handleProceedClick}
                      disabled={loading}
                    >
                      अगले अधूरे चरण पर जाएँ {firstIncompleteStep || 1}
                    </Button>
                  </div>
                </>
              )}
            </Row>
          </div>
          <Footer />
        </div>
      </div>

      <Modal show={showUserOtp} onHide={() => setShowUserOtp(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>फॉर्म हटाने की पुष्टि करें</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserOtp
            phone={phone}
            onConfirm={deleteForm}
            onCancel={() => setShowUserOtp(false)}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TwelfthFormStatus;
