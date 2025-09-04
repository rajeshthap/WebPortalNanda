import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "../../../assets/css/LeftNav.css";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import DashHeader from "../../leftnav/DashHeader";
import "../../../assets/css/NandaStepOne.css";
import "../../../assets/css/HomePage.css";
import Footer from "../../footer/Footer";
import InnerNavigation from "../../leftnav/InnerNavigation";
import { Row, Col, Button } from "react-bootstrap";
import TwelthPass from "../../leftnav/twelfthpass/TwelthPass";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Inside your existing imports, no change needed

const OrphanStepOne = () => {

  const [errors, setErrors] = useState({ branch_name: "", acno: "" });
  const navigate = useNavigate();

  const [bankList, setBankList] = useState([]);
  const [allDistrictData, setAllDistrictData] = useState([]);

  const [sectorData, setsectorData] = useState([]);
  const [awcData, setawcData] = useState([]);
  const [awc_codeData, setawc_codeData] = useState([]);
  const [awc_typeData, setawc_typeData] = useState([]);

  const [formData, setFormData] = useState({
    user: localStorage.getItem("user_id") || "",
    girl_name: "",
    moth_name: "",
    fath_name: "",
    dob: "",
    caste_category: "",
    mem_name: "",
    district: localStorage.getItem("district"),
    project: "",
    sector: "",
    awc: "",
    awc_type: "",
    awc_code: "",
    mobile_no: "",
    email_id: "",
    adhar_no: "",
    fam_mem: "",
    fam_sis: "",
    acno: "",
    ifsc_code: "",
    bank_name: "",
    branch_name: "",
    pan_card: "",
  });

  const [user, setUser] = useState(null);

  //  Fetch Bank List Once
  useEffect(() => {
    axios
      .get("https://brjobsedu.com/Nandagora/api2/Bankdetails/")
      .then((res) => setBankList(res.data))
      .catch((err) => console.error("Error fetching banks:", err));
  }, []);

  //  Fetch all district data
  useEffect(() => {
    if (!formData.district) return;

    const fetchAllDistrictData = async () => {
      try {
        const res = await axios.get(
          `https://brjobsedu.com/Nandagora/api3/district-data/?district=${formData.district}`
        );
        setAllDistrictData(res.data || []);
      } catch (err) {
        console.error("Error fetching district data:", err);
      }
    };

    fetchAllDistrictData();
  }, [formData.district]);

  
  //this is filtering for sectors
  useEffect(() => {
    const uniqueSectors = allDistrictData.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.sector === item.sector)
    );
    setsectorData(uniqueSectors);
  }, [allDistrictData]);

  // this filtering is for awc(anganbadi)
  useEffect(() => {
    const filtered = allDistrictData.filter(
      (item) => item.sector === formData.sector
    );
    const uniqueAWC = filtered.filter(
      (item, index, self) => index === self.findIndex((t) => t.awc === item.awc)
    );
    setawcData(uniqueAWC);
  }, [formData.sector, allDistrictData]);

  // this filtering is for awc_code
  useEffect(() => {
    const filtered = allDistrictData.filter(
      (item) => item.sector === formData.sector && item.awc === formData.awc
    );
    const uniqueAWCCode = filtered.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.awc_code === item.awc_code)
    );
    setawc_codeData(uniqueAWCCode);
  }, [formData.awc, formData.sector, allDistrictData]);

  // this filtering is done for awc_type
  useEffect(() => {
    const filtered = allDistrictData.filter(
      (item) => item.awc_code === formData.awc_code
    );
    const uniqueAWCType = filtered.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.awc_type === item.awc_type)
    );
    setawc_typeData(uniqueAWCType);
  }, [formData.awc_code, allDistrictData]);

  // accessing user from local storage to save its data that was already filled during registration
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
      const updatedData = {
        girl_name: savedUser.name || "",
        adhar_no: savedUser.aadhaar || "",
        district: savedUser.district || "",
        project: savedUser.block || "",
        mobile_no: savedUser.phone || "",
        
      };
      setFormData((prev) => ({ ...prev, ...updatedData }));
    }
  }, []);

  // reset all the filtered feilds on changing the secotr
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "sector" && { awc: "", awc_code: "", awc_type: "" }),
      ...(name === "awc" && { awc_code: "", awc_type: "" }),
      ...(name === "awc_code" && { awc_type: "" }),
    }));
  };

 const handleInput = (e) => {
  const { name, value } = e.target;
  const updated = { ...formData, [name]: value };
  setFormData(updated);
};


  // On submit section
  const handleSubmit = async (e) => {
    e.preventDefault();

    const acno = formData.acno.trim();
    if (!/^\d+$/.test(acno)) {
      setErrors({ acno: "केवल संख्यात्मक मान दर्ज करें (Only numbers)." });
      return;
    }
    if (acno.length < 9 || acno.length > 16) {
      setErrors({ acno: "खाता संख्या 9 से 16 अंकों की होनी चाहिए." });
      return;
    }
    setErrors({ acno: "", branch_name: "" });

    const token = localStorage.getItem("access_token");
    console.log("token",token);
    const user_id = localStorage.getItem("user_id");

    if (!token || !user) {
      alert("Please login first.");
      navigate("/UserLogin");
      return;
    }

    const payload = {
      user: user_id,
      girl_name: formData.girl_name,
      moth_name: formData.moth_name,
      fath_name: formData.fath_name,
      dob: formData.dob,
      caste_category: formData.caste_category,
      mobile_no: formData.mobile_no,
      email_id: formData.email_id,
      adhar_no: formData.adhar_no,
      district: formData.district,
      project: formData.project,
      sector: formData.sector,
      awc: formData.awc,
      awc_type: formData.awc_type,
      awc_code: formData.awc_code,
      fam_mem: parseInt(formData.fam_mem) || 0,
      fam_sis: parseInt(formData.fam_sis) || 0,
      pan_card: formData.pan_card,
      acno: formData.acno,
      ifsc_code: formData.ifsc_code,
      bank_name: formData.bank_name,
      branch_name: formData.branch_name,
    };

    try {
      const res = await axios.post(
        "https://brjobsedu.com/Nandagora/api4/stepone/",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      const returnedId = res.data.id || res.data.form_id || null;
      if (returnedId) {
        localStorage.setItem("submitted_form", JSON.stringify(formData));
        localStorage.setItem("family_member_count", formData.fam_mem);
        
        localStorage.setItem("family_sister", formData.fam_sis);
      }

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
      <div>
        <DashHeader />
        <div className="main-container">
          <InnerNavigation />
          <div className="main">
            <TwelthPass />
            <div className="box-container">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Row>
                    <div className="nd-step1">
                      <h3>Step 1 : व्यक्तिगत जानकारी</h3>
                    </div>
                  </Row>

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
                        placeholder="कन्या शिशु का नाम"
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
                      <Form.Label>
                        माता का नाम <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="moth_name"
                        placeholder="माता का नाम"
                        className="shadow1"
                        required
                        pattern="^[\u0900-\u097Fa-zA-Z ]{2,50}$"
                        value={formData.moth_name}
                        onChange={handleInput}
                      />
                    </Form.Group>
                  </Col>

                  {/* पिता का नाम */}

                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3 nd-req-text"
                      controlId="fath_name"
                    >
                      <Form.Label>
                        पिता का नाम <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="fath_name"
                        placeholder="पिता का नाम"
                        className="shadow1"
                        required
                        pattern="^[\u0900-\u097F a-zA-Z]{2,50}$"
                        value={formData.fath_name}
                        onChange={handleInput}
                      />
                    </Form.Group>
                  </Col>

                  {/* अभिभावक का नाम */}

                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3 nd-req-text"
                      controlId="fath_name"
                    >
                      <Form.Label>
                        स्थायी खाता संख्या कार्ड (PAN CARD){" "}
                        <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="pan_card"
                        placeholder="स्थायी खाता संख्या कार्ड"
                        className="shadow1"
                        required
                        value={formData.pan_card}
                        onChange={handleInput}
                      />
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
                        onChange={handleInput}
                      />
                    </Form.Group>
                  </Col>

                  {/* जन्म पंजीकरण संख्या */}

                  <Col lg={4} md={4} sm={12}>
                    <Form>
                      <Form.Group
                        className="mb-3 nd-req-text"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>
                          जाति श्रेणी <span className="alert-txt">*</span>
                        </Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          className="shadow1 nd-mt-6"
                          required
                          value={formData.caste_category}
                          onChange={handleInput}
                          name="caste_category"
                        >
                          <option selected="" disabled="">
                            Please Select
                          </option>
                          <option value="General">General</option>
                          <option value="st">ST</option>
                          <option value="obc">OBC</option>
                          <option value="sc">SC</option>
                        </Form.Select>
                      </Form.Group>
                    </Form>
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
                        placeholder="मोबाइल नंबर"
                        className="shadow1"
                        required
                        value={formData.mobile_no}
                        onChange={handleInput}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  {/* जिला */}
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3 nd-req-text"
                      controlId="district"
                    >
                      <Form.Label>
                        जिला <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="district"
                        placeholder="जिला"
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
                    <Form.Group
                      className="mb-3 nd-req-text"
                      controlId="project"
                    >
                      <Form.Label>
                        परियोजना / ब्लॉक <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="project"
                        placeholder="परियोजना / ब्लॉक"
                        className="shadow1"
                        required
                        value={formData.project}
                        onChange={handleInput}
                        disabled
                      />
                    </Form.Group>
                  </Col>

                  {/* Sector */}
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="sector">
                      <Form.Label>
                        क्षेत्र / सेक्टर <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Select
                        name="sector"
                        className="shadow1"
                        required
                        value={formData.sector}
                        onChange={handleChange}
                      >
                        <option value="">सेक्टर चुनें</option>
                        {sectorData.map((item) => (
                          <option key={item.id} value={item.sector}>
                            {item.sector}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="awc">
                      <Form.Label>
                        आंगनवाड़ी केंद्र का नाम{" "}
                        <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Select
                        name="awc"
                        className="shadow1"
                        required
                        value={formData.awc}
                        onChange={handleChange}
                      >
                        <option value="">आंगनवाड़ी चुनें</option>
                        {awcData.map((item) => (
                          <option key={item.id} value={item.awc}>
                            {item.awc}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  {/* AWC कोड */}

                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3 nd-req-text"
                      controlId="awc_code"
                    >
                      <Form.Label>
                        AWC कोड <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Select
                        name="awc_code"
                        className="shadow1"
                        required
                        value={formData.awc_code}
                        onChange={handleChange}
                      >
                        <option value="">आंगनवाड़ी कोड चुनें</option>
                        {awc_codeData.map((item) => (
                          <option key={item.id} value={item.awc_code}>
                            {item.awc_code}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  {/* AWC टाइप */}

                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3 nd-req-text"
                      controlId="awc_code"
                    >
                      <Form.Label>
                        AWC टाइप <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Select
                        name="awc_type"
                        className="shadow1"
                        required
                        value={formData.awc_type}
                        onChange={handleChange}
                      >
                        <option value="">AWC टाइप</option>
                        {awc_typeData.map((item) => (
                          <option key={item.id} value={item.awc_type}>
                            {item.awc_type}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  {/* ईमेल आईडी */}
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3 nd-req-text"
                      controlId="email_id"
                    >
                      <Form.Label>
                        ईमेल आईडी <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email_id"
                        placeholder="ईमेल आईडी"
                        className="shadow1"
                        required
                        value={formData.email_id}
                        onChange={handleInput}
                      />
                    </Form.Group>
                  </Col>

                  {/* आधार नंबर */}
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3 nd-req-text"
                      controlId="adhar_no"
                    >
                      <Form.Label>
                        माता/कन्या का आधार नंबर{" "}
                        <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="adhar_no"
                        placeholder="आधार नंबर"
                        className="shadow1"
                        required
                        value={formData.adhar_no}
                        onChange={handleInput}
                        disabled
                      />
                    </Form.Group>
                  </Col>

                  {/* परिवार के सदस्य */}
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3 nd-req-text"
                      controlId="fam_mem"
                    >
                      <Form.Label>
                        परिवार के सदस्य <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="fam_mem"
                        placeholder="परिवार के सदस्य"
                        className="shadow1"
                        required
                        value={formData.fam_mem}
                        onChange={handleInput}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={4} sm={12}>
                    <Form.Group className="mb-3" controlId="fam_sis">
                      <Form.Label>भाई बहन की संख्या *</Form.Label>
                      <Form.Control
                        type="number"
                        name="fam_sis"
                        value={formData.fam_sis}
                        onChange={handleInput}
                        required
                      />
                    </Form.Group>
                  </Col>
                  {/* खाता संख्या */}
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="acno">
                      <Form.Label>
                        माता/पिता/संरक्षक एवं कन्या शिशु के संयुक्त खाता संख्या{" "}
                        <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="acno"
                        placeholder="खाता संख्या"
                        className="shadow1"
                        required
                        value={formData.acno}
                        onChange={handleInput}
                        isInvalid={!!errors.acno}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.acno}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  {/* IFSC Code */}
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group
                      className="mb-3 nd-req-text"
                      controlId="ifsc_code"
                    >
                      <Form.Label>
                        बैंक खाते का IFSC कोड{" "}
                        <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="ifsc_code"
                        placeholder="IFSC कोड"
                        className="shadow1"
                        required
                        value={formData.ifsc_code}
                        onChange={handleInput}
                      />
                    </Form.Group>
                  </Col>

                  {/* बैंक का नाम */}
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

                  {/* शाखा का नाम */}
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
                        placeholder="शाखा का नाम"
                        className="shadow1"
                        required
                        value={formData.branch_name}
                        onChange={handleInput}
                        isInvalid={!!errors.branch_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.branch_name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="nd-step1 ">
                  <div>
                    <Button variant="primary" type="submit" className="nd-btn">
                      Submit
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrphanStepOne;
