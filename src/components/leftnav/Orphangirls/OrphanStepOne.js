import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "../../../assets/css/LeftNav.css";
import "@fortawesome/fontawesome-free";
import DashHeader from "../../leftnav/DashHeader";
import "../../../assets/css/NandaStepOne.css";
import "../../../assets/css/HomePage.css";
import Footer from "../../footer/Footer";
import InnerNavigation from "../../leftnav/InnerNavigation";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OrphanTwelfth from "./OrphanTwelfth";

const OrphanStepOne = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bankList, setBankList] = useState([]);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    user: localStorage.getItem("user_id") || "",
    girl_name: "",
    moth_name: "",
    fath_name: "",
    dob: "",
    mobile_no: "",
    email_id: "",
    adhar_no: "",
    district: localStorage.getItem("district") || "",
    project: "",
    girl_add: "",
    org_tele: "",
    pan_no: "",
    twelfth_pass_year: "",
    school_name: "",
    board_name: "",
    vivran: "",
    acn_no: "",
    ifsc_code: "",
    bank_name: "",
    branch_name: "",
  });

  // Fetch Bank List Once
  useEffect(() => {
    axios
      .get("https://brjobsedu.com/Nandagora/api2/Bankdetails/")
      .then((res) => setBankList(res.data))
      .catch((err) => console.error("Error fetching banks:", err));
  }, []);

  // Get user from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
      setFormData((prev) => ({
        ...prev,
        girl_name: savedUser.name || "",
        adhar_no: savedUser.aadhaar || "",
        district: savedUser.district || "",
        project: savedUser.block || "",
        mobile_no: savedUser.phone || "",
      }));
    }
  }, []);

  const getMaxDob = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 15);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const getPassYears = () => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 20;
    const years = [];
    for (let y = currentYear; y >= startYear; y--) years.push(y);
    return years;
  };

  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Input change handler
  const handleInput = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "moth_name" || name === "fath_name") {
      newValue = capitalizeWords(value);
    }

    if (name === "pan_no") {
      newValue = value.toUpperCase().slice(0, 10);
    }

    // Only allow numbers for account number
    if (name === "acn_no") {
      newValue = value.replace(/\D/g, "");
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  // Validation on blur
  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === "moth_name" || name === "fath_name") {
      if (value && !/^[A-Za-z\u0900-\u097F ]+$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: <span>"केवल अक्षर और स्पेस मान्य हैं।"</span>,
        }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }

    if (name === "pan_no") {
      if (!/^[A-Z0-9]{10}$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          pan_no: <span>"PAN नंबर 10 अक्षरों/अंकों का होना चाहिए।"</span>,
        }));
      } else {
        setErrors((prev) => ({ ...prev, pan_no: "" }));
      }
    }

    if (name === "email_id") {
      if (!validateEmail(value)) {
        setErrors((prev) => ({
          ...prev,
          email_id: <span>"कृपया मान्य ईमेल आईडी दर्ज करें।"</span>,
        }));
      } else {
        setErrors((prev) => ({ ...prev, email_id: "" }));
      }
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check login
    const token = localStorage.getItem("access_token");
    const user_id = localStorage.getItem("user_id");
    if (!token || !user) {
      alert("Please login first.");
      navigate("/UserLogin");
      return;
    }

    const payload = { ...formData, user: user_id };

    try {
      const res = await axios.post(
        "https://brjobsedu.com/Nandagora/api4/stepone/",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      alert(res.data.message || "Form submitted Successfully!");
      navigate("/OrphanStepTwo");
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || "";
      if (errMsg.includes("already exists")) {
        alert("यह डेटा पहले ही मौजूद है।");
      }
    }
  };

  return (
    <>
      <DashHeader />
      <div className="main-container">
        <InnerNavigation />
        <div className="main">
          <OrphanTwelfth />
          <div className="box-container">
            <Form onSubmit={handleSubmit}>
              <Row>
                <div className="nd-step1">
                  <h3>चरण 1 : व्यक्तिगत जानकारी</h3>
                </div>

                {/* कन्या शिशु का नाम */}
                <Col lg={4} md={4} sm={12}>
                  <Form.Group
                    className="mb-3 nd-req-text"
                    controlId="girl_name"
                  >
                    <Form.Label>
                      कन्या शिशु का नाम <span className="alert-txt">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="girl_name"
                      placeholder="कन्या शिशु का नाम दर्ज करें"
                      className="shadow1 nd-required"
                      required
                      value={formData.girl_name}
                      disabled
                      onChange={handleInput}
                    />
                    <span>
                      कन्या का नाम परिवर्तित होने पर शपथ पत्र देना अनिवार्य है
                    </span>
                  </Form.Group>
                </Col>

                {/* माता का नाम */}
                <Col lg={4} md={4} sm={12}>
                  <Form.Group
                    className="mb-3 nd-req-text"
                    controlId="moth_name"
                  >
                    <Form.Label>माता का नाम</Form.Label>
                    <Form.Control
                      type="text"
                      name="moth_name"
                      placeholder="माता का नाम दर्ज करें"
                      className="shadow1"
                      value={formData.moth_name}
                      onChange={handleInput}
                      onBlur={handleBlur}
                      isInvalid={!!errors.moth_name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.moth_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* पिता का नाम */}
                <Col lg={4} md={4} sm={12}>
                  <Form.Group
                    className="mb-3 nd-req-text"
                    controlId="fath_name"
                  >
                    <Form.Label>पिता का नाम</Form.Label>
                    <Form.Control
                      type="text"
                      name="fath_name"
                      placeholder="पिता का नाम दर्ज करें"
                      className="shadow1"
                      value={formData.fath_name}
                      onChange={handleInput}
                      onBlur={handleBlur}
                      isInvalid={!!errors.fath_name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.fath_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* जन्म तिथि */}
                <Col lg={4} md={4} sm={12}>
                  <Form.Group className="mb-3 nd-req-text" controlId="dob">
                    <Form.Label>
                      कन्या की जन्म तिथि <span className="alert-txt">*</span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="dob"
                      className="shadow1"
                      required
                      value={formData.dob}
                      max={getMaxDob()}
                      onChange={handleInput}
                    />
                  </Form.Group>
                </Col>

                {/* मोबाइल नंबर */}
                <Col lg={4} md={4} sm={12}>
                  <Form.Group
                    className="mb-3 nd-req-text"
                    controlId="mobile_no"
                  >
                    <Form.Label>
                      मोबाइल नंबर <span className="alert-txt">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="mobile_no"
                      placeholder="मोबाइल नंबर दर्ज करें"
                      className="shadow1"
                      required
                      value={formData.mobile_no}
                      onChange={handleInput}
                      disabled
                    />
                  </Form.Group>
                </Col>

                {/* ईमेल आईडी */}
                <Col lg={4} md={4} sm={12}>
                  <Form.Group className="mb-3 nd-req-text" controlId="email_id">
                    <Form.Label>
                      ईमेल आईडी <span className="alert-txt">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email_id"
                      placeholder="ईमेल आईडी दर्ज करें"
                      className="shadow1"
                      required
                      value={formData.email_id}
                      onChange={handleInput}
                      onBlur={handleBlur}
                      isInvalid={!!errors.email_id}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email_id}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* आधार नंबर */}
                <Col lg={4} md={4} sm={12}>
                  <Form.Group className="mb-3 nd-req-text" controlId="adhar_no">
                    <Form.Label>
                      माता/कन्या का आधार नंबर{" "}
                      <span className="alert-txt">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="adhar_no"
                      placeholder="आधार नंबर दर्ज करें"
                      className="shadow1"
                      required
                      value={formData.adhar_no}
                      onChange={handleInput}
                      disabled
                    />
                  </Form.Group>
                </Col>

                {/* जिला */}
                <Col lg={4} md={4} sm={12}>
                  <Form.Group className="mb-3 nd-req-text" controlId="district">
                    <Form.Label>
                      जिला <span className="alert-txt">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="district"
                      placeholder="जिला दर्ज करें"
                      className="shadow1"
                      required
                      value={formData.district}
                      onChange={handleInput}
                      disabled
                    />
                  </Form.Group>
                </Col>

                {/* परियोजना / ब्लॉक */}
                <Col lg={4} md={4} sm={12}>
                  <Form.Group className="mb-3 nd-req-text" controlId="project">
                    <Form.Label>
                      परियोजना / ब्लॉक <span className="alert-txt">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="project"
                      placeholder="परियोजना / ब्लॉक दर्ज करें"
                      className="shadow1"
                      required
                      value={formData.project}
                      onChange={handleInput}
                      disabled
                    />
                  </Form.Group>
                </Col>

                {/* कन्या का पता */}
                <Col lg={4} md={4} sm={12}>
                  <Form.Group className="mb-3 nd-req-text" controlId="girl_add">
                    <Form.Label>
                      कन्या का पता <span className="alert-txt">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="girl_add"
                      placeholder="कन्या का पता दर्ज करें"
                      className="shadow1"
                      required
                      value={formData.girl_add}
                      onChange={handleInput}
                    />
                  </Form.Group>
                </Col>

                {/* संगठन का टेलीफोन */}
                <Col lg={4} md={4} sm={12}>
                  <Form.Group className="mb-3 nd-req-text" controlId="org_tele">
                    <Form.Label>
                      संगठन का टेलीफोन <span className="alert-txt">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="org_tele"
                      placeholder="संगठन का टेलीफोन दर्ज करें"
                      className="shadow1"
                      required
                      value={formData.org_tele}
                      onChange={handleInput}
                    />
                  </Form.Group>
                </Col>

                {/* पैन नंबर */}
                <Col lg={4} md={4} sm={12}>
                  <Form.Group className="mb-3 nd-req-text" controlId="pan_no">
                    <Form.Label>
                      कन्या का पैन नंबर <span className="alert-txt">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="pan_no"
                      placeholder="पैन नंबर दर्ज करें"
                      className="shadow1"
                      required
                      value={formData.pan_no}
                      onChange={handleInput}
                      onBlur={handleBlur}
                      isInvalid={!!errors.pan_no}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.pan_no}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* 12वीं विवरण */}
                <Row>
                  <div className="nd-step1">
                    <Form.Label>
                      12वीं उत्तीर्ण <span className="alert-txt">*</span>
                    </Form.Label>
                  </div>
                  <Col lg={12}>
                    <table className="table table-bordered shadow1">
                      <thead className="table-light">
                        <tr>
                          <th>उत्तीर्ण वर्ष</th>
                          <th>विद्यालय का नाम</th>
                          <th>बोर्ड का नाम</th>
                          <th>विवरण</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <Form.Select
                              name="twelfth_pass_year"
                              value={formData.twelfth_pass_year || ""}
                              onChange={handleInput}
                              className="shadow1"
                              required
                            >
                              <option value="">साल चुनें</option>
                              {getPassYears().map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </Form.Select>
                          </td>
                          <td>
                            <Form.Control
                              type="text"
                              name="school_name"
                              placeholder="विद्यालय का नाम दर्ज करें"
                              value={formData.school_name || ""}
                              onChange={handleInput}
                              className="shadow1"
                              required
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="text"
                              name="board_name"
                              placeholder="बोर्ड का नाम दर्ज करें"
                              value={formData.board_name || ""}
                              onChange={handleInput}
                              className="shadow1"
                              required
                            />
                          </td>
                          <td>
                            <Form.Control
                              as="textarea"
                              rows={2}
                              name="vivran"
                              placeholder="विवरण दर्ज करें"
                              value={formData.vivran || ""}
                              onChange={handleInput}
                              className="shadow1"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                </Row>

                {/* बैंक विवरण */}
                <Col lg={4} md={4} sm={12}>
                  <Form.Group className="mb-3 nd-req-text" controlId="acn_no">
                    <Form.Label>
                      बैंक खाता संख्या <span className="alert-txt">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="acn_no"
                      placeholder="बैंक खाता संख्या दर्ज करें"
                      className="shadow1"
                      required
                      value={formData.acn_no}
                      onChange={handleInput} // only allows digits
                      onBlur={(e) => {
                        const val = e.target.value.trim();
                        if (val.length < 9 || val.length > 16) {
                          setErrors((prev) => ({
                            ...prev,
                            acn_no: "खाता संख्या 9 से 16 अंकों की होनी चाहिए.",
                          }));
                        } else {
                          setErrors((prev) => ({ ...prev, acn_no: "" }));
                        }
                      }}
                      isInvalid={!!errors.acn_no}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.acn_no}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col lg={4} md={4} sm={12}>
                  <Form.Group
                    className="mb-3 nd-req-text"
                    controlId="ifsc_code"
                  >
                    <Form.Label>
                      बैंक खाते का IFSC कोड <span className="alert-txt">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="ifsc_code"
                      placeholder="IFSC कोड दर्ज करें"
                      className="shadow1"
                      required
                      value={formData.ifsc_code}
                      onChange={handleInput}
                    />
                  </Form.Group>
                </Col>

                <Col lg={4} md={4} sm={12}>
                  <Form.Group
                    className="mb-3 nd-req-text"
                    controlId="bank_name"
                  >
                    <Form.Label>
                      बैंक का नाम <span className="alert-txt">*</span>
                    </Form.Label>
                    <Form.Select
                      name="bank_name"
                      className="shadow1"
                      required
                      value={formData.bank_name}
                      onChange={handleInput}
                    >
                      <option value="">बैंक का चयन करें</option>
                      {bankList.map((bank) => (
                        <option key={bank.id} value={bank.bank_name}>
                          {bank.bank_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col lg={4} md={4} sm={12}>
                  <Form.Group
                    className="mb-3 nd-req-text"
                    controlId="branch_name"
                  >
                    <Form.Label>
                      शाखा का नाम <span className="alert-txt">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="branch_name"
                      placeholder="शाखा का नाम दर्ज करें"
                      className="shadow1"
                      required
                      value={formData.branch_name}
                      onChange={handleInput}
                    />
                  </Form.Group>
                </Col>

                <div className="nd-btnn text-center">
                  <Button type="submit" className="mt-3 nd-secondary-btn">
                    Submit Step 1
                  </Button>
                </div>
              </Row>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrphanStepOne;
