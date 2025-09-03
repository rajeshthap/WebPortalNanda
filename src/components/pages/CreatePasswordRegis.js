import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/MainHome.css";
import "../../assets/css/CreatePasswordRegis.css";

function CreatePasswordRegis() {
  const [awc, setAwc] = useState([{ project: "", id: "" }]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    confirm_password: "",
    name: "",
    aadhaar: "",
    district: localStorage.getItem("district") || "",
    block: "",
    project_type: "",
  });

  const [isDistrictAutoFilled, setIsDistrictAutoFilled] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [blockData, setBlockData] = useState([]);

useEffect(() => {
  if (!formData.district) return;

  const fetchBlocks = async () => {
    try {
      const res = await axios.get(
        `https://brjobsedu.com/Nandagora/api3/district-data/?district=${formData.district}`
      );

      const data = res.data;
        //new array filterng for removing duplicacy
      const unique = data.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.project === item.project)
      );

      setBlockData(unique);
    } catch (err) {
      console.error("Error fetching block data:", err);
    }
  };

  fetchBlocks();
}, [formData.district]);



  useEffect(() => {
    const storedPhone = localStorage.getItem("phone") || "";
    const storedDistrict = localStorage.getItem("district") || "";

    setFormData((prev) => ({
      ...prev,
      phone: storedPhone,
      district: storedDistrict,
    }));

    setIsDistrictAutoFilled(!!storedDistrict);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!/^[a-zA-Z\u0900-\u097F\s]+$/.test(formData.name)) {
      return setError(
        "कृपया नाम में केवल अक्षर दर्ज करें (संख्या या चिन्ह नहीं)।"
      );
    }

    if (formData.password !== formData.confirm_password) {
      return setError("पासवर्ड मेल नहीं खा रहे हैं।");
    }

    if (formData.aadhaar && !/^\d{12}$/.test(formData.aadhaar)) {
      return setError("कृपया 12 अंकों का वैध आधार नंबर दर्ज करें।");
    }

    setIsSubmitting(true);

    try {
      const res = await axios.post(
        "https://brjobsedu.com/Nandagora/api/Register/",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setSuccess(res.data.message || "पंजीकरण सफल रहा!");
      setTimeout(() => navigate("/UserLogin"), 3000);
    } catch (err) {
      const res = err.response;
      if (res?.status === 409) {
        setError("यह मोबाइल नंबर पहले से पंजीकृत है।");
      } else if (res?.status === 400) {
        const fieldErrors = Object.values(res.data).flat().join(" ");
        setError(fieldErrors);
      } else {
        setError("सर्वर त्रुटि। कृपया बाद में पुनः प्रयास करें।");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="nd-user-reg mt-2">
      <Form onSubmit={handleSubmit}>
        <div className="text-center nd-regis-heading">
          <h5 className="mt-2">लाभार्थी पंजीकरण फॉर्म</h5>
        </div>

        <Row className="p-3 nd-p-regi">
          <span className="alert-txt-registration">
            12वीं पासआउट आवेदकों के लिए पंजीकरण अब बंद हो गया है ।
          </span>

          {error && (
            <Alert variant="danger" className="register-alert">
              {error}
            </Alert>
          )}
          {success && <Alert variant="success">{success}</Alert>}

          <Col lg={4}>
            <Form.Group className="mb-3 nd-req-text">
              <Form.Label>
                बालिका का नाम <span className="alert-txt">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="नाम दर्ज करें"
                required
              />
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group className="mb-3 nd-req-text">
              <Form.Label>
                मोबाइल नंबर <span className="alert-txt">*</span>
              </Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="shadow1"
                required
              />
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group className="mb-3 nd-req-text">
              <Form.Label>
                पासवर्ड <span className="alert-txt">*</span>
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="पासवर्ड"
                required
              />
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group className="mb-3 nd-req-text">
              <Form.Label>
                पासवर्ड पुनः लिखें <span className="alert-txt">*</span>
              </Form.Label>
              <Form.Control
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="पुनः पासवर्ड"
                required
              />
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group className="mb-3 nd-req-text">
              <Form.Label>आधार नंबर</Form.Label>
              <Form.Control
                type="text"
                name="aadhaar"
                value={formData.aadhaar}
                onChange={handleChange}
                placeholder="12 अंकों का आधार (वैकल्पिक)"
                maxLength="12"
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/\D/g, ""))
                }
              />
              <span>नवजात बालिका के लिए मां का आधार मान्य है।</span>
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group className="mb-3 nd-req-text">
              <Form.Label>
                जिला <span className="alert-txt">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="district"
                value={formData.district}
                readOnly
                className={
                  isDistrictAutoFilled ? "auto-filled shadow1" : "shadow1"
                }
              />
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group className="mb-3 nd-req-text">
              <Form.Label>
                ब्लॉक <span className="alert-txt">*</span>
              </Form.Label>
              <Form.Select
                name="block"
                value={formData.block}
                onChange={handleChange}
                className="nd-select-option"
                required
              >
                <option value="">-- ब्लॉक चुनें --</option>
                {blockData.map((item) => (
                  <option key={item.id} value={item.project}>
                    {item.project}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col lg={4}>
            <Form.Group className="mb-3 nd-req-text">
              <Form.Label>
                परियोजना प्रकार <span className="alert-txt">*</span>
              </Form.Label>
              <Form.Select
                name="project_type"
                value={formData.project_type}
                onChange={handleChange}
                className="nd-select-option"
                required
              >
                <option value="">-- परियोजना चुनें --</option>
                <option value="निजी क्षेत्र में सेवा">
                  निजी क्षेत्र में सेवा
                </option>
                <option value="कृषि कार्य">कृषि कार्य</option>
                <option value="स्वयं का व्यवसाय">स्वयं का व्यवसाय</option>
                <option value="अन्य कार्य">अन्य कार्य</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <div className="nd-registration">
            <Button
              variant="secondary"
              className="nd-back-btn"
              onClick={() => navigate(-1)}
            >
              वापस जाएं
            </Button>
            <Button
              type="submit"
              variant="secondary"
              className="btn nd-primary-btn"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "कृपया प्रतीक्षा करें..."
                : "लाभार्थी पंजीकृत करें"}
            </Button>
          </div>
        </Row>
      </Form>
    </Container>
  );
}

export default CreatePasswordRegis;
